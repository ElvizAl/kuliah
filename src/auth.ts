import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/db/prisma"
import Crendetials from "next-auth/providers/credentials"
import { LoginSchema } from "./schema/auth"
import { compareSync } from "bcrypt-ts"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Crendetials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
          const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }
        
        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) return null;

        return user;
      }
    })  
  ],
})