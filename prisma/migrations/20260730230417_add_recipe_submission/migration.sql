-- CreateEnum
CREATE TYPE "RecipeStatus" AS ENUM ('PENDING', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "status" "RecipeStatus" NOT NULL DEFAULT 'PUBLISHED',
ADD COLUMN     "submittedByUserId" UUID;

-- CreateIndex
CREATE INDEX "Recipe_status_idx" ON "Recipe"("status");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_submittedByUserId_fkey" FOREIGN KEY ("submittedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
