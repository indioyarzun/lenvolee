import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  CREATE TABLE IF NOT EXISTS "honeys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"picture_id" integer,
  	"visible" boolean DEFAULT false,
  	"is_available" boolean DEFAULT true,
  	"description" varchar,
  	"weight" varchar,
  	"price" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_honeys_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "honeys_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"flowers_id" integer
  );
  
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
  
  CREATE TABLE IF NOT EXISTS "flowers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_flowers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"prefix" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "commands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"quantity" numeric DEFAULT 0 NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "client" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"surname" varchar DEFAULT '' NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"email" varchar,
  	"phone" varchar,
  	"comment" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"honeys_id" integer,
  	"flowers_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"client_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "home_blocks_picture_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" jsonb,
  	"picture_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_blocks_table_block_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left" varchar,
  	"right" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_blocks_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picture_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home_blocks_seo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"picture_id" integer,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  CREATE TABLE IF NOT EXISTS "honeyPage_blocks_seo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "honeyPage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"picture_id" integer,
  	"description" jsonb,
  	"_status" "enum_honeyPage_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  CREATE TABLE IF NOT EXISTS "course_blocks_picture_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" jsonb,
  	"picture_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "course_blocks_table_block_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left" varchar,
  	"right" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "course_blocks_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picture_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "course_blocks_seo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "course" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"picture_id" integer,
  	"_status" "enum_course_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  CREATE TABLE IF NOT EXISTS "farming_blocks_picture_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"description" jsonb,
  	"picture_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "farming_blocks_table_block_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"left" varchar,
  	"right" varchar,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "farming_blocks_table_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"picture_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "farming_blocks_seo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "farming" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"picture_id" integer,
  	"_status" "enum_farming_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  CREATE TABLE IF NOT EXISTS "contact_blocks_seo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"email" varchar,
  	"to_send" jsonb,
  	"sended" varchar DEFAULT '',
  	"picture_id" integer,
  	"_status" "enum_contact_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
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
  
  CREATE TABLE IF NOT EXISTS "calendar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT false NOT NULL,
  	"title" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone NOT NULL,
  	"production_per_week" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DO $$ BEGIN
   ALTER TABLE "honeys" ADD CONSTRAINT "honeys_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "honeys_rels" ADD CONSTRAINT "honeys_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."honeys"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "honeys_rels" ADD CONSTRAINT "honeys_rels_flowers_fk" FOREIGN KEY ("flowers_id") REFERENCES "public"."flowers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
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
   ALTER TABLE "_flowers_v" ADD CONSTRAINT "_flowers_v_parent_id_flowers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."flowers"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "commands" ADD CONSTRAINT "commands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."client"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_honeys_fk" FOREIGN KEY ("honeys_id") REFERENCES "public"."honeys"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_flowers_fk" FOREIGN KEY ("flowers_id") REFERENCES "public"."flowers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_client_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_picture_block" ADD CONSTRAINT "home_blocks_picture_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_picture_block" ADD CONSTRAINT "home_blocks_picture_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_table_block_lines" ADD CONSTRAINT "home_blocks_table_block_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_blocks_table_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_table_block" ADD CONSTRAINT "home_blocks_table_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_table_block" ADD CONSTRAINT "home_blocks_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home_blocks_seo" ADD CONSTRAINT "home_blocks_seo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "home" ADD CONSTRAINT "home_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "honeyPage_blocks_seo" ADD CONSTRAINT "honeyPage_blocks_seo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."honeyPage"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "honeyPage" ADD CONSTRAINT "honeyPage_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "course_blocks_picture_block" ADD CONSTRAINT "course_blocks_picture_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "course_blocks_picture_block" ADD CONSTRAINT "course_blocks_picture_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "course_blocks_table_block_lines" ADD CONSTRAINT "course_blocks_table_block_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."course_blocks_table_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "course_blocks_table_block" ADD CONSTRAINT "course_blocks_table_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "course_blocks_table_block" ADD CONSTRAINT "course_blocks_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "course_blocks_seo" ADD CONSTRAINT "course_blocks_seo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."course"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "course" ADD CONSTRAINT "course_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "farming_blocks_picture_block" ADD CONSTRAINT "farming_blocks_picture_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "farming_blocks_picture_block" ADD CONSTRAINT "farming_blocks_picture_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."farming"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "farming_blocks_table_block_lines" ADD CONSTRAINT "farming_blocks_table_block_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."farming_blocks_table_block"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "farming_blocks_table_block" ADD CONSTRAINT "farming_blocks_table_block_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "farming_blocks_table_block" ADD CONSTRAINT "farming_blocks_table_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."farming"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "farming_blocks_seo" ADD CONSTRAINT "farming_blocks_seo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."farming"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "farming" ADD CONSTRAINT "farming_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
   ALTER TABLE "contact_blocks_seo" ADD CONSTRAINT "contact_blocks_seo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "contact" ADD CONSTRAINT "contact_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
  
  CREATE INDEX IF NOT EXISTS "honeys_picture_idx" ON "honeys" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "honeys_updated_at_idx" ON "honeys" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "honeys_created_at_idx" ON "honeys" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "honeys__status_idx" ON "honeys" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "honeys_rels_order_idx" ON "honeys_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "honeys_rels_parent_idx" ON "honeys_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "honeys_rels_path_idx" ON "honeys_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "honeys_rels_flowers_id_idx" ON "honeys_rels" USING btree ("flowers_id");
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
  CREATE INDEX IF NOT EXISTS "flowers_updated_at_idx" ON "flowers" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "flowers_created_at_idx" ON "flowers" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_flowers_v_parent_idx" ON "_flowers_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_flowers_v_version_version_updated_at_idx" ON "_flowers_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_flowers_v_version_version_created_at_idx" ON "_flowers_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_flowers_v_created_at_idx" ON "_flowers_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_flowers_v_updated_at_idx" ON "_flowers_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "commands_order_idx" ON "commands" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "commands_parent_id_idx" ON "commands" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "client_updated_at_idx" ON "client" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "client_created_at_idx" ON "client" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_honeys_id_idx" ON "payload_locked_documents_rels" USING btree ("honeys_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_flowers_id_idx" ON "payload_locked_documents_rels" USING btree ("flowers_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_client_id_idx" ON "payload_locked_documents_rels" USING btree ("client_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "home_blocks_picture_block_order_idx" ON "home_blocks_picture_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_blocks_picture_block_parent_id_idx" ON "home_blocks_picture_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_picture_block_path_idx" ON "home_blocks_picture_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "home_blocks_picture_block_picture_idx" ON "home_blocks_picture_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_table_block_lines_order_idx" ON "home_blocks_table_block_lines" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_blocks_table_block_lines_parent_id_idx" ON "home_blocks_table_block_lines" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_table_block_order_idx" ON "home_blocks_table_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_blocks_table_block_parent_id_idx" ON "home_blocks_table_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_table_block_path_idx" ON "home_blocks_table_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "home_blocks_table_block_picture_idx" ON "home_blocks_table_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_seo_order_idx" ON "home_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "home_blocks_seo_parent_id_idx" ON "home_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "home_blocks_seo_path_idx" ON "home_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "home_picture_idx" ON "home" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "home__status_idx" ON "home" USING btree ("_status");
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
  CREATE INDEX IF NOT EXISTS "honeyPage_blocks_seo_order_idx" ON "honeyPage_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "honeyPage_blocks_seo_parent_id_idx" ON "honeyPage_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "honeyPage_blocks_seo_path_idx" ON "honeyPage_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "honeyPage_picture_idx" ON "honeyPage" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "honeyPage__status_idx" ON "honeyPage" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_blocks_seo_order_idx" ON "_honeyPage_v_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_blocks_seo_parent_id_idx" ON "_honeyPage_v_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_blocks_seo_path_idx" ON "_honeyPage_v_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_version_version_picture_idx" ON "_honeyPage_v" USING btree ("version_picture_id");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_version_version__status_idx" ON "_honeyPage_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_created_at_idx" ON "_honeyPage_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_updated_at_idx" ON "_honeyPage_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_latest_idx" ON "_honeyPage_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_honeyPage_v_autosave_idx" ON "_honeyPage_v" USING btree ("autosave");
  CREATE INDEX IF NOT EXISTS "course_blocks_picture_block_order_idx" ON "course_blocks_picture_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "course_blocks_picture_block_parent_id_idx" ON "course_blocks_picture_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "course_blocks_picture_block_path_idx" ON "course_blocks_picture_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "course_blocks_picture_block_picture_idx" ON "course_blocks_picture_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "course_blocks_table_block_lines_order_idx" ON "course_blocks_table_block_lines" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "course_blocks_table_block_lines_parent_id_idx" ON "course_blocks_table_block_lines" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "course_blocks_table_block_order_idx" ON "course_blocks_table_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "course_blocks_table_block_parent_id_idx" ON "course_blocks_table_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "course_blocks_table_block_path_idx" ON "course_blocks_table_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "course_blocks_table_block_picture_idx" ON "course_blocks_table_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "course_blocks_seo_order_idx" ON "course_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "course_blocks_seo_parent_id_idx" ON "course_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "course_blocks_seo_path_idx" ON "course_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "course_picture_idx" ON "course" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "course__status_idx" ON "course" USING btree ("_status");
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
  CREATE INDEX IF NOT EXISTS "farming_blocks_picture_block_order_idx" ON "farming_blocks_picture_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "farming_blocks_picture_block_parent_id_idx" ON "farming_blocks_picture_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "farming_blocks_picture_block_path_idx" ON "farming_blocks_picture_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "farming_blocks_picture_block_picture_idx" ON "farming_blocks_picture_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "farming_blocks_table_block_lines_order_idx" ON "farming_blocks_table_block_lines" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "farming_blocks_table_block_lines_parent_id_idx" ON "farming_blocks_table_block_lines" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "farming_blocks_table_block_order_idx" ON "farming_blocks_table_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "farming_blocks_table_block_parent_id_idx" ON "farming_blocks_table_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "farming_blocks_table_block_path_idx" ON "farming_blocks_table_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "farming_blocks_table_block_picture_idx" ON "farming_blocks_table_block" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "farming_blocks_seo_order_idx" ON "farming_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "farming_blocks_seo_parent_id_idx" ON "farming_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "farming_blocks_seo_path_idx" ON "farming_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "farming_picture_idx" ON "farming" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "farming__status_idx" ON "farming" USING btree ("_status");
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
  CREATE INDEX IF NOT EXISTS "contact_blocks_seo_order_idx" ON "contact_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "contact_blocks_seo_parent_id_idx" ON "contact_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "contact_blocks_seo_path_idx" ON "contact_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "contact_picture_idx" ON "contact" USING btree ("picture_id");
  CREATE INDEX IF NOT EXISTS "contact__status_idx" ON "contact" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_contact_v_blocks_seo_order_idx" ON "_contact_v_blocks_seo" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_contact_v_blocks_seo_parent_id_idx" ON "_contact_v_blocks_seo" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_contact_v_blocks_seo_path_idx" ON "_contact_v_blocks_seo" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_contact_v_version_version_picture_idx" ON "_contact_v" USING btree ("version_picture_id");
  CREATE INDEX IF NOT EXISTS "_contact_v_version_version__status_idx" ON "_contact_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_contact_v_created_at_idx" ON "_contact_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_contact_v_updated_at_idx" ON "_contact_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_contact_v_latest_idx" ON "_contact_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_contact_v_autosave_idx" ON "_contact_v" USING btree ("autosave");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "honeys" CASCADE;
  DROP TABLE "honeys_rels" CASCADE;
  DROP TABLE "_honeys_v" CASCADE;
  DROP TABLE "_honeys_v_rels" CASCADE;
  DROP TABLE "flowers" CASCADE;
  DROP TABLE "_flowers_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "commands" CASCADE;
  DROP TABLE "client" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_blocks_picture_block" CASCADE;
  DROP TABLE "home_blocks_table_block_lines" CASCADE;
  DROP TABLE "home_blocks_table_block" CASCADE;
  DROP TABLE "home_blocks_seo" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v_blocks_picture_block" CASCADE;
  DROP TABLE "_home_v_blocks_table_block_lines" CASCADE;
  DROP TABLE "_home_v_blocks_table_block" CASCADE;
  DROP TABLE "_home_v_blocks_seo" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "honeyPage_blocks_seo" CASCADE;
  DROP TABLE "honeyPage" CASCADE;
  DROP TABLE "_honeyPage_v_blocks_seo" CASCADE;
  DROP TABLE "_honeyPage_v" CASCADE;
  DROP TABLE "course_blocks_picture_block" CASCADE;
  DROP TABLE "course_blocks_table_block_lines" CASCADE;
  DROP TABLE "course_blocks_table_block" CASCADE;
  DROP TABLE "course_blocks_seo" CASCADE;
  DROP TABLE "course" CASCADE;
  DROP TABLE "_course_v_blocks_picture_block" CASCADE;
  DROP TABLE "_course_v_blocks_table_block_lines" CASCADE;
  DROP TABLE "_course_v_blocks_table_block" CASCADE;
  DROP TABLE "_course_v_blocks_seo" CASCADE;
  DROP TABLE "_course_v" CASCADE;
  DROP TABLE "farming_blocks_picture_block" CASCADE;
  DROP TABLE "farming_blocks_table_block_lines" CASCADE;
  DROP TABLE "farming_blocks_table_block" CASCADE;
  DROP TABLE "farming_blocks_seo" CASCADE;
  DROP TABLE "farming" CASCADE;
  DROP TABLE "_farming_v_blocks_picture_block" CASCADE;
  DROP TABLE "_farming_v_blocks_table_block_lines" CASCADE;
  DROP TABLE "_farming_v_blocks_table_block" CASCADE;
  DROP TABLE "_farming_v_blocks_seo" CASCADE;
  DROP TABLE "_farming_v" CASCADE;
  DROP TABLE "contact_blocks_seo" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "_contact_v_blocks_seo" CASCADE;
  DROP TABLE "_contact_v" CASCADE;
  DROP TABLE "calendar" CASCADE;
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
  DROP TYPE "public"."enum__contact_v_version_status";`);
}
