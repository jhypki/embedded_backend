-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "activatedToday" INTEGER NOT NULL,
    "activatedWeek" INTEGER NOT NULL,
    "activatedMonth" INTEGER NOT NULL,
    "activatedYear" INTEGER NOT NULL,
    "activatedTotal" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);
