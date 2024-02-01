/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_authorId_fkey";

-- DropIndex
DROP INDEX "User_userEmail_key";

-- AlterTable
-- ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
-- DROP COLUMN "userEmail",
-- DROP COLUMN "userId",
-- ADD COLUMN     "email" TEXT NOT NULL,
-- ADD COLUMN     "id" SERIAL NOT NULL,
-- ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

ALTER TABLE "User" RENAME COLUMN "userId" TO "id";
ALTER TABLE "User" RENAME COLUMN "userEmail" TO "email";


-- CreateIndex
-- CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
