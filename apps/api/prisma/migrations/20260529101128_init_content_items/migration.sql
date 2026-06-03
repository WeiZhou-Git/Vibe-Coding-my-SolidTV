-- CreateTable
CREATE TABLE "content_items" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "meta" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "accent" TEXT,
    "texture_group" TEXT,
    "category" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "content_items_type_is_active_sort_order_idx" ON "content_items"("type", "is_active", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "content_items_type_title_key" ON "content_items"("type", "title");
