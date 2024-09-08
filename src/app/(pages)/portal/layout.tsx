import type { Metadata } from "next";
import PortalSideBar from "@/components/ui/PortalSideBar";
import {ClerkProvider} from "@clerk/nextjs";

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
        <ClerkProvider>
            <PortalSideBar>
                {children}
            </PortalSideBar>
        </ClerkProvider>
    );
}
