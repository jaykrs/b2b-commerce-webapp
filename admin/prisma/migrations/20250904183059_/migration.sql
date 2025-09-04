/*
  Warnings:

  - Added the required column `Otp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `Otp` VARCHAR(191) NOT NULL;
