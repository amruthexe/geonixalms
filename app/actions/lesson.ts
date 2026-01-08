'use server';

import dbConnect from "@/lib/db";
import { Lesson } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLesson(courseId: string, formData: FormData) {
    await dbConnect();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const notes = formData.get("notes") as string;
    const resourceUrl = formData.get("resourceUrl") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    if (!title || !videoUrl) {
        throw new Error("Title and Video URL are required");
    }

    await Lesson.create({
        courseId,
        title,
        description,
        videoUrl,
        notes,
        resourceUrl,
        order,
    });

    revalidatePath(`/admin/courses/${courseId}`);
    redirect(`/admin/courses/${courseId}`);
}

export async function updateLesson(courseId: string, lessonId: string, formData: FormData) {
    await dbConnect();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const notes = formData.get("notes") as string;
    const resourceUrl = formData.get("resourceUrl") as string;
    const order = parseInt(formData.get("order") as string) || 0;

    await Lesson.findByIdAndUpdate(lessonId, {
        title,
        description,
        videoUrl,
        notes,
        resourceUrl,
        order,
    });

    revalidatePath(`/admin/courses/${courseId}`);
    redirect(`/admin/courses/${courseId}`);
}

export async function deleteLesson(courseId: string, lessonId: string) {
    await dbConnect();
    await Lesson.findByIdAndDelete(lessonId);
    revalidatePath(`/admin/courses/${courseId}`);
}
