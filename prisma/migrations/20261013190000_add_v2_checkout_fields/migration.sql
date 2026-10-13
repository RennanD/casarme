-- AlterTable
ALTER TABLE "invitations" ADD COLUMN "transparentChargeId" TEXT,
ADD COLUMN "includePlanner" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "invitations_transparentChargeId_key" ON "invitations"("transparentChargeId");
