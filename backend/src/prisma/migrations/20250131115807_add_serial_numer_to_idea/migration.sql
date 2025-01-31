/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_serialNumber_key" ON "Member"("serialNumber");
