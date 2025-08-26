-- =========================================================
-- SUPABASE BLOG PLATFORM MIGRATION - CLEAN & ORDERED
-- =========================================================

/*
  This migration creates a complete blog platform with:
  - User profiles with role-based access (admin/user)
  - Blog posts with drafts/published status
  - Comments system with nested replies
  - Media management with storage integration
  - Row Level Security (RLS) for all tables
  - Storage buckets for blog media and avatars
*/

-- ============================
-- 1) EXTENSIONS
-- ============================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================
-- 2) ENUMS
-- ============================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('admin', 'user');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'blog_status') THEN
    CREATE TYPE blog_status AS ENUM ('draft', 'published');
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'media_type') THEN
    CREATE TYPE media_type AS ENUM ('banner', 'inline_image', 'avatar');
  END IF;
END$$;

-- ============================
-- 3) CORE TABLES (in dependency order)
-- ============================

-- 3.1 Profiles table (no forward references)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  username text UNIQUE,
  role user_role NOT NULL DEFAULT 'user',
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 3.2 Media linked table (for edge function compatibility)
CREATE TABLE IF NOT EXISTS public.media_linked (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket text NOT NULL,
  file_path text NOT NULL,
  public_url text NOT NULL,
  media_type media_type,
  description text,
  linked_table text,
  linked_id uuid,
  listing_id uuid,
  uploaded_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_linked_uploaded_by ON public.media_linked(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_linked_bucket ON public.media_linked(bucket);
CREATE INDEX IF NOT EXISTS idx_media_linked_listing ON public.media_linked(listing_id);
CREATE INDEX IF NOT EXISTS idx_media_linked_target ON public.media_linked(linked_table, linked_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_media_linked_bucket_path ON public.media_linked(bucket, file_path);

-- 3.3 Blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text UNIQUE NOT NULL CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  content text NOT NULL,
  excerpt text,
  banner_media_id uuid REFERENCES public.media_linked(id) ON DELETE SET NULL,
  status blog_status NOT NULL DEFAULT 'draft',
  reading_time int,
  view_count int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON public.blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at) WHERE status = 'published';

-- 3.4 Comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_comment_id uuid REFERENCES public.comments(id) ON DELETE SET NULL,
  content text NOT NULL,
  likes_count int DEFAULT 0 CHECK (likes_count >= 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_comments_post ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_author ON public.comments(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON public.comments(parent_comment_id);

-- ============================
-- 4) UTILITY FUNCTIONS
-- ============================

-- 4.1 Updated timestamp function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4.2 Auto-create profile function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    now(),
    now()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4.3 Auto-update published_at when status changes to published
CREATE OR REPLACE FUNCTION public.set_published_at()
RETURNS trigger AS $$
BEGIN
  IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status != 'published') THEN
    NEW.published_at = now();
  ELSIF NEW.status != 'published' THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4.4 Function to handle media linking after upload
CREATE OR REPLACE FUNCTION public.link_media_to_entity(
  p_media_id uuid,
  p_linked_table text,
  p_linked_id uuid,
  p_media_type media_type DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  UPDATE public.media_linked 
  SET 
    linked_table = p_linked_table,
    linked_id = p_linked_id,
    media_type = COALESCE(p_media_type, media_type)
  WHERE id = p_media_id;
  
  -- Auto-update related entities based on media type
  IF p_media_type = 'banner' AND p_linked_table = 'blog_posts' THEN
    UPDATE public.blog_posts 
    SET banner_media_id = p_media_id 
    WHERE id = p_linked_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================
-- 5) TRIGGERS
-- ============================

-- 5.1 Updated timestamp triggers
DROP TRIGGER IF EXISTS tr_profiles_updated_at ON public.profiles;
CREATE TRIGGER tr_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS tr_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER tr_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS tr_comments_updated_at ON public.comments;
CREATE TRIGGER tr_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 5.2 Published timestamp trigger
DROP TRIGGER IF EXISTS tr_blog_posts_published_at ON public.blog_posts;
CREATE TRIGGER tr_blog_posts_published_at
  BEFORE INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_published_at();

-- 5.3 Auth user trigger (may fail in hosted Supabase)
DO $$
BEGIN
  BEGIN
    DROP TRIGGER IF EXISTS tr_handle_new_user ON auth.users;
    CREATE TRIGGER tr_handle_new_user
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Could not create trigger on auth.users - handle profile creation in your application';
  END;
END$$;

-- ============================
-- 6) STORAGE BUCKETS
-- ============================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('blog-media', 'blog-media', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('avatars', 'avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ============================
-- 7) ROW LEVEL SECURITY POLICIES
-- ============================

-- 7.1 Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_linked ENABLE ROW LEVEL SECURITY;

-- 7.2 Profiles policies
DROP POLICY IF EXISTS "profiles_select_public" ON public.profiles;
CREATE POLICY "profiles_select_public" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;
CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7.3 Blog posts policies
DROP POLICY IF EXISTS "blog_posts_select_published" ON public.blog_posts;
CREATE POLICY "blog_posts_select_published" ON public.blog_posts
  FOR SELECT USING (
    status = 'published' 
    OR author_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "blog_posts_admin_insert" ON public.blog_posts;
CREATE POLICY "blog_posts_admin_insert" ON public.blog_posts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "blog_posts_admin_update" ON public.blog_posts;
CREATE POLICY "blog_posts_admin_update" ON public.blog_posts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "blog_posts_admin_delete" ON public.blog_posts;
CREATE POLICY "blog_posts_admin_delete" ON public.blog_posts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7.4 Comments policies
DROP POLICY IF EXISTS "comments_select_published_posts" ON public.comments;
CREATE POLICY "comments_select_published_posts" ON public.comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.blog_posts 
      WHERE id = post_id AND status = 'published'
    )
    OR author_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "comments_insert_auth" ON public.comments;
CREATE POLICY "comments_insert_auth" ON public.comments
  FOR INSERT WITH CHECK (
    auth.uid() = author_id
    AND EXISTS (
      SELECT 1 FROM public.blog_posts 
      WHERE id = post_id AND status = 'published'
    )
  );

DROP POLICY IF EXISTS "comments_update_own" ON public.comments;
CREATE POLICY "comments_update_own" ON public.comments
  FOR UPDATE USING (
    author_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "comments_delete_own" ON public.comments;
CREATE POLICY "comments_delete_own" ON public.comments
  FOR DELETE USING (
    author_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7.5 Media linked policies
DROP POLICY IF EXISTS "media_linked_select_all" ON public.media_linked;
CREATE POLICY "media_linked_select_all" ON public.media_linked
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "media_linked_insert_auth" ON public.media_linked;
CREATE POLICY "media_linked_insert_auth" ON public.media_linked
  FOR INSERT WITH CHECK (
    uploaded_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "media_linked_update_owner_admin" ON public.media_linked;
CREATE POLICY "media_linked_update_owner_admin" ON public.media_linked
  FOR UPDATE USING (
    uploaded_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "media_linked_delete_owner_admin" ON public.media_linked;
CREATE POLICY "media_linked_delete_owner_admin" ON public.media_linked
  FOR DELETE USING (
    uploaded_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================
-- 8) STORAGE POLICIES
-- ============================

-- 8.1 Blog media policies (admin only)
DROP POLICY IF EXISTS "blog_media_admin_insert" ON storage.objects;
CREATE POLICY "blog_media_admin_insert" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-media'
    AND EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "blog_media_admin_delete" ON storage.objects;
CREATE POLICY "blog_media_admin_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-media'
    AND EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DROP POLICY IF EXISTS "blog_media_public_select" ON storage.objects;
CREATE POLICY "blog_media_public_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-media');

-- 8.2 Avatar policies (users can manage their own)
DROP POLICY IF EXISTS "avatars_insert_own" ON storage.objects;
CREATE POLICY "avatars_insert_own" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars'
    AND (regexp_split_to_array(name, '/'))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "avatars_delete_own" ON storage.objects;
CREATE POLICY "avatars_delete_own" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'avatars'
    AND (regexp_split_to_array(name, '/'))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "avatars_public_select" ON storage.objects;
CREATE POLICY "avatars_public_select" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

-- ============================
-- 9) HELPER FUNCTIONS
-- ============================

-- 9.1 Function to create admin user
CREATE OR REPLACE FUNCTION public.create_admin_profile(
  user_id uuid, 
  admin_username text, 
  admin_display_name text
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, role, created_at, updated_at)
  VALUES (user_id, admin_username, admin_display_name, 'admin', now(), now())
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    username = COALESCE(EXCLUDED.username, public.profiles.username),
    display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9.2 Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id uuid DEFAULT auth.uid())
RETURNS user_role AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE id = user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9.3 Function to get media for an entity
CREATE OR REPLACE FUNCTION public.get_entity_media(
  p_linked_table text,
  p_linked_id uuid,
  p_media_type media_type DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  public_url text,
  media_type media_type,
  description text,
  created_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ml.id,
    ml.public_url,
    ml.media_type,
    ml.description,
    ml.created_at
  FROM public.media_linked ml
  WHERE ml.linked_table = p_linked_table 
    AND ml.linked_id = p_linked_id
    AND (p_media_type IS NULL OR ml.media_type = p_media_type)
  ORDER BY ml.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================
-- 10) VIEWS FOR COMMON QUERIES
-- ============================

-- 10.1 Published blog posts with author and banner info
CREATE OR REPLACE VIEW public.published_blog_posts AS
SELECT 
  bp.*,
  p.display_name as author_name,
  p.username as author_username,
  ml.public_url as banner_url,
  (
    SELECT COUNT(*)::int 
    FROM public.comments c 
    WHERE c.post_id = bp.id
  ) as comment_count
FROM public.blog_posts bp
LEFT JOIN public.profiles p ON bp.author_id = p.id
LEFT JOIN public.media_linked ml ON bp.banner_media_id = ml.id
WHERE bp.status = 'published'
ORDER BY bp.published_at DESC;

-- 10.2 Comments with author info  
CREATE OR REPLACE VIEW public.comments_with_author AS
SELECT 
  c.*,
  p.display_name as author_name,
  p.username as author_username,
  p.avatar_url
FROM public.comments c
LEFT JOIN public.profiles p ON c.author_id = p.id;

-- ============================
-- 11) INITIAL SETUP
-- ============================

-- Enable realtime (optional)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;

-- ============================
-- MIGRATION COMPLETE
-- ============================

/*
SETUP INSTRUCTIONS:

1. After running this migration, create your first admin:
   SELECT public.create_admin_profile('<your-auth-user-uuid>', 'admin', 'Administrator');

2. Test the setup:
   SELECT * FROM public.profiles WHERE role = 'admin';

3. Your edge function should work with this schema using these fields:
   - fileName, bucket, folder, fileBase64 (required)
   - listing_id, linked_table, linked_id (optional for linking)
   - media_type, description (optional metadata)

4. File organization:
   - Avatars: avatars/{user_id}/avatar.{ext}
   - Blog banners: blog-media/{post_id}/banner.{ext}  
   - Blog inline: blog-media/{post_id}/inline/{filename}.{ext}

NOTES:
- All tables have RLS enabled with appropriate policies
- Storage buckets are public with size limits and MIME type restrictions
- The auth.users trigger may fail in hosted Supabase (handle in app code if needed)
- Media linking is flexible and supports polymorphic relationships
*/