'use server';

import dbConnect from "@/lib/db";
import { Enrollment, Course, User } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function enrollStudent(studentId: string, formData: FormData) {
    await dbConnect();

    const courseId = formData.get("courseId") as string;

    if (!courseId) {
        throw new Error("Course is required");
    }

    try {
        await Enrollment.create({
            userId: studentId,
            courseId,
        });
    } catch (error: any) {
        if (error.code === 11000) {
            // Duplicate enrollment, ignore or handle
            console.log("Already enrolled");
        } else {
            throw error;
        }
    }

    revalidatePath(`/admin/students/${studentId}`);
}

export async function unenrollStudent(studentId: string, enrollmentId: string) {
    await dbConnect();
    await Enrollment.findByIdAndDelete(enrollmentId);
    revalidatePath(`/admin/students/${studentId}`);
}

export async function updateStudentPhone(studentId: string, formData: FormData) {
    await dbConnect();
    const phone = formData.get("phone") as string;

    // Simple validation
    if (phone && phone.length < 10) {
        throw new Error("Phone number must be at least 10 digits");
    }

    await User.findByIdAndUpdate(studentId, { phone: phone || undefined });
    revalidatePath(`/admin/students/${studentId}`);
    revalidatePath(`/admin/students`);
}

export async function resetStudentPassword(studentId: string) {
    await dbConnect();
    // Default password as requested: 9999999999

    const { auth } = await import("@/lib/auth");

    try {
        // Using Admin Plugin API: setUserPassword
        // Requires 'admin' plugin in lib/auth.ts
        // @ts-ignore
        await auth.api.setUserPassword({
            body: {
                userId: studentId,
                newPassword: "9999999999",
            },
            headers: await headers(),
        });
    } catch (e) {
        console.error("Failed to reset password via auth api", e);
        throw new Error("Failed to reset password. Check server logs.");
    }

    revalidatePath(`/admin/students/${studentId}`);
}
