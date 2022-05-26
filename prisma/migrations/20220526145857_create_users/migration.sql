-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(8) NOT NULL,
    "username" VARCHAR(20) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "picture" VARCHAR(255) NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
