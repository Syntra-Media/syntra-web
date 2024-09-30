"use client"

import { SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <SearchX className="w-36 h-36 text-primary"/>
            <p className="text-2xl font-bold">Aradığınız sayfa bulunamadı.</p>
            <Button size={"lg"} className="mt-8">
              <Link href="/">
                  Ana sayfaya dön
              </Link>
            </Button>
        </div>
    )
}

export default NotFound;