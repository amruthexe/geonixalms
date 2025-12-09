import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dbConnect from "@/lib/db";
import { Course, Lesson, Enrollment } from "@/lib/models";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Clock, BookOpen, PlayCircle, CheckCircle, Lock } from "lucide-react";
import BuyButton from "@/components/BuyButton";

export default async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  await dbConnect();

  const course = await Course.findById(courseId);
  if (!course) notFound();

  const lessons = await Lesson.find({ courseId }).sort({ order: 1 });

  // Check enrollment
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let isEnrolled = false;
  if (session) {
    const enrollment = await Enrollment.findOne({
      userId: session.user.id,
      courseId,
    });
    isEnrolled = !!enrollment;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      {/* Hero */}
      <div className="bg-gray-900 text-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-orange-400 font-medium text-sm mb-6 border border-white/10">
                {course.category || "Course"}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-300 mb-8">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-orange-500" />
                  {course.duration || "Self-paced"}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-orange-500" />
                  {lessons.length} Lessons
                </div>
                <div className="flex items-center gap-2">
                  <PlayCircle size={18} className="text-orange-500" />
                  HD Video
                </div>
              </div>

              <div className="hidden md:block">
                 {/* Desktop Buy Button placement if needed, but usually sidebar is better */}
              </div>
            </div>

            {/* Sidebar / Card */}
            <div className="bg-white text-gray-900 rounded-3xl p-2 shadow-2xl">
                <div className="rounded-2xl overflow-hidden aspect-video relative mb-2">
                    {course.thumbnailUrl ? (
                        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <PlayCircle size={48} className="text-gray-300" />
                        </div>
                    )}
                </div>
                <div className="p-6">
                    <div className="text-3xl font-bold text-gray-900 mb-6">
                        {course.price ? `₹${course.price}` : 'Free'}
                    </div>
                    
                    <BuyButton 
                        courseId={course._id.toString()} 
                        price={course.price || 0} 
                        isEnrolled={isEnrolled} 
                    />

                    <p className="text-center text-xs text-gray-500 mt-4">
                        30-day money-back guarantee • Full lifetime access
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <section className="py-16 bg-gray-50 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Course Curriculum</h2>
          
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
            {lessons.map((lesson: any, index: number) => (
              <div key={lesson._id} className="p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                  {lesson.duration && <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>}
                </div>
                {isEnrolled ? (
                   <PlayCircle size={20} className="text-primary" />
                ) : (
                   <Lock size={18} className="text-gray-400" />
                )}
              </div>
            ))}
            {lessons.length === 0 && (
                <div className="p-8 text-center text-gray-500">No lessons available yet.</div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
