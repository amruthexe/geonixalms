import Link from "next/link";
import { Plus, Edit, Trash } from "lucide-react";
import dbConnect from "@/lib/db";
import { Course } from "@/lib/models";
import { deleteCourse } from "@/app/actions/course";
import DeleteButton from "@/components/DeleteButton";

export default async function CoursesPage() {
  await dbConnect();
  const courses = await Course.find({}).sort({ createdAt: -1 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <Link 
          href="/admin/courses/create" 
          className="bg-primary text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <Plus size={20} />
          Create Course
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course: any) => (
              <tr key={course._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {course.thumbnailUrl && (
                      <img className="h-10 w-10 rounded-md object-cover mr-3" src={course.thumbnailUrl} alt="" />
                    )}
                    <div className="text-sm font-medium text-gray-900">{course.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.category || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/courses/${course._id}`} className="text-blue-600 hover:text-blue-900">
                      <Edit size={18} />
                    </Link>
                    <DeleteButton action={deleteCourse.bind(null, course._id.toString())} />
                  </div>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No courses found. Create one to get started.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
