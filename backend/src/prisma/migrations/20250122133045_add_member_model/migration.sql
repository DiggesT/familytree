-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "mother" TEXT NOT NULL,
    "father" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
