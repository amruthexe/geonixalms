'use server';

import dbConnect from "@/lib/db";
import { Enrollment, Course } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
