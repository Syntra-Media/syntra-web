import type { Metadata } from "next";
import NextAuthSessionProvider from "@/components/providers/SessionProvider";
import PortalSideBar from "@/components/ui/PortalSideBar";

export const metadata: Metadata = {
    title: "Syntra Media - Client Portal",
    description: "Syntra Media is a digital agency that specializes in web development and design.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PortalSideBar>
            {children}
        </PortalSideBar>
    );
}
