// src/app/(pages)/admin/layout.tsx
import BlogHeader from "@/components/ui/BlogHeader";
import { ReactNode } from "react";

interface AdminLayoutProps {
    children: ReactNode;
}

const BlogLayout = ({ children }: AdminLayoutProps) => {
    return (
      <div className={"flex flex-col w-full bg-radial"}>
          <BlogHeader/>
          {children}
      </div>
    );
};

export default BlogLayout;