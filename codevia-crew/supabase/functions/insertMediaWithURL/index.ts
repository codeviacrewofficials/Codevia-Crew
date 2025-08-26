// supabase/functions/insertMediaWithURL/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
serve(async (req)=>{
  try {
    // Check authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({
        error: "Unauthorized - missing auth header"
      }), {
        status: 401,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const supabase = createClient(Deno.env.get("SB_URL"), Deno.env.get("SB_SERVICE_ROLE_KEY"));
    // Get user from auth header
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
    if (authError || !user) {
      return new Response(JSON.stringify({
        error: "Invalid authentication"
      }), {
        status: 401,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const { fileName, bucket, folder, fileBase64, listing_id, linked_table, linked_id, media_type, description, contentType } = await req.json();
    // Validate required fields
    if (!fileName || !bucket || !fileBase64) {
      return new Response(JSON.stringify({
        error: "Missing required fields: fileName, bucket, fileBase64"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    // Construct file path
    const filePath = folder ? `${folder}/${fileName}` : fileName;
    // Convert base64 to buffer
    const fileBuffer = Uint8Array.from(atob(fileBase64), (c)=>c.charCodeAt(0));
    // Determine content type
    const mimeType = contentType || getMimeTypeFromFileName(fileName);
    // Upload to storage
    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, fileBuffer, {
      upsert: false,
      contentType: mimeType
    });
    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`);
    }
    // Get the public URL using Supabase's method
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
    // Infer media type if not provided
    const inferredMediaType = media_type || inferMediaType(bucket, filePath);
    // Insert into media_linked table
    const { data: mediaData, error: insertError } = await supabase.from("media_linked").insert({
      bucket,
      file_path: filePath,
      public_url: urlData.publicUrl,
      media_type: inferredMediaType,
      description,
      linked_table,
      linked_id,
      listing_id,
      uploaded_by: user.id
    }).select().single();
    if (insertError) {
      // If insert fails, clean up the uploaded file
      await supabase.storage.from(bucket).remove([
        filePath
      ]);
      throw new Error(`Database insert failed: ${insertError.message}`);
    }
    // If this is a banner for a blog post, update the blog_posts table
    if (inferredMediaType === 'banner' && linked_table === 'blog_posts' && linked_id) {
      await supabase.from('blog_posts').update({
        banner_media_id: mediaData.id
      }).eq('id', linked_id);
    }
    return new Response(JSON.stringify({
      success: true,
      media: mediaData,
      public_url: urlData.publicUrl
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.error('Upload error:', err);
    return new Response(JSON.stringify({
      error: err instanceof Error ? err.message : "Unknown error occurred"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
});
// Helper functions
function getMimeTypeFromFileName(fileName) {
  const ext = fileName.toLowerCase().split('.').pop();
  const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'gif': 'image/gif',
    'svg': 'image/svg+xml'
  };
  return mimeTypes[ext || ''] || 'application/octet-stream';
}
function inferMediaType(bucket, filePath) {
  if (bucket === 'avatars') return 'avatar';
  if (bucket === 'blog-media') {
    if (filePath.includes('/banner') || filePath.includes('banner')) return 'banner';
    return 'inline_image';
  }
  return 'inline_image';
}
