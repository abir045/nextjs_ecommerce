import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { env } from "@/lib/env";
import { prisma } from "@/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { PrismaClient } from "@prisma/client/extension";

  const  authOptions: NextAuthOptions = {
    
    adapter: PrismaAdapter(prisma ) as Adapter,
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        session({session, user}) {
         session.user.id = user.id
         return session;
        }
    },
    events: {
        async signIn({user}){
          await mergeAnonymousCartIntoUserCart(user.id) ;
        }

    }

}

export const handler = NextAuth(authOptions) as never

// export const GET = handler.GET;
// export const POST = handler.POST;

export {handler as GET, handler as POST, authOptions}

// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions)