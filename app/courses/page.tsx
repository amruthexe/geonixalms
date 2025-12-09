import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dbConnect from "@/lib/db";
import { Course } from "@/lib/models";
import { Clock, PlayCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  await dbConnect();
  const courses = await Course.find({}).sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
          Explore Our <span className="text-orange-600">Courses</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Expert-led courses to help you master new skills and advance your career.
        </p>
      </section>

      <section className="py-12 bg-gray-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: any) => (
              <Link 
                key={course._id} 
                href={`/course/${course._id}`}
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
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{course.duration || 'Self-paced'}</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {course.price ? `₹${course.price}` : 'Free'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
