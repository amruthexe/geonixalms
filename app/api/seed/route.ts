import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        return NextResponse.json({ error: "Admin credentials not found in .env" }, { status: 500 });
    }

    try {
        // Check if admin already exists
        // We can't easily check via auth api without signing in, but we can try to sign up
        // or check via mongoose if we want to be direct.
        // Let's try to sign up using the internal API.

        // Note: Better Auth server-side API usage
        const res = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: "Admin User",
                role: "admin" // We added this field in auth.ts
            },
            headers: await headers()
        });

        if (res) {
            return NextResponse.json({ message: "Admin seeded successfully" });
        }

        return NextResponse.json({ message: "Admin might already exist or error occurred" });

    } catch (error: any) {
        // If error is "User already exists", that's fine.
        return NextResponse.json({ message: "Process completed", details: error.message });
    }
}
