-- CreateTable
CREATE TABLE "UserEstilo" (
    "userId" TEXT NOT NULL,
    "estiloId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "estiloId"),
    CONSTRAINT "UserEstilo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserEstilo_estiloId_fkey" FOREIGN KEY ("estiloId") REFERENCES "Estilo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
