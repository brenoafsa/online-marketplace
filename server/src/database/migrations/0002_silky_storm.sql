CREATE TABLE "product_order" (
	"quantity" integer NOT NULL,
	"price_at_purchase" real NOT NULL,
	"purchase_id" text NOT NULL,
	"product_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_purchase_id_purchase_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchase"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;