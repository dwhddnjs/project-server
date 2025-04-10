-- CreateTable
CREATE TABLE "Champion" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon_image" TEXT NOT NULL,
    "full_image" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("id")
);
