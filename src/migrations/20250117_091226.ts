import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_honeys_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_honeys_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_picture_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_table_block_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_table_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v_blocks_seo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_home_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_honeyPage_v_blocks_seo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_honeyPage_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_course_v_blocks_picture_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_course_v_blocks_table_block_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_course_v_blocks_table_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_course_v_blocks_seo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_course_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_farming_v_blocks_picture_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_farming_v_blocks_table_block_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_farming_v_blocks_table_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_farming_v_blocks_seo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_farming_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_v_blocks_seo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_contact_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_honeys_v" CASCADE;
  DROP TABLE "_honeys_v_rels" CASCADE;
  DROP TABLE "_home_v_blocks_picture_block" CASCADE;
  DROP TABLE "_home_v_blocks_table_block_lines" CASCADE;
  DROP TABLE "_home_v_blocks_table_block" CASCADE;
  DROP TABLE "_home_v_blocks_seo" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_honeyPage_v_blocks_seo" CASCADE;
  DROP TABLE "_honeyPage_v" CASCADE;
  DROP TABLE "_course_v_blocks_picture_block" CASCADE;
  DROP TABLE "_course_v_blocks_table_block_lines" CASCADE;
  DROP TABLE "_course_v_blocks_table_block" CASCADE;
  DROP TABLE "_course_v_blocks_seo" CASCADE;
  DROP TABLE "_course_v" CASCADE;
  DROP TABLE "_farming_v_blocks_picture_block" CASCADE;
  DROP TABLE "_farming_v_blocks_table_block_lines" CASCADE;
  DROP TABLE "_farming_v_blocks_table_block" CASCADE;
  DROP TABLE "_farming_v_blocks_seo" CASCADE;
  DROP TABLE "_farming_v" CASCADE;
  DROP TABLE "_contact_v_blocks_seo" CASCADE;
  DROP TABLE "_contact_v" CASCADE;
  DROP INDEX IF EXISTS "honeys__status_idx";
  DROP INDEX IF EXISTS "home__status_idx";
  DROP INDEX IF EXISTS "honeyPage__status_idx";
  DROP INDEX IF EXISTS "course__status_idx";
  DROP INDEX IF EXISTS "farming__status_idx";
  DROP INDEX IF EXISTS "contact__status_idx";
  ALTER TABLE "honeys" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "honeys" ALTER COLUMN "picture_id" SET NOT NULL;
  ALTER TABLE "honeys" ALTER COLUMN "visible" SET NOT NULL;
  ALTER TABLE "honeys" ALTER COLUMN "is_available" SET NOT NULL;
  ALTER TABLE "home_blocks_picture_block" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "home_blocks_table_block_lines" ALTER COLUMN "left" SET NOT NULL;
  ALTER TABLE "home_blocks_table_block_lines" ALTER COLUMN "right" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "picture_id" SET NOT NULL;
  ALTER TABLE "honeyPage" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "honeyPage" ALTER COLUMN "picture_id" SET NOT NULL;
  ALTER TABLE "honeyPage" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "course_blocks_picture_block" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "course_blocks_table_block_lines" ALTER COLUMN "left" SET NOT NULL;
  ALTER TABLE "course_blocks_table_block_lines" ALTER COLUMN "right" SET NOT NULL;
  ALTER TABLE "course" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "course" ALTER COLUMN "picture_id" SET NOT NULL;
  ALTER TABLE "farming_blocks_picture_block" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "farming_blocks_table_block_lines" ALTER COLUMN "left" SET NOT NULL;
  ALTER TABLE "farming_blocks_table_block_lines" ALTER COLUMN "right" SET NOT NULL;
  ALTER TABLE "farming" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "farming" ALTER COLUMN "picture_id" SET NOT NULL;
  ALTER TABLE "contact" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "contact" ALTER COLUMN "email" SET NOT NULL;
  ALTER TABLE "contact" ALTER COLUMN "to_send" SET NOT NULL;
  ALTER TABLE "contact" ALTER COLUMN "sended" SET NOT NULL;
  ALTER TABLE "contact" ALTER COLUMN "picture_id" SET NOT NULL;
  ALTER TABLE "honeys" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "home" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "honeyPage" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "course" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "farming" DROP COLUMN IF EXISTS "_status";
  ALTER TABLE "contact" DROP COLUMN IF EXISTS "_status";
  DROP TYPE "public"."enum_honeys_status";
  DROP TYPE "public"."enum__honeys_v_version_status";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum_honeyPage_status";
  DROP TYPE "public"."enum__honeyPage_v_version_status";
  DROP TYPE "public"."enum_course_status";
  DROP TYPE "public"."enum__course_v_version_status";
  DROP TYPE "public"."enum_farming_status";
  DROP TYPE "public"."enum__farming_v_version_status";
  DROP TYPE "public"."enum_contact_status";
  DROP TYPE "public"."enum__contact_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_honeys_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__honeys_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_honeyPage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__honeyPage_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_course_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__course_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_farming_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__farming_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "_honeys_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_picture_id" integer,
  	"version_visible" boolean DEFAULT false,
  	"version_is_available" boolean DEFAULT true,
  	"version_description" varchar,
  	"version_weight" varchar,
  	"version_price" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__honeys_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_honeys_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"flowers_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "_home_v_blocks_picture_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" jsonb,
  	"picture_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_home_v_blocks_table_block_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left" varchar,
  	"right" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_home_v_blocks_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"picture_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_home_v_blocks_seo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_picture_id" integer,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_honeyPage_v_blocks_seo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_honeyPage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_picture_id" integer,
  	"version_description" jsonb,
  	"version__status" "enum__honeyPage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_course_v_blocks_picture_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" jsonb,
  	"picture_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_course_v_blocks_table_block_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left" varchar,
  	"right" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_course_v_blocks_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"picture_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_course_v_blocks_seo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_course_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_picture_id" integer,
  	"version__status" "enum__course_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_farming_v_blocks_picture_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"description" jsonb,
  	"picture_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_farming_v_blocks_table_block_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"left" varchar,
  	"right" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_farming_v_blocks_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"picture_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_farming_v_blocks_seo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_farming_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar,
  	"version_picture_id" integer,
  	"version__status" "enum__farming_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE IF NOT EXISTS "_contact_v_blocks_seo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_contact_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_title" varchar DEFAULT '',
  	"version_email" varchar,
  	"version_to_send" jsonb,
  	"version_sended" varchar DEFAULT '',
  	"version_picture_id" integer,
  	"version__status" "enum__contact_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "honeys" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "honeys" ALTER COLUMN "picture_id" DROP NOT NULL;
  ALTER TABLE "honeys" ALTER COLUMN "visible" DROP NOT NULL;
  ALTER TABLE "honeys" ALTER COLUMN "is_available" DROP NOT NULL;
  ALTER TABLE "home_blocks_picture_block" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "home_blocks_table_block_lines" ALTER COLUMN "left" DROP NOT NULL;
  ALTER TABLE "home_blocks_table_block_lines" ALTER COLUMN "right" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "home" ALTER COLUMN "picture_id" DROP NOT NULL;
  ALTER TABLE "honeyPage" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "honeyPage" ALTER COLUMN "picture_id" DROP NOT NULL;
  ALTER TABLE "honeyPage" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "course_blocks_picture_block" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "course_blocks_table_block_lines" ALTER COLUMN "left" DROP NOT NULL;
  ALTER TABLE "course_blocks_table_block_lines" ALTER COLUMN "right" DROP NOT NULL;
  ALTER TABLE "course" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "course" ALTER COLUMN "picture_id" DROP NOT NULL;
  ALTER TABLE "farming_blocks_picture_block" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "farming_blocks_table_block_lines" ALTER COLUMN "left" DROP NOT NULL;
  ALTER TABLE "farming_blocks_table_block_lines" ALTER COLUMN "right" DROP NOT NULL;
  ALTER TABLE "farming" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "farming" ALTER COLUMN "picture_id" DROP NOT NULL;
  ALTER TABLE "contact" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "contact" ALTER COLUMN "email" DROP NOT NULL;
  ALTER TABLE "contact" ALTER COLUMN "to_send" DROP NOT NULL;
  ALTER TABLE "contact" ALTER COLUMN "sended" DROP NOT NULL;
  ALTER TABLE "contact" ALTER COLUMN "picture_id" DROP NOT NULL;
  ALTER TABLE "honeys" ADD COLUMN "_status" "enum_honeys_status" DEFAULT 'draft';
  ALTER TABLE "home" ADD COLUMN "_status" "enum_home_status" DEFAULT 'draft';
  ALTER TABLE "honeyPage" ADD COLUMN "_status" "enum_honeyPage_status" DEFAULT 'draft';
  ALTER TABLE "course" ADD COLUMN "_status" "enum_course_status" DEFAULT 'draft';
  ALTER TABLE "farming" ADD COLUMN "_status" "enum_farming_status" DEFAULT 'draft';
  ALTER TABLE "contact" ADD COLUMN "_status" "enum_contact_status" DEFAULT 'draft';
  DO $$ BEGIN
   ALTER TABLE "_honeys_v" ADD CONSTRAINT "_honeys_v_parent_id_honeys_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."honeys"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_honeys_v" ADD CONSTRAINT "_honeys_v_version_picture_id_media_id_fk" FOREIGN KEY ("version_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_honeys_v_rels" ADD CONSTRAINT "_honeys_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_honeys_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_honeys_v_rels" ADD CONSTRAINT "_honeys_v_rels_flowers_fk" FOREIGN KEY ("flowers_id") REFERENCES "public"."flowers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_v_blocks_picture_block" ADD CONSTRAINT "_home_v_blocks_picture_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_v_blocks_picture_block" ADD CONSTRAINT "_home_v_blocks_picture_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_v_blocks_table_block_lines" ADD CONSTRAINT "_home_v_blocks_table_block_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v_blocks_table_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_v_blocks_table_block" ADD CONSTRAINT "_home_v_blocks_table_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_v_blocks_table_block" ADD CONSTRAINT "_home_v_blocks_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_v_blocks_seo" ADD CONSTRAINT "_home_v_blocks_seo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_picture_id_media_id_fk" FOREIGN KEY ("version_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_honeyPage_v_blocks_seo" ADD CONSTRAINT "_honeyPage_v_blocks_seo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_honeyPage_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_honeyPage_v" ADD CONSTRAINT "_honeyPage_v_version_picture_id_media_id_fk" FOREIGN KEY ("version_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_course_v_blocks_picture_block" ADD CONSTRAINT "_course_v_blocks_picture_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_course_v_blocks_picture_block" ADD CONSTRAINT "_course_v_blocks_picture_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_course_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_course_v_blocks_table_block_lines" ADD CONSTRAINT "_course_v_blocks_table_block_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_course_v_blocks_table_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_course_v_blocks_table_block" ADD CONSTRAINT "_course_v_blocks_table_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_course_v_blocks_table_block" ADD CONSTRAINT "_course_v_blocks_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_course_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_course_v_blocks_seo" ADD CONSTRAINT "_course_v_blocks_seo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_course_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_course_v" ADD CONSTRAINT "_course_v_version_picture_id_media_id_fk" FOREIGN KEY ("version_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_farming_v_blocks_picture_block" ADD CONSTRAINT "_farming_v_blocks_picture_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_farming_v_blocks_picture_block" ADD CONSTRAINT "_farming_v_blocks_picture_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_farming_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_farming_v_blocks_table_block_lines" ADD CONSTRAINT "_farming_v_blocks_table_block_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_farming_v_blocks_table_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_farming_v_blocks_table_block" ADD CONSTRAINT "_farming_v_blocks_table_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_farming_v_blocks_table_block" ADD CONSTRAINT "_farming_v_blocks_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_farming_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_farming_v_blocks_seo" ADD CONSTRAINT "_farming_v_blocks_seo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_farming_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_farming_v" ADD CONSTRAINT "_farming_v_version_picture_id_media_id_fk" FOREIGN KEY ("version_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_contact_v_blocks_seo" ADD CONSTRAINT "_contact_v_blocks_seo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_contact_v" ADD CONSTRAINT "_contact_v_version_picture_id_media_id_fk" FOREIGN KEY ("version_picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "_honeys_v_parent_idx" ON "_honeys_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_honeys_v_version_version_picture_idx" ON "_honeys_v" USING btree ("version_picture_id");
  CREATE INDEX IF NOT EXISTS "_honeys_v_version_version_updated_at_idx" ON "_honeys_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_honeys_v_version_version_created_at_idx" ON "_honeys_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_honeys_v_version_version__status_idx" ON "_honeys_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_honeys_v_created_at_idx" ON "_honeys_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_honeys_v_updated_at_idx" ON "_honeys_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_honeys_v_latest_idx" ON "_honeys_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_honeys_v_autosave_idx" ON "_honeys_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_honeys_v_rels_order_idx" ON "_honeys_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_honeys_v_rels_parent_idx" ON "_honeys_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_honeys_v_rels_path_idx" ON "_honeys_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_honeys_v_rels_flowers_id_idx" ON "_honeys_v_rels" USING btree ("flowers_id");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_picture_block_order_idx" ON "_home_v_blocks_picture_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_picture_block_parent_id_idx" ON "_home_v_blocks_picture_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_picture_block_path_idx" ON "_home_v_blocks_picture_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_picture_block_picture_idx" ON "_home_v_blocks_picture_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_table_block_lines_order_idx" ON "_home_v_blocks_table_block_lines" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_table_block_lines_parent_id_idx" ON "_home_v_blocks_table_block_lines" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_table_block_order_idx" ON "_home_v_blocks_table_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_table_block_parent_id_idx" ON "_home_v_blocks_table_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_table_block_path_idx" ON "_home_v_blocks_table_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_table_block_picture_idx" ON "_home_v_blocks_table_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_seo_order_idx" ON "_home_v_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_seo_parent_id_idx" ON "_home_v_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_home_v_blocks_seo_path_idx" ON "_home_v_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_home_v_version_version_picture_idx" ON "_home_v" USING btree ("version_picture_id");
  CREATE INDEX IF NOT EXISTS "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_blocks_seo_order_idx" ON "_honeyPage_v_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_blocks_seo_parent_id_idx" ON "_honeyPage_v_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_blocks_seo_path_idx" ON "_honeyPage_v_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_version_version_picture_idx" ON "_honeyPage_v" USING btree ("version_picture_id");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_version_version__status_idx" ON "_honeyPage_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_created_at_idx" ON "_honeyPage_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_updated_at_idx" ON "_honeyPage_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_latest_idx" ON "_honeyPage_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_autosave_idx" ON "_honeyPage_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_picture_block_order_idx" ON "_course_v_blocks_picture_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_picture_block_parent_id_idx" ON "_course_v_blocks_picture_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_picture_block_path_idx" ON "_course_v_blocks_picture_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_picture_block_picture_idx" ON "_course_v_blocks_picture_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_table_block_lines_order_idx" ON "_course_v_blocks_table_block_lines" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_table_block_lines_parent_id_idx" ON "_course_v_blocks_table_block_lines" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_table_block_order_idx" ON "_course_v_blocks_table_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_table_block_parent_id_idx" ON "_course_v_blocks_table_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_table_block_path_idx" ON "_course_v_blocks_table_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_table_block_picture_idx" ON "_course_v_blocks_table_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_seo_order_idx" ON "_course_v_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_seo_parent_id_idx" ON "_course_v_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_course_v_blocks_seo_path_idx" ON "_course_v_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_course_v_version_version_picture_idx" ON "_course_v" USING btree ("version_picture_id");
  CREATE INDEX IF NOT EXISTS "_course_v_version_version__status_idx" ON "_course_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_course_v_created_at_idx" ON "_course_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_course_v_updated_at_idx" ON "_course_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_course_v_latest_idx" ON "_course_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_course_v_autosave_idx" ON "_course_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_picture_block_order_idx" ON "_farming_v_blocks_picture_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_picture_block_parent_id_idx" ON "_farming_v_blocks_picture_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_picture_block_path_idx" ON "_farming_v_blocks_picture_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_picture_block_picture_idx" ON "_farming_v_blocks_picture_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_table_block_lines_order_idx" ON "_farming_v_blocks_table_block_lines" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_table_block_lines_parent_id_idx" ON "_farming_v_blocks_table_block_lines" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_table_block_order_idx" ON "_farming_v_blocks_table_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_table_block_parent_id_idx" ON "_farming_v_blocks_table_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_table_block_path_idx" ON "_farming_v_blocks_table_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_table_block_picture_idx" ON "_farming_v_blocks_table_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_seo_order_idx" ON "_farming_v_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_seo_parent_id_idx" ON "_farming_v_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_farming_v_blocks_seo_path_idx" ON "_farming_v_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_farming_v_version_version_picture_idx" ON "_farming_v" USING btree ("version_picture_id");
  CREATE INDEX IF NOT EXISTS "_farming_v_version_version__status_idx" ON "_farming_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_farming_v_created_at_idx" ON "_farming_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_farming_v_updated_at_idx" ON "_farming_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_farming_v_latest_idx" ON "_farming_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_farming_v_autosave_idx" ON "_farming_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "_contact_v_blocks_seo_order_idx" ON "_contact_v_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_contact_v_blocks_seo_parent_id_idx" ON "_contact_v_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_contact_v_blocks_seo_path_idx" ON "_contact_v_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_contact_v_version_version_picture_idx" ON "_contact_v" USING btree ("version_picture_id");
  CREATE INDEX IF NOT EXISTS "_contact_v_version_version__status_idx" ON "_contact_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_contact_v_created_at_idx" ON "_contact_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_contact_v_updated_at_idx" ON "_contact_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_contact_v_latest_idx" ON "_contact_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_contact_v_autosave_idx" ON "_contact_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "honeys__status_idx" ON "honeys" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "honeyPage__status_idx" ON "honeyPage" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "course__status_idx" ON "course" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "farming__status_idx" ON "farming" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "contact__status_idx" ON "contact" USING btree ("_status");`)
}
