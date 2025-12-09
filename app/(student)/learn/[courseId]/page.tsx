import dbConnect from "@/lib/db";
import { Course, Lesson, Enrollment } from "@/lib/models";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { PlayCircle, FileText, ExternalLink, CheckCircle, Lock } from "lucide-react";

export default async function CoursePlayerPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ courseId: string }>;
  searchParams: Promise<{ lessonId?: string }>;
}) {
  const { courseId } = await params;
  const { lessonId } = await searchParams;
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");

  await dbConnect();

  // 1. Verify Enrollment
  const enrollment = await Enrollment.findOne({ 
    userId: session.user.id, 
    courseId: courseId 
  });

  // Allow access if user is admin or enrolled
  if (session.user.role !== 'admin' && !enrollment) {
    redirect(`/course/${courseId}`);
  }

  // 2. Fetch Course and Lessons
  const course = await Course.findById(courseId);
  if (!course) notFound();

  const lessons = await Lesson.find({ courseId }).sort({ order: 1 });

  // 3. Determine Current Lesson
  let currentLesson = null;
  if (lessons.length > 0) {
    if (lessonId) {
      currentLesson = lessons.find((l: any) => l._id.toString() === lessonId);
    }
    if (!currentLesson) {
      currentLesson = lessons[0];
    }
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] lg:overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:overflow-y-auto bg-white">
        {currentLesson ? (
          <>
            {/* Video Player Container */}
            <div className="w-full sticky top-0 z-10 lg:static lg:px-8 lg:pt-8">
              <div className="aspect-video w-full bg-black flex items-center justify-center relative lg:rounded-2xl lg:shadow-2xl overflow-hidden border-b border-gray-800 lg:border-none">
                {(() => {
                  const getEmbedUrl = (url: string) => {
                    if (url.includes('drive.google.com')) {
                      // Convert view/sharing links to preview
                      // e.g. https://drive.google.com/file/d/VIDEO_ID/view?usp=sharing -> https://drive.google.com/file/d/VIDEO_ID/preview
                      return url.replace(/\/view.*$/, '/preview').replace(/\/edit.*$/, '/preview');
                    }
                    return url;
                  };

                  const embedUrl = currentLesson.videoUrl ? getEmbedUrl(currentLesson.videoUrl) : null;

                  return embedUrl ? (
                    <iframe 
                      src={embedUrl} 
                      className="w-full h-full absolute inset-0" 
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <div className="text-white flex flex-col items-center justify-center h-full w-full bg-zinc-900">
                      <div className="h-20 w-20 bg-zinc-800 rounded-full flex items-center justify-center mb-4 animate-pulse">
                          <PlayCircle size={40} className="text-zinc-500" />
                      </div>
                      <p className="text-zinc-400 font-medium">No video available for this lesson</p>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Lesson Details */}
            <div className="p-4 md:p-8 max-w-4xl mx-auto w-full space-y-6 md:space-y-8">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">{currentLesson.title}</h1>
                <p className="text-sm md:text-base text-gray-500 mt-2">{currentLesson.description}</p>
              </div>

              {/* Resources Button */}
              {currentLesson.resourceUrl && (
                <a 
                  href={currentLesson.resourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm md:text-base"
                >
                  <ExternalLink size={18} />
                  View Resources
                </a>
              )}

              {/* Notes */}
              {currentLesson.notes && (
                <div className="bg-orange-50 p-4 md:p-6 rounded-xl border border-orange-100">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                    <FileText size={16} />
                    Lesson Notes
                  </h3>
                  <div className="prose prose-orange max-w-none text-gray-700 whitespace-pre-wrap text-sm md:text-base">
                    {currentLesson.notes}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 p-8">
            No lessons available for this course.
          </div>
        )}
      </div>

      {/* Sidebar - Lesson List */}
      <div className="w-full lg:w-96 bg-gray-50 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col h-auto lg:h-full">
        <div className="p-4 md:p-6 border-b border-gray-200 bg-white">
          <h2 className="font-bold text-gray-900">Course Content</h2>
          <p className="text-xs text-gray-500 mt-1">{lessons.length} Lessons</p>
        </div>
        
        <div className="flex-1 lg:overflow-y-auto p-4 space-y-2 max-h-[500px] lg:max-h-none">
          {lessons.map((lesson: any, index: number) => {
            const isActive = currentLesson && lesson._id.toString() === currentLesson._id.toString();
            return (
              <Link 
                key={lesson._id}
                href={`/course/${courseId}?lessonId=${lesson._id}`}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-orange-100 text-primary border border-orange-200' 
                    : 'hover:bg-white hover:shadow-sm text-gray-700'
                }`}
              >
                <div className="mt-0.5">
                   {isActive ? (
                     <PlayCircle size={18} className="fill-current" />
                   ) : (
                     <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-[10px] font-medium text-gray-500">
                       {index + 1}
                     </div>
                   )}
                </div>
                <div>
                  <h3 className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-900'}`}>
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {lesson.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
