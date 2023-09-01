/*
  Warnings:

  - Added the required column `poster_image` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_image_id` to the `Movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "poster_image" TEXT NOT NULL,
ADD COLUMN     "poster_image_id" TEXT NOT NULL;
