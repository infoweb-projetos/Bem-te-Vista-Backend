/*
  Warnings:

  - You are about to drop the `estilos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "estilos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Estilo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Estilo_nome_key" ON "Estilo"("nome");
