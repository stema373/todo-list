/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- First add the uid column as nullable
ALTER TABLE "User" ADD COLUMN "uid" TEXT;

-- Update existing users with a temporary uid based on their id
UPDATE "User" SET "uid" = CONCAT('temp_uid_', id::text) WHERE "uid" IS NULL;

-- Now make the column required
ALTER TABLE "User" ALTER COLUMN "uid" SET NOT NULL;

-- Add the unique constraint
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
