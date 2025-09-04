/*
  Warnings:

  - You are about to drop the column `Otp` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `Otp`,
    ADD COLUMN `otp` INTEGER NOT NULL DEFAULT 0,
    MODIFY `status` INTEGER NOT NULL DEFAULT 0;
