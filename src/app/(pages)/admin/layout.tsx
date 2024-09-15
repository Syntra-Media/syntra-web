// src/app/(pages)/admin/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import {AdminProvider} from "@/components/providers/AdminProvider";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ClerkProvider>
        <AdminProvider>
          <div className="admin-layout">
            {children}
          </div>
        </AdminProvider>
    </ClerkProvider>
  );
};

export default AdminLayout;