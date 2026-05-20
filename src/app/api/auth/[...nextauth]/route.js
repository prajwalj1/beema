import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const dynamic = "force-dynamic";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email Address",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const dbConnect = (await import("@/lib/dbConnect")).default;
          const User = (await import("@/models/User")).default;
          const bcrypt = (await import("bcryptjs")).default;

          await dbConnect();

          const user = await User.findOne({ email: credentials.email.toLowerCase() });
          if (!user) {
            return null;
          }

          // If role was supplied during login, make sure it matches
          if (credentials.role && user.role !== credentials.role) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordCorrect) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      try {
        if (user) {
          token.role = user.role;
          token.email = user.email;
          token.name = user.name;
        }
        if (trigger === "update" && session) {
          if (session.role) token.role = session.role;
          if (session.name) token.name = session.name;
        }
      } catch (err) {
        console.error("JWT Callback Error:", err);
      }
      return token;
    },
    async session({ session, token }) {
      try {
        if (token && session) {
          if (!session.user) {
            session.user = {};
          }
          session.user.role = token.role || "customer";
          session.user.email = token.email;
          session.user.name = token.name;
        }
      } catch (err) {
        console.error("Session Callback Error:", err);
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_only"
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
