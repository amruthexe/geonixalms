'use server';

import dbConnect from "@/lib/db";
import { Course } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCourse(formData: FormData) {
    await dbConnect();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const thumbnailUrl = formData.get("thumbnailUrl") as string;
    const category = formData.get("category") as string;

    if (!title) {
        throw new Error("Title is required");
    }

    await Course.create({
        title,
        description,
        thumbnailUrl,
        category,
    });

    revalidatePath("/admin/courses");
    redirect("/admin/courses");
}

export async function updateCourse(courseId: string, formData: FormData) {
    await dbConnect();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const thumbnailUrl = formData.get("thumbnailUrl") as string;
    const category = formData.get("category") as string;

    await Course.findByIdAndUpdate(courseId, {
        title,
        description,
        thumbnailUrl,
        category,
    });

    revalidatePath("/admin/courses");
    revalidatePath(`/admin/courses/${courseId}`);
    redirect("/admin/courses");
}

export async function deleteCourse(courseId: string) {
    await dbConnect();
    await Course.findByIdAndDelete(courseId);
    revalidatePath("/admin/courses");
}
