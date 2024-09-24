// src/app/(pages)/admin/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import {AdminProvider} from "@/components/providers/AdminProvider";
import {Toaster} from "react-hot-toast";

interface AdminLayoutProps {
  children: ReactNode;
}

//metadata noindex nofollow
export const metadata = {
    title: "Admin Layout",
    description: "Admin layout for the admin pages",
    robots: {
        index: false,
        follow: false,
    },
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ClerkProvider>
        <AdminProvider>
          <div className="admin-layout">
            <Toaster position={"top-left"}/>
            {children}
          </div>
        </AdminProvider>
    </ClerkProvider>
  );
};

export default AdminLayout;