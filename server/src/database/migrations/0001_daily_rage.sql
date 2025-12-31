CREATE TABLE "purchase" (
	"id" text PRIMARY KEY NOT NULL,
	"total_price" real NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "wish_list" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "wish_list_product" DROP CONSTRAINT "wish_list_product_wish_list_id_address_id_fk";
--> statement-breakpoint
ALTER TABLE "address" ADD COLUMN "street" text NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ADD COLUMN "neighborhood" text NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ADD COLUMN "latitude" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "address" ADD COLUMN "longitude" double precision NOT NULL;--> statement-breakpoint
ALTER TABLE "wish_list_product" ADD CONSTRAINT "wish_list_product_wish_list_id_wish_list_id_fk" FOREIGN KEY ("wish_list_id") REFERENCES "public"."wish_list"("id") ON DELETE no action ON UPDATE no action;