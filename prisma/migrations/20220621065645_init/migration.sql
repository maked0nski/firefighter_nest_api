-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `surename` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `fathersname` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `birthday` DATE NULL,
    `password` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    `role` ENUM('USER', 'ADMIN', 'ROOT') NOT NULL DEFAULT 'USER',
    `refresh_token` VARCHAR(500) NULL,
    `access_token` VARCHAR(500) NULL,
    `positionId` INTEGER NULL,

    UNIQUE INDEX `users_phone_key`(`phone`),
    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vin` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `fuel` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `passport_car` VARCHAR(191) NOT NULL,
    `oddometr` INTEGER NOT NULL,
    `insurance` DATETIME(3) NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Car_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fuel_card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `pin` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `station_brend` ENUM('OKKO', 'WOG') NOT NULL DEFAULT 'OKKO',
    `userId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Position`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fuel_card` ADD CONSTRAINT `Fuel_card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
