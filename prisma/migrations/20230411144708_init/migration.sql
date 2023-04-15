/*
  Warnings:

  - You are about to drop the column `sheets` on the `shops` table. All the data in the column will be lost.
  - Added the required column `seats` to the `shops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shops` DROP COLUMN `sheets`,
    ADD COLUMN `seats` INTEGER NOT NULL;
