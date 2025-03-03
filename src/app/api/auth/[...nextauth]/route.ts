// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { comparePassword } from '@/lib/password';
// import prisma from '@/lib/database';
// import { JWT } from 'next-auth/jwt';
// import { Session } from 'next-auth';

// // Define proper types for the callback parameters
// interface JWTCallbackParams {
//   token: JWT;
//   user: any;
// }

// // Extend the built-in types to include the id field
// interface CustomSessionUser {
//   name?: string | null;
//   email?: string | null;
//   image?: string | null;
//   id?: string;
// }

// interface CustomSession extends Session {
//   user?: CustomSessionUser;
// }

// interface SessionCallbackParams {
//   session: CustomSession;
//   token: JWT & { id?: string };
// }

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Please enter email and password');
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) {
//           throw new Error('No user found with this email');
//         }

//         const isPasswordValid = await comparePassword(credentials.password, user.password);

//         if (!isPasswordValid) {
//           throw new Error('Incorrect password');
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name
//         };
//       },
//     }),
//   ],
//   session: { strategy: 'jwt' as const },  // Use 'as const' to fix the strategy type
//   callbacks: {
//     async jwt({ token, user }: JWTCallbackParams) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }: SessionCallbackParams) {
//       if (session.user) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/login',
//     error: '/login',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "@/lib/password";
import prisma from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

// ✅ Define NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await comparePassword(credentials.password, user.password);

        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Correct export format for Next.js App Router
const handler = NextAuth(authOptions);

// ✅ Fix: Wrap handler inside a function for Next.js App Router compatibility
export function GET(req: NextRequest) {
  return handler(req, NextResponse);
}

export function POST(req: NextRequest) {
  return handler(req, NextResponse);
}
