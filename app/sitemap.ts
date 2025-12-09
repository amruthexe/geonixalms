import { MetadataRoute } from "next";
import dbConnect from "@/lib/db";
import { Course } from "@/lib/models";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://lms.geonixa.com";

    // Static routes
    const routes = [
        "",
        "/login",
        "/signup",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
    }));

    // Dynamic routes (Courses)
    await dbConnect();
    const courses = await Course.find({}).select("_id updatedAt");

    const courseRoutes = courses.map((course) => ({
        url: `${baseUrl}/course/${course._id}`,
        lastModified: course.updatedAt || new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...routes, ...courseRoutes];
}
