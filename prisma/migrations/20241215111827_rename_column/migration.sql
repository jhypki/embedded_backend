/*
  Warnings:

  - You are about to drop the column `activatedAy` on the `Activation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activation" DROP COLUMN "activatedAy",
ADD COLUMN     "activatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
