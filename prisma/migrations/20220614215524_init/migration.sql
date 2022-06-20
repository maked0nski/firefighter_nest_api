-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    `role` ENUM('USER', 'ADMIN', 'ROOT') NOT NULL DEFAULT 'USER',
    `refresh_token` VARCHAR(500) NULL,
    `access_token` VARCHAR(500) NULL,
    `positionId` INTEGER NOT NULL,
    `carId` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `surename` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `fathersname` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `UserInfo_phone_key`(`phone`),
    UNIQUE INDEX `UserInfo_userId_key`(`userId`),
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fuel_card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `pin` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `station_brend` ENUM('OKKO', 'WOG') NOT NULL DEFAULT 'OKKO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOnFuel_cards` (
    `userId` INTEGER NOT NULL,
    `fuel_cardId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `fuel_cardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `Position`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInfo` ADD CONSTRAINT `UserInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnFuel_cards` ADD CONSTRAINT `UsersOnFuel_cards_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnFuel_cards` ADD CONSTRAINT `UsersOnFuel_cards_fuel_cardId_fkey` FOREIGN KEY (`fuel_cardId`) REFERENCES `Fuel_card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
