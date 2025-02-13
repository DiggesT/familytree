/*
  Warnings:

  - Added the required column `treeId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "treeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tree" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Tree_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tree" ADD CONSTRAINT "Tree_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
