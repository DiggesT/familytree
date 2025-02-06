-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('ALL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermission"[];
