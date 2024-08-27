/*
  Warnings:

  - You are about to drop the `Estilo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Estilo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "estilos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "estilos_nome_key" ON "estilos"("nome");
