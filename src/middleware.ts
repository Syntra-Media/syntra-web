// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
    if (!auth().userId) {
        return auth().redirectToSignIn();
    }
});

// Yönlendirilecek sayfaları matcher ile belirtiyorsun
export const config = {
    matcher: ["/admin/:path*", "/portal/:path*"], // Sadece /admin rotasını koruma altına al
};