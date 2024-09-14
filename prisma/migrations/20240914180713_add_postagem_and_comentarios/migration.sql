-- CreateTable
CREATE TABLE "Postagens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "foto" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    "autorId" TEXT NOT NULL,
    CONSTRAINT "Postagens_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comentarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "conteudo" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postagemId" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    CONSTRAINT "Comentarios_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "Postagens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comentarios_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
