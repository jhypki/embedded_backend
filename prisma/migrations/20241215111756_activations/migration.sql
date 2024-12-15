/*
  Warnings:

  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Stats";

-- CreateTable
CREATE TABLE "Activation" (
    "id" SERIAL NOT NULL,
    "activatedAy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceID" TEXT NOT NULL,

    CONSTRAINT "Activation_pkey" PRIMARY KEY ("id")
);
