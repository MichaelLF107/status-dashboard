/*
  Warnings:

  - You are about to drop the column `duration` on the `Traffic` table. All the data in the column will be lost.
  - You are about to drop the column `method` on the `Traffic` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Traffic` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Traffic` table. All the data in the column will be lost.
  - Added the required column `deletes` to the `Traffic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gets` to the `Traffic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patch` to the `Traffic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posts` to the `Traffic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `puts` to the `Traffic` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Traffic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "gets" INTEGER NOT NULL,
    "posts" INTEGER NOT NULL,
    "puts" INTEGER NOT NULL,
    "deletes" INTEGER NOT NULL,
    "patch" INTEGER NOT NULL
);
INSERT INTO "new_Traffic" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Traffic";
DROP TABLE "Traffic";
ALTER TABLE "new_Traffic" RENAME TO "Traffic";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
