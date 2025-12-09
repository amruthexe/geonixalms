import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { auth } from "@/lib/auth"; // Adjust path if needed
import { headers } from "next/headers";
import dbConnect from "@/lib/db";
import { Course } from "@/lib/models";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { courseId } = await req.json();

        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        await dbConnect();
        const course = await Course.findById(courseId);

        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        // Ensure price is valid
        if (!course.price || course.price < 1) {
            return NextResponse.json({ error: "Course price is invalid (must be at least ₹1)" }, { status: 400 });
        }

        const amount = course.price * 100; // Razorpay expects amount in paise
        const currency = "INR";

        const options = {
            amount: amount.toString(),
            currency,
            receipt: `receipt_${Date.now()}`,
            notes: {
                courseId: courseId,
                userId: session.user.id,
            },
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
