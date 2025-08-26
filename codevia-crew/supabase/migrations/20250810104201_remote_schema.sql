

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."blog_status" AS ENUM (
    'draft',
    'published'
);


ALTER TYPE "public"."blog_status" OWNER TO "postgres";


CREATE TYPE "public"."media_type" AS ENUM (
    'banner',
    'inline_image',
    'avatar'
);


ALTER TYPE "public"."media_type" OWNER TO "postgres";


CREATE TYPE "public"."user_role" AS ENUM (
    'admin',
    'user'
);


ALTER TYPE "public"."user_role" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_admin_profile"("user_id" "uuid", "admin_username" "text", "admin_display_name" "text") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, role, created_at, updated_at)
  VALUES (user_id, admin_username, admin_display_name, 'admin', now(), now())
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    username = COALESCE(EXCLUDED.username, public.profiles.username),
    display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
    updated_at = now();
END;
$$;


ALTER FUNCTION "public"."create_admin_profile"("user_id" "uuid", "admin_username" "text", "admin_display_name" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_entity_media"("p_linked_table" "text", "p_linked_id" "uuid", "p_media_type" "public"."media_type" DEFAULT NULL::"public"."media_type") RETURNS TABLE("id" "uuid", "public_url" "text", "media_type" "public"."media_type", "description" "text", "created_at" timestamp with time zone)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "public"."get_entity_media"("p_linked_table" "text", "p_linked_id" "uuid", "p_media_type" "public"."media_type") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_role"("user_id" "uuid" DEFAULT "auth"."uid"()) RETURNS "public"."user_role"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  RETURN (SELECT role FROM public.profiles WHERE id = user_id);
END;
$$;


ALTER FUNCTION "public"."get_user_role"("user_id" "uuid") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
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
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."link_media_to_entity"("p_media_id" "uuid", "p_linked_table" "text", "p_linked_id" "uuid", "p_media_type" "public"."media_type" DEFAULT NULL::"public"."media_type") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
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
$$;


ALTER FUNCTION "public"."link_media_to_entity"("p_media_id" "uuid", "p_linked_table" "text", "p_linked_id" "uuid", "p_media_type" "public"."media_type") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_published_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status != 'published') THEN
    NEW.published_at = now();
  ELSIF NEW.status != 'published' THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_published_at"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."blog_posts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "author_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "slug" "text" NOT NULL,
    "content" "text" NOT NULL,
    "excerpt" "text",
    "banner_media_id" "uuid",
    "status" "public"."blog_status" DEFAULT 'draft'::"public"."blog_status" NOT NULL,
    "reading_time" integer,
    "view_count" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "published_at" timestamp with time zone,
    CONSTRAINT "blog_posts_slug_check" CHECK (("slug" ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'::"text"))
);


ALTER TABLE "public"."blog_posts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."comments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "post_id" "uuid" NOT NULL,
    "author_id" "uuid" NOT NULL,
    "parent_comment_id" "uuid",
    "content" "text" NOT NULL,
    "likes_count" integer DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "comments_likes_count_check" CHECK (("likes_count" >= 0))
);


ALTER TABLE "public"."comments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "display_name" "text",
    "username" "text",
    "role" "public"."user_role" DEFAULT 'user'::"public"."user_role" NOT NULL,
    "avatar_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."comments_with_author" AS
 SELECT "c"."id",
    "c"."post_id",
    "c"."author_id",
    "c"."parent_comment_id",
    "c"."content",
    "c"."likes_count",
    "c"."created_at",
    "c"."updated_at",
    "p"."display_name" AS "author_name",
    "p"."username" AS "author_username",
    "p"."avatar_url"
   FROM ("public"."comments" "c"
     LEFT JOIN "public"."profiles" "p" ON (("c"."author_id" = "p"."id")));


ALTER VIEW "public"."comments_with_author" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."media_linked" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "bucket" "text" NOT NULL,
    "file_path" "text" NOT NULL,
    "public_url" "text" NOT NULL,
    "media_type" "public"."media_type",
    "description" "text",
    "linked_table" "text",
    "linked_id" "uuid",
    "listing_id" "uuid",
    "uploaded_by" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."media_linked" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."published_blog_posts" AS
 SELECT "bp"."id",
    "bp"."author_id",
    "bp"."title",
    "bp"."slug",
    "bp"."content",
    "bp"."excerpt",
    "bp"."banner_media_id",
    "bp"."status",
    "bp"."reading_time",
    "bp"."view_count",
    "bp"."created_at",
    "bp"."updated_at",
    "bp"."published_at",
    "p"."display_name" AS "author_name",
    "p"."username" AS "author_username",
    "ml"."public_url" AS "banner_url",
    ( SELECT ("count"(*))::integer AS "count"
           FROM "public"."comments" "c"
          WHERE ("c"."post_id" = "bp"."id")) AS "comment_count"
   FROM (("public"."blog_posts" "bp"
     LEFT JOIN "public"."profiles" "p" ON (("bp"."author_id" = "p"."id")))
     LEFT JOIN "public"."media_linked" "ml" ON (("bp"."banner_media_id" = "ml"."id")))
  WHERE ("bp"."status" = 'published'::"public"."blog_status")
  ORDER BY "bp"."published_at" DESC;


ALTER VIEW "public"."published_blog_posts" OWNER TO "postgres";


ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."media_linked"
    ADD CONSTRAINT "media_linked_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");



CREATE INDEX "idx_blog_posts_author" ON "public"."blog_posts" USING "btree" ("author_id");



CREATE INDEX "idx_blog_posts_published_at" ON "public"."blog_posts" USING "btree" ("published_at") WHERE ("status" = 'published'::"public"."blog_status");



CREATE INDEX "idx_blog_posts_slug" ON "public"."blog_posts" USING "btree" ("slug");



CREATE INDEX "idx_blog_posts_status" ON "public"."blog_posts" USING "btree" ("status");



CREATE INDEX "idx_comments_author" ON "public"."comments" USING "btree" ("author_id");



CREATE INDEX "idx_comments_parent" ON "public"."comments" USING "btree" ("parent_comment_id");



CREATE INDEX "idx_comments_post" ON "public"."comments" USING "btree" ("post_id");



CREATE INDEX "idx_media_linked_bucket" ON "public"."media_linked" USING "btree" ("bucket");



CREATE UNIQUE INDEX "idx_media_linked_bucket_path" ON "public"."media_linked" USING "btree" ("bucket", "file_path");



CREATE INDEX "idx_media_linked_listing" ON "public"."media_linked" USING "btree" ("listing_id");



CREATE INDEX "idx_media_linked_target" ON "public"."media_linked" USING "btree" ("linked_table", "linked_id");



CREATE INDEX "idx_media_linked_uploaded_by" ON "public"."media_linked" USING "btree" ("uploaded_by");



CREATE INDEX "idx_profiles_role" ON "public"."profiles" USING "btree" ("role");



CREATE INDEX "idx_profiles_username" ON "public"."profiles" USING "btree" ("username");



CREATE OR REPLACE TRIGGER "tr_blog_posts_published_at" BEFORE INSERT OR UPDATE ON "public"."blog_posts" FOR EACH ROW EXECUTE FUNCTION "public"."set_published_at"();



CREATE OR REPLACE TRIGGER "tr_blog_posts_updated_at" BEFORE UPDATE ON "public"."blog_posts" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "tr_comments_updated_at" BEFORE UPDATE ON "public"."comments" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "tr_profiles_updated_at" BEFORE UPDATE ON "public"."profiles" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_banner_media_id_fkey" FOREIGN KEY ("banner_media_id") REFERENCES "public"."media_linked"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "public"."comments"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."blog_posts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."media_linked"
    ADD CONSTRAINT "media_linked_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "public"."profiles"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE "public"."blog_posts" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "blog_posts_admin_delete" ON "public"."blog_posts" FOR DELETE USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"public"."user_role")))));



CREATE POLICY "blog_posts_admin_insert" ON "public"."blog_posts" FOR INSERT WITH CHECK ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"public"."user_role")))));



CREATE POLICY "blog_posts_admin_update" ON "public"."blog_posts" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"public"."user_role")))));



CREATE POLICY "blog_posts_select_published" ON "public"."blog_posts" FOR SELECT USING ((("status" = 'published'::"public"."blog_status") OR ("author_id" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"public"."user_role"))))));



ALTER TABLE "public"."comments" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "comments_delete_own" ON "public"."comments" FOR DELETE USING ((("author_id" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"public"."user_role"))))));



CREATE POLICY "comments_insert_auth" ON "public"."comments" FOR INSERT WITH CHECK ((("auth"."uid"() = "author_id") AND (EXISTS ( SELECT 1
   FROM "public"."blog_posts"
  WHERE (("blog_posts"."id" = "comments"."post_id") AND ("blog_posts"."status" = 'published'::"public"."blog_status"))))));



CREATE POLICY "comments_select_published_posts" ON "public"."comments" FOR SELECT USING (((EXISTS ( SELECT 1
   FROM "public"."blog_posts"
  WHERE (("blog_posts"."id" = "comments"."post_id") AND ("blog_posts"."status" = 'published'::"public"."blog_status")))) OR ("author_id" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"public"."user_role"))))));



CREATE POLICY "comments_update_own" ON "public"."comments" FOR UPDATE USING ((("author_id" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"public"."user_role"))))));



ALTER TABLE "public"."media_linked" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "media_linked_delete_owner_admin" ON "public"."media_linked" FOR DELETE USING ((("uploaded_by" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"public"."user_role"))))));



CREATE POLICY "media_linked_insert_auth" ON "public"."media_linked" FOR INSERT WITH CHECK ((("uploaded_by" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"public"."user_role"))))));



CREATE POLICY "media_linked_select_all" ON "public"."media_linked" FOR SELECT USING (true);



CREATE POLICY "media_linked_update_owner_admin" ON "public"."media_linked" FOR UPDATE USING ((("uploaded_by" = "auth"."uid"()) OR (EXISTS ( SELECT 1
   FROM "public"."profiles"
  WHERE (("profiles"."id" = "auth"."uid"()) AND ("profiles"."role" = 'admin'::"public"."user_role"))))));



ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "profiles_admin_all" ON "public"."profiles" USING ((EXISTS ( SELECT 1
   FROM "public"."profiles" "profiles_1"
  WHERE (("profiles_1"."id" = "auth"."uid"()) AND ("profiles_1"."role" = 'admin'::"public"."user_role")))));



CREATE POLICY "profiles_select_public" ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "profiles_update_own" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."create_admin_profile"("user_id" "uuid", "admin_username" "text", "admin_display_name" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."create_admin_profile"("user_id" "uuid", "admin_username" "text", "admin_display_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_admin_profile"("user_id" "uuid", "admin_username" "text", "admin_display_name" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_entity_media"("p_linked_table" "text", "p_linked_id" "uuid", "p_media_type" "public"."media_type") TO "anon";
GRANT ALL ON FUNCTION "public"."get_entity_media"("p_linked_table" "text", "p_linked_id" "uuid", "p_media_type" "public"."media_type") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_entity_media"("p_linked_table" "text", "p_linked_id" "uuid", "p_media_type" "public"."media_type") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_role"("user_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_role"("user_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_role"("user_id" "uuid") TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."link_media_to_entity"("p_media_id" "uuid", "p_linked_table" "text", "p_linked_id" "uuid", "p_media_type" "public"."media_type") TO "anon";
GRANT ALL ON FUNCTION "public"."link_media_to_entity"("p_media_id" "uuid", "p_linked_table" "text", "p_linked_id" "uuid", "p_media_type" "public"."media_type") TO "authenticated";
GRANT ALL ON FUNCTION "public"."link_media_to_entity"("p_media_id" "uuid", "p_linked_table" "text", "p_linked_id" "uuid", "p_media_type" "public"."media_type") TO "service_role";



GRANT ALL ON FUNCTION "public"."set_published_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_published_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_published_at"() TO "service_role";



GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";


















GRANT ALL ON TABLE "public"."blog_posts" TO "anon";
GRANT ALL ON TABLE "public"."blog_posts" TO "authenticated";
GRANT ALL ON TABLE "public"."blog_posts" TO "service_role";



GRANT ALL ON TABLE "public"."comments" TO "anon";
GRANT ALL ON TABLE "public"."comments" TO "authenticated";
GRANT ALL ON TABLE "public"."comments" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."comments_with_author" TO "anon";
GRANT ALL ON TABLE "public"."comments_with_author" TO "authenticated";
GRANT ALL ON TABLE "public"."comments_with_author" TO "service_role";



GRANT ALL ON TABLE "public"."media_linked" TO "anon";
GRANT ALL ON TABLE "public"."media_linked" TO "authenticated";
GRANT ALL ON TABLE "public"."media_linked" TO "service_role";



GRANT ALL ON TABLE "public"."published_blog_posts" TO "anon";
GRANT ALL ON TABLE "public"."published_blog_posts" TO "authenticated";
GRANT ALL ON TABLE "public"."published_blog_posts" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
