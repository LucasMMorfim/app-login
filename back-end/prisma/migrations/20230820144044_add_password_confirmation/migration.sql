/*
  Warnings:

  - Added the required column `password_confirmation` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "password_confirmation" BOOLEAN NOT NULL;
