import {PrismaAdapter} from "@auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"
import {Adapter} from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({log: ['query']});

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

interface SessionParams {
    session: any;
    user: any;
}

const AuthSettings = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req): Promise<any> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) {
                    throw new Error("Invalid credentials");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Invalid credentials");
                }

                console.log(user);
                return user;
            },

        })
    ],
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
}

export default AuthSettings;