/*
  Warnings:

  - You are about to drop the column `puts` on the `Traffic` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Traffic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "gets" INTEGER NOT NULL,
    "posts" INTEGER NOT NULL,
    "deletes" INTEGER NOT NULL,
    "patch" INTEGER NOT NULL
);
INSERT INTO "new_Traffic" ("createdAt", "deletes", "gets", "id", "patch", "posts", "updatedAt") SELECT "createdAt", "deletes", "gets", "id", "patch", "posts", "updatedAt" FROM "Traffic";
DROP TABLE "Traffic";
ALTER TABLE "new_Traffic" RENAME TO "Traffic";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
