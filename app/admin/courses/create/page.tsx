import { createCourse } from "@/app/actions/course";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateCoursePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
      </div>

      <form action={createCourse} className="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-bold text-black">Course Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            required 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="e.g. Introduction to Next.js"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-bold text-black">Description</label>
          <textarea 
            name="description" 
            id="description" 
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="Short description of the course..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-bold text-black">Category</label>
          <input 
            type="text" 
            name="category" 
            id="category" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="e.g. Web Development"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-bold text-black">Price (INR)</label>
          <input 
            type="number" 
            name="price" 
            id="price" 
            min="0"
            defaultValue="2999"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="e.g. 2999"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="thumbnailUrl" className="block text-sm font-bold text-black">Thumbnail URL</label>
          <input 
            type="url" 
            name="thumbnailUrl" 
            id="thumbnailUrl" 
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black placeholder:text-gray-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
}
