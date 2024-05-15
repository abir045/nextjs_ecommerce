
import { PrismaClient } from "@prisma/client";


const globalForPRisma = globalThis as unknown as {
    prisma: PrismaClient | undefined ;
}


export const prisma = globalForPRisma.prisma ?? new PrismaClient()

if(process.env.NODE_ENV !== "production") globalForPRisma.prisma = prisma