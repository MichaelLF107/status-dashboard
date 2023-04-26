/*
  Warnings:

  - You are about to drop the column `queries` on the `Performance` table. All the data in the column will be lost.
  - Added the required column `cpuFree` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memFree` to the `Performance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Performance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "loadAvg" REAL NOT NULL,
    "memUsed" REAL NOT NULL,
    "memFree" REAL NOT NULL,
    "cpuUsed" REAL NOT NULL,
    "cpuFree" REAL NOT NULL
);
INSERT INTO "new_Performance" ("cpuUsed", "createdAt", "id", "loadAvg", "memUsed", "updatedAt") SELECT "cpuUsed", "createdAt", "id", "loadAvg", "memUsed", "updatedAt" FROM "Performance";
DROP TABLE "Performance";
ALTER TABLE "new_Performance" RENAME TO "Performance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
