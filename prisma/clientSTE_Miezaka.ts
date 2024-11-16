import { PrismaClient } from "./generated/STE_MIEZAKA_URL";

const globalForPrisma = globalThis as unknown as { STE_miezaka: PrismaClient };

export const STE_miezaka = globalForPrisma.STE_miezaka || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.STE_miezaka = STE_miezaka;
