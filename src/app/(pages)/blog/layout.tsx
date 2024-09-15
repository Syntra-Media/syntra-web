// src/app/(pages)/admin/layout.tsx
import BlogHeader from "@/components/ui/BlogHeader";
import { ReactNode } from "react";
import type {Metadata} from "next";
import { PostProvider } from "@/components/providers/PostProvider";

interface AdminLayoutProps {
    children: ReactNode;
}

export const metadata: Metadata = {
    title: "Blog",
    description: "Syntra Media blog offers you a wide range of articles about web development, design, and more.",
};

const BlogLayout = ({ children }: AdminLayoutProps) => {
    return (
      <div className={"flex flex-col w-full bg-bg"}>
          <PostProvider>
              <BlogHeader/>
              {children}
          </PostProvider>
      </div>
    );
};

export default BlogLayout;