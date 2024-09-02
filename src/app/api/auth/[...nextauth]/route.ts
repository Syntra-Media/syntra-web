import NextAuth from "next-auth";
import AuthSettings from "@/utils/auth";

const handler = NextAuth(AuthSettings);

export {handler as GET, handler as POST};