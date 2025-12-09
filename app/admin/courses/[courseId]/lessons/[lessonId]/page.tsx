import { updateLesson } from "@/app/actions/lesson";
import dbConnect from "@/lib/db";
import { Lesson } from "@/lib/models";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditLessonPage({ params }: { params: Promise<{ courseId: string, lessonId: string }> }) {
  const { courseId, lessonId } = await params;
  await dbConnect();

  const lesson = await Lesson.findById(lessonId);
  if (!lesson) notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/courses/${courseId}`} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Lesson</h1>
      </div>

      <form action={updateLesson.bind(null, courseId, lessonId)} className="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Lesson Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            defaultValue={lesson.title}
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            name="description" 
            id="description" 
            defaultValue={lesson.description}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">Video URL</label>
          <input 
            type="url" 
            name="videoUrl" 
            id="videoUrl" 
            defaultValue={lesson.videoUrl}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Markdown/Text)</label>
          <textarea 
            name="notes" 
            id="notes" 
            defaultValue={lesson.notes}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="resourceUrl" className="block text-sm font-medium text-gray-700">Resource URL</label>
          <input 
            type="url" 
            name="resourceUrl" 
            id="resourceUrl" 
            defaultValue={lesson.resourceUrl}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="order" className="block text-sm font-medium text-gray-700">Order</label>
          <input 
            type="number" 
            name="order" 
            id="order" 
            defaultValue={lesson.order}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Update Lesson
          </button>
        </div>
      </form>
    </div>
  );
}
