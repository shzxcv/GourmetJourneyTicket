/*
  Warnings:

  - Added the required column `close_time` to the `shops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `open_time` to the `shops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shops` ADD COLUMN `close_time` VARCHAR(255) NOT NULL,
    ADD COLUMN `open_time` VARCHAR(255) NOT NULL;
