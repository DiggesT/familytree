/*
  Warnings:

  - You are about to drop the column `permissions` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TreePermission" AS ENUM ('OWNER', 'COAUTHOR', 'VIEWER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "permissions",
ADD COLUMN     "userpermissions" "UserPermission"[];

-- CreateTable
CREATE TABLE "UserTreePermissions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "treeId" TEXT NOT NULL,
    "permissions" "TreePermission"[],

    CONSTRAINT "UserTreePermissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTreePermissions_userId_treeId_key" ON "UserTreePermissions"("userId", "treeId");

-- AddForeignKey
ALTER TABLE "UserTreePermissions" ADD CONSTRAINT "UserTreePermissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTreePermissions" ADD CONSTRAINT "UserTreePermissions_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Tree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
