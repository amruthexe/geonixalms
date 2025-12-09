import { updateCourse } from "@/app/actions/course";
import { deleteLesson } from "@/app/actions/lesson";
import dbConnect from "@/lib/db";
import { Course, Lesson } from "@/lib/models";
import Link from "next/link";
import { ArrowLeft, Plus, Trash, Edit, Video } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  await dbConnect();
  
  const course = await Course.findById(courseId);
  if (!course) notFound();

  const lessons = await Lesson.find({ courseId }).sort({ order: 1 });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/courses" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Details Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Course Details</h2>
            <form action={updateCourse.bind(null, courseId)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-bold text-black">Title</label>
                <input 
                  type="text" 
                  name="title" 
                  defaultValue={course.title}
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-bold text-black">Description</label>
                <textarea 
                  name="description" 
                  defaultValue={course.description}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-bold text-black">Category</label>
                <input 
                  type="text" 
                  name="category" 
                  defaultValue={course.category}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="thumbnailUrl" className="block text-sm font-bold text-black">Thumbnail URL</label>
                <input 
                  type="url" 
                  name="thumbnailUrl" 
                  defaultValue={course.thumbnailUrl}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-black"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* Lessons List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Lessons</h2>
            <Link 
              href={`/admin/courses/${courseId}/lessons/create`}
              className="bg-gray-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors text-sm"
            >
              <Plus size={16} />
              Add Lesson
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {lessons.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No lessons added yet.
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {lessons.map((lesson: any) => (
                  <li key={lesson._id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-2 rounded-lg text-primary">
                        <Video size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{lesson.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/admin/courses/${courseId}/lessons/${lesson._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit size={18} />
                      </Link>
                      <form action={deleteLesson.bind(null, courseId, lesson._id.toString())}>
                        <button type="submit" className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash size={18} />
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
