-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `short_description` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `weight` INTEGER NOT NULL DEFAULT 0,
    `quality` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 0,
    `sale_price` INTEGER NOT NULL DEFAULT 0,
    `discount` INTEGER NULL,
    `is_featured` INTEGER NOT NULL,
    `shipping_days` INTEGER NULL,
    `is_cod` INTEGER NOT NULL DEFAULT 0,
    `is_free_shipping` INTEGER NOT NULL DEFAULT 0,
    `is_sale_enable` INTEGER NOT NULL DEFAULT 0,
    `is_return` INTEGER NOT NULL DEFAULT 0,
    `is_trending` INTEGER NOT NULL DEFAULT 0,
    `is_approved` INTEGER NOT NULL DEFAULT 0,
    `is_external` INTEGER NOT NULL DEFAULT 0,
    `external_url` VARCHAR(191) NULL,
    `external_button_text` VARCHAR(191) NULL,
    `sale_starts_at` DATETIME(3) NULL,
    `sale_expired_at` DATETIME(3) NULL,
    `sku` VARCHAR(191) NOT NULL,
    `is_random_related_products` INTEGER NOT NULL DEFAULT 0,
    `stock_status` VARCHAR(191) NOT NULL,
    `meta_title` VARCHAR(191) NOT NULL,
    `meta_description` VARCHAR(191) NOT NULL,
    `product_thumbnail_id` INTEGER NOT NULL,
    `product_meta_image_id` VARCHAR(191) NOT NULL,
    `size_chart_image_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewRating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RelatedProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `relatedProductId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReviewRating` ADD CONSTRAINT `ReviewRating_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatedProduct` ADD CONSTRAINT `RelatedProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatedProduct` ADD CONSTRAINT `RelatedProduct_relatedProductId_fkey` FOREIGN KEY (`relatedProductId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
