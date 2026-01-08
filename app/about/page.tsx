import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
          About <span className="text-orange-600">Geonixa</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          We are on a mission to democratize education and make high-quality learning accessible to everyone, everywhere.
        </p>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
               {/* Placeholder for an office or team image */}
               <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-50 flex items-center justify-center">
                  <span className="text-orange-300 font-bold text-4xl opacity-20">Our Office</span>
               </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  Founded in 2024, Geonixa started with a simple idea: education should be engaging, accessible, and effective. We saw a gap in the market for a platform that combines powerful tools with a beautiful, intuitive user experience.
                </p>
                <p>
                  Today, we serve thousands of students across the globe, helping them master new skills in technology, design, business, and more. Our platform is built by educators and engineers who are passionate about the future of learning.
                </p>
                <p>
                  We believe that learning is a lifelong journey, and we are here to support you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">10k+</div>
              <div className="text-gray-400">Active Students</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">200+</div>
              <div className="text-gray-400">Courses</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-400">Instructors</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
