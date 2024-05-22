
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { prisma } from "@/lib/db/prisma";
import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { env } from "@/lib/env";

export const  authOptions: NextAuthOptions = {
    
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