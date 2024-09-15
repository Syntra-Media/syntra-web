import type { Metadata } from "next";
import PortalSideBar from "@/components/ui/PortalSideBar";
import {ClerkProvider} from "@clerk/nextjs";

export const metadata: Metadata = {
    title: "Syntra Media - Client Portal",
    description: "Syntra Media client portal offers you a wide range of tools to help you manage your projects, tasks, payments, and more.",
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
