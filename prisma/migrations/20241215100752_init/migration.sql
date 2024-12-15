-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "filepath" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mimeType" TEXT NOT NULL,
    "label" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
