/*
  Warnings:

  - Changed the type of `read` on the `Task` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "read",
ADD COLUMN     "read" BOOLEAN NOT NULL;
