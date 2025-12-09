import dbConnect from "@/lib/db";
import { Enrollment } from "@/lib/models";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { PlayCircle, CheckCircle, Award, BookOpen } from "lucide-react";

export default async function StudentDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  await dbConnect();
  
  // Fetch enrollments with course details
  const enrollments = await Enrollment.find({ userId: session.user.id })
    .populate('courseId')
    .sort({ createdAt: -1 });

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">{session.user.name}</span> <span className="animate-wave inline-block origin-bottom-right">👋</span>
            </h1>
            <p className="text-gray-500 mt-3 text-lg">Ready to continue your learning journey today?</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-200"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <PlayCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Enrolled Courses</p>
            <h3 className="text-2xl font-bold text-gray-900">{enrollments.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Completed</p>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Certificates</p>
            <h3 className="text-2xl font-bold text-gray-900">0</h3>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen size={24} className="text-primary" />
          My Courses
        </h2>

        {enrollments.length === 0 ? (
          <div className="bg-white p-16 rounded-3xl border border-gray-200 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-slate-50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
             <div className="relative z-10 flex flex-col items-center">
                <div className="h-20 w-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                  <BookOpen size={40} className="text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No courses yet</h3>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">You haven't enrolled in any courses yet. Explore our catalog to find your next skill.</p>
                <Link href="/" className="mt-8 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-orange-600 transition-all hover:shadow-lg hover:shadow-orange-200">
                  Browse Courses
                </Link>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrollments.map((enrollment: any) => {
              const course = enrollment.courseId;
              return (
                <Link 
                  key={course._id} 
                  href={`/learn/${course._id}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    {course.thumbnailUrl ? (
                      <img 
                        src={course.thumbnailUrl} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                        <PlayCircle size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                      <div className="bg-white/90 p-4 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm">
                        <PlayCircle size={32} className="text-primary fill-current" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                      {course.category || 'Course'}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1 leading-relaxed">
                      {course.description}
                    </p>
                    
                    {/* Progress bar placeholder */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-primary">0%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-0 group-hover:w-1 transition-all duration-1000" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
