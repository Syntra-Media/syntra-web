import NextAuth, { AuthOptions } from "next-auth";
import AuthSettings from "@/utils/auth";

const handler = NextAuth(AuthSettings as AuthOptions);

export {handler as GET, handler as POST};