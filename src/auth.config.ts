import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === "/admin/login";
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isLoginPage) return true;
      if (isOnAdmin) return isLoggedIn;
      return true;
    },
  },
  providers: [],
};
