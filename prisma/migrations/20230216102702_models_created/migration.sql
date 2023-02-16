-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookmark" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,

    CONSTRAINT "bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "power" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pokemonId" TEXT,

    CONSTRAINT "power_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pokemon_power" (
    "id" SERIAL NOT NULL,
    "pokemonId" TEXT NOT NULL,
    "powerId" TEXT,

    CONSTRAINT "pokemon_power_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "bookmark" ADD CONSTRAINT "bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "power" ADD CONSTRAINT "power_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_power" ADD CONSTRAINT "pokemon_power_powerId_fkey" FOREIGN KEY ("powerId") REFERENCES "power"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pokemon_power" ADD CONSTRAINT "pokemon_power_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- ADD powers
INSERT INTO "power" VALUE("1" ,"Fire");
INSERT INTO "power" VALUE("2" ,"Water");
INSERT INTO "power" VALUE("3" ,"Thunder");

