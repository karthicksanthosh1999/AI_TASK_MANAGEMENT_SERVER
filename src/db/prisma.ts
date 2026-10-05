import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

export class PrismaDatabase {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!PrismaDatabase.instance) {
      const connectionString = process.env.DATABASE_URL;

      if (!connectionString) {
        throw new Error("DATABASE_URL is not defined");
      }

      const adapter = new PrismaPg({
        connectionString,
      });

      PrismaDatabase.instance = new PrismaClient({
        adapter,
      });
    }

    return PrismaDatabase.instance;
  }
}

export const prisma = PrismaDatabase.getInstance();