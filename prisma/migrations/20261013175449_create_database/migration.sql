/*
  Warnings:

  - A unique constraint covering the columns `[billingId]` on the table `invitations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "invitations" ADD COLUMN     "billingId" TEXT,
ADD COLUMN     "billingUrl" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "inviteType" TEXT NOT NULL DEFAULT 'site',
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentStatus" TEXT,
ADD COLUMN     "purchasedAt" TIMESTAMP(3),
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePaymentIntentId" TEXT,
ADD COLUMN     "stripeSessionId" TEXT,
ADD COLUMN     "whatsapp" TEXT,
ALTER COLUMN "coupleStory" DROP NOT NULL;

-- CreateTable
CREATE TABLE "godparent_downloads" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "godparent_downloads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "godparent_downloads_email_idx" ON "godparent_downloads"("email");

-- CreateIndex
CREATE UNIQUE INDEX "invitations_billingId_key" ON "invitations"("billingId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
