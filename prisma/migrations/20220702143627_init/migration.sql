/*
  Warnings:

  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum("users_role")` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `Sim_card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `operator` VARCHAR(191) NOT NULL DEFAULT 'kyivstar',
    `active` BOOLEAN NOT NULL DEFAULT true,
    `observationId` INTEGER NULL,

    UNIQUE INDEX `Sim_card_number_key`(`number`),
    UNIQUE INDEX `Sim_card_observationId_key`(`observationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `adress` VARCHAR(191) NULL,
    `coordinate` VARCHAR(191) NULL,
    `service_contract` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact_person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `surename` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `fathersname` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `position` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `firmId` INTEGER NULL,

    UNIQUE INDEX `Contact_person_phone_key`(`phone`),
    UNIQUE INDEX `Contact_person_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Observation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `contract` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fire_hydrant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reminding` BOOLEAN NOT NULL DEFAULT true,
    `quantity` INTEGER NOT NULL,
    `next_check` VARCHAR(191) NOT NULL,
    `firmId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fire_extinguishers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reminding` BOOLEAN NOT NULL DEFAULT true,
    `model` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `next_check` VARCHAR(191) NOT NULL,
    `firmId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fire_resistant_impregnation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reminding` BOOLEAN NOT NULL DEFAULT true,
    `seepage_liquid` VARCHAR(191) NOT NULL,
    `area` INTEGER NOT NULL,
    `next_check` VARCHAR(191) NOT NULL,
    `firmId` INTEGER NULL,

    UNIQUE INDEX `Fire_resistant_impregnation_firmId_key`(`firmId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sim_card` ADD CONSTRAINT `Sim_card_observationId_fkey` FOREIGN KEY (`observationId`) REFERENCES `Observation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact_person` ADD CONSTRAINT `Contact_person_firmId_fkey` FOREIGN KEY (`firmId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fire_hydrant` ADD CONSTRAINT `Fire_hydrant_firmId_fkey` FOREIGN KEY (`firmId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fire_extinguishers` ADD CONSTRAINT `Fire_extinguishers_firmId_fkey` FOREIGN KEY (`firmId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fire_resistant_impregnation` ADD CONSTRAINT `Fire_resistant_impregnation_firmId_fkey` FOREIGN KEY (`firmId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
