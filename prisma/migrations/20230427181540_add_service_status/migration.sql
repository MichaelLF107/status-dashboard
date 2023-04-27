-- CreateTable
CREATE TABLE "ServiceStatus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "uptime" INTEGER NOT NULL,
    "version" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "port" INTEGER NOT NULL
);
