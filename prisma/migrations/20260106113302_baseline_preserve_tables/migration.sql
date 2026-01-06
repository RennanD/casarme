-- Baseline migration: preserve existing tables
-- These tables (users, accounts, sessions, verification_tokens) exist in production
-- and are preserved but not managed by Prisma migrations.
-- This migration ensures Prisma recognizes these tables exist and won't try to drop them.

-- Create tables only if they don't exist (preserves existing data)
DO $$ 
BEGIN
  -- Preserve users table
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users') THEN
    CREATE TABLE "users" (
      "id" TEXT NOT NULL,
      "name" TEXT,
      "email" TEXT,
      "emailVerified" TIMESTAMP(3),
      "image" TEXT,
      CONSTRAINT "users_pkey" PRIMARY KEY ("id")
    );
    CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
  END IF;

  -- Preserve accounts table
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'accounts') THEN
    CREATE TABLE "accounts" (
      "id" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "type" TEXT NOT NULL,
      "provider" TEXT NOT NULL,
      "providerAccountId" TEXT NOT NULL,
      "refresh_token" TEXT,
      "access_token" TEXT,
      "expires_at" INTEGER,
      "token_type" TEXT,
      "scope" TEXT,
      "id_token" TEXT,
      "session_state" TEXT,
      CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
    );
    CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");
  END IF;

  -- Preserve sessions table
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'sessions') THEN
    CREATE TABLE "sessions" (
      "id" TEXT NOT NULL,
      "sessionToken" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "expires" TIMESTAMP(3) NOT NULL,
      CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
    );
    CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");
  END IF;

  -- Preserve verification_tokens table
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'verification_tokens') THEN
    CREATE TABLE "verification_tokens" (
      "identifier" TEXT NOT NULL,
      "token" TEXT NOT NULL,
      "expires" TIMESTAMP(3) NOT NULL
    );
    CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");
    CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");
  END IF;
END $$;
