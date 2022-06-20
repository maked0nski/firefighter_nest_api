/*
  Warnings:

  - You are about to drop the `usersonfuel_cards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `usersonfuel_cards` DROP FOREIGN KEY `UsersOnFuel_cards_fuel_cardId_fkey`;

-- DropForeignKey
ALTER TABLE `usersonfuel_cards` DROP FOREIGN KEY `UsersOnFuel_cards_userId_fkey`;

-- DropTable
DROP TABLE `usersonfuel_cards`;

-- CreateTable
CREATE TABLE `_Fuel_cardToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Fuel_cardToUser_AB_unique`(`A`, `B`),
    INDEX `_Fuel_cardToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Fuel_cardToUser` ADD CONSTRAINT `_Fuel_cardToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Fuel_card`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Fuel_cardToUser` ADD CONSTRAINT `_Fuel_cardToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
