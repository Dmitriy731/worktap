/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `user1Id` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `user2Id` on the `Room` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_RoomUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RoomUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Room" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoomUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
INSERT INTO "new_Room" ("id") SELECT "id" FROM "Room";
DROP TABLE "Room";
ALTER TABLE "new_Room" RENAME TO "Room";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_RoomUsers_AB_unique" ON "_RoomUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_RoomUsers_B_index" ON "_RoomUsers"("B");
