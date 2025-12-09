import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import dbConnect from "@/lib/db";
import { Purchase, Enrollment } from "@/lib/models";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courseId,
            amount,
        } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            await dbConnect();

            // Create Purchase Record
            await Purchase.create({
                userId: session.user.id,
                courseId,
                amount: amount / 100, // Store in main currency unit
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                status: "completed",
            });

            // Enroll User
            await Enrollment.create({
                userId: session.user.id,
                courseId,
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { error: "Invalid Signature" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
