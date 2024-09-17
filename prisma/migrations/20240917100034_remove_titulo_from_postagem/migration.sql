/*
  Warnings:

  - You are about to drop the column `titulo` on the `Postagens` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Postagens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conteudo" TEXT NOT NULL,
    "foto" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "autorId" TEXT NOT NULL,
    CONSTRAINT "Postagens_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Postagens" ("atualizadoEm", "autorId", "conteudo", "criadoEm", "foto", "id") SELECT "atualizadoEm", "autorId", "conteudo", "criadoEm", "foto", "id" FROM "Postagens";
DROP TABLE "Postagens";
ALTER TABLE "new_Postagens" RENAME TO "Postagens";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
