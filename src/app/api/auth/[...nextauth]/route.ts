import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { env } from "@/lib/env";
import { prisma } from "@/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { PrismaClient } from "@prisma/client/extension";
import { authOptions } from "@/app/lib/auth";



 const handler = NextAuth(authOptions) 



 export {handler as GET, handler as POST }


