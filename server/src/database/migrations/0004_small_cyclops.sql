CREATE TYPE "public"."CATEGORY" AS ENUM('GAME', 'ASSET', 'COURSE', 'AUDIO', 'TEMPLATE', 'SOFTWARE', 'E-BOOK', 'VIDEO');--> statement-breakpoint
CREATE TYPE "public"."PRODUCT_TYPE" AS ENUM('PHYSICAL', 'DIGITAL');--> statement-breakpoint
CREATE TYPE "public"."LANGUAGE" AS ENUM('BR', 'EN');--> statement-breakpoint
CREATE TYPE "public"."ROLE" AS ENUM('CUSTOMER', 'SELLER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "product" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"price" real NOT NULL,
	"sale_percentage" integer,
	"purchase_count" integer DEFAULT 0,
	"on_spotlight" boolean NOT NULL,
	"stars" real DEFAULT 0,
	"type" "PRODUCT_TYPE" NOT NULL,
	"category" "CATEGORY" NOT NULL,
	CONSTRAINT "valid_percentage_check" CHECK ("product"."sale_percentage" BETWEEN 1 AND 100),
	CONSTRAINT "valid_stars_check" CHECK ("product"."stars" BETWEEN 0 AND 5)
);
--> statement-breakpoint
CREATE TABLE "product_order" (
	"quantity" integer NOT NULL,
	"price_at_purchase" real NOT NULL,
	"purchase_id" text NOT NULL,
	"product_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchase" (
	"id" text PRIMARY KEY NOT NULL,
	"total_price" real NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" text PRIMARY KEY NOT NULL,
	"stars" real NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "valid_stars_check" CHECK ("review"."stars" BETWEEN 0 AND 5)
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"phone" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"role" "ROLE" DEFAULT 'CUSTOMER',
	"language" "LANGUAGE" DEFAULT 'EN',
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "wish_list_product" (
	"wish_list_id" text NOT NULL,
	"product_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wish_list" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_purchase_id_purchase_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchase"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wish_list_product" ADD CONSTRAINT "wish_list_product_wish_list_id_wish_list_id_fk" FOREIGN KEY ("wish_list_id") REFERENCES "public"."wish_list"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wish_list_product" ADD CONSTRAINT "wish_list_product_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;