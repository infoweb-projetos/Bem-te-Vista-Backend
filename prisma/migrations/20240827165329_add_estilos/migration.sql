-- CreateTable
CREATE TABLE "Estilo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Estilo_nome_key" ON "Estilo"("nome");
