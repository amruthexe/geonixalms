import { enrollStudent, unenrollStudent, updateStudentPhone } from "@/app/actions/student";
import ResetPasswordButton from "@/components/ResetPasswordButton";
import dbConnect from "@/lib/db";
import { User, Course, Enrollment } from "@/lib/models";
import Link from "next/link";
import { ArrowLeft, Trash, Plus } from "lucide-react";
import { notFound } from "next/navigation";

export default async function StudentDetailsPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;
  await dbConnect();

  const student = await User.findById(studentId);
  if (!student) notFound();

  // Fetch all courses for the dropdown
  const allCourses = await Course.find({}).sort({ title: 1 });

  // Fetch enrollments for this student
  const enrollments = await Enrollment.find({ userId: studentId }).populate('courseId');

  // Filter out courses already enrolled
  const enrolledCourseIds = new Set(enrollments.map((e: any) => e.courseId._id.toString()));
  const availableCourses = allCourses.filter((c: any) => !enrolledCourseIds.has(c._id.toString()));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/students" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Student Details</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-orange-100 flex items-center justify-center text-primary text-2xl font-bold">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
            <p className="text-gray-500">{student.email}</p>
          </div>
        </div>
      </div>

      {/* Edit Student Details */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Edit Details</h3>
          
          {/* Phone Update Form */}
          <form action={updateStudentPhone.bind(null, studentId)} className="flex gap-4 items-end">
            <div className="flex-1 space-y-1">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input 
                type="text" 
                name="phone"
                id="phone"
                defaultValue={student.phone || ""}
                placeholder="9999999999"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900 placeholder:text-gray-500"
              />
            </div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Update Phone
            </button>
          </form>

          {/* Password Reset Section */}
          <div className="pt-4 border-t border-gray-100">
             <h4 className="text-sm font-bold text-gray-900 mb-2">Security</h4>
             <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Reset password to default (9999999999)</p>
                <ResetPasswordButton studentId={studentId} />
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enrolled Courses List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Enrolled Courses</h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {enrollments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                Not enrolled in any courses.
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {enrollments.map((enrollment: any) => (
                  <li key={enrollment._id} className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{enrollment.courseId.title}</h4>
                      <p className="text-xs text-gray-500">Enrolled on {new Date(enrollment.createdAt).toLocaleDateString()}</p>
                    </div>
                    <form action={unenrollStudent.bind(null, studentId, enrollment._id.toString())}>
                      <button type="submit" className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg">
                        <Trash size={18} />
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Allocate Course Form */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Allocate Course</h3>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <form action={enrollStudent.bind(null, studentId)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">Select Course</label>
                <select 
                  name="courseId" 
                  id="courseId" 
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-900"
                >
                  <option value="">-- Select a course --</option>
                  {availableCourses.map((course: any) => (
                    <option key={course._id} value={course._id.toString()}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <button 
                type="submit" 
                disabled={availableCourses.length === 0}
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Enroll Student
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
