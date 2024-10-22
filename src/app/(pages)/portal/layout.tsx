import type { Metadata } from "next";
import PortalSideBar from "@/components/ui/PortalSideBar";
import {ClerkProvider} from "@clerk/nextjs";
import { PortalProvider } from "@/components/providers/PortalProvider";
import { headers } from "next/headers";

export const metadata: Metadata = {
    title: "Syntra Media - Müşteri Portalı",
    description: "Syntra Media müşteri portalına hoş geldiniz. Projelerinizi yönetin, dosyalarınızı görüntüleyin ve ekibinizle işbirliği yapın.",
};

export default async function RootLayout({
      children,
  }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <PortalProvider>
                <PortalSideBar>
                    {children}
                </PortalSideBar>
            </PortalProvider>
        </ClerkProvider>
    );
}
