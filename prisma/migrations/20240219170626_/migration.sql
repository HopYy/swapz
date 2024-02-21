/*
  Warnings:

  - Added the required column `likes` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `likes` ADD COLUMN `likes` INTEGER NOT NULL;
