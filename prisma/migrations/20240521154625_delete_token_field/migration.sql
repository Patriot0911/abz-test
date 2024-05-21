/*
  Warnings:

  - You are about to drop the column `token` on the `tokens` table. All the data in the column will be lost.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "tokens_token_key";

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "token";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL;
