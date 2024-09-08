// src/app/(pages)/admin/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ClerkProvider>
      <div className="admin-layout">
        {children}
      </div>
    </ClerkProvider>
  );
};

export default AdminLayout;