-- AlterTable
ALTER TABLE "Usuarios" ADD COLUMN "foto" TEXT;

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "autorId" TEXT NOT NULL,
    "postagemId" TEXT NOT NULL,
    CONSTRAINT "Like_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Like_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_autorId_postagemId_key" ON "Like"("autorId", "postagemId");
