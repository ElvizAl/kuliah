import NextAuth, { AuthError } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/db/prisma"
import Crendetials from "next-auth/providers/credentials"
import { LoginSchema } from "./schema/auth"
import { compareSync } from "bcrypt-ts"
import { ZodError } from "zod"

export class CustomAuthError extends AuthError {
  constructor(msg: string) {
    super();
    this.message = msg;
    this.stack = undefined;
  }
}

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
        try {
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
        } catch (error: unknown) {
          if (error instanceof ZodError) throw new CustomAuthError("Invalid Credentials");
          if (error instanceof Error) throw new CustomAuthError(error.message);
          throw new CustomAuthError("An unknown error occurred");
        }
      },
    }),
  ],
})