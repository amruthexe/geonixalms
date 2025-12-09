import { createLesson } from "@/app/actions/lesson";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CreateLessonPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/courses/${courseId}`} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Lesson</h1>
      </div>

      <form action={createLesson.bind(null, courseId)} className="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Lesson Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="e.g. React Components"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            name="description" 
            id="description" 
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="Brief overview of this lesson..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">Video URL</label>
          <input 
            type="url" 
            name="videoUrl" 
            id="videoUrl" 
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="Google Drive link or other video URL"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Markdown/Text)</label>
          <textarea 
            name="notes" 
            id="notes" 
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="Additional notes for students..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="resourceUrl" className="block text-sm font-medium text-gray-700">Resource URL</label>
          <input 
            type="url" 
            name="resourceUrl" 
            id="resourceUrl" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="Notion link or external resource"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="order" className="block text-sm font-medium text-gray-700">Order</label>
          <input 
            type="number" 
            name="order" 
            id="order" 
            defaultValue={0}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Add Lesson
          </button>
        </div>
      </form>
    </div>
  );
}
