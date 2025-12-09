import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, Users, Video } from "lucide-react";

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-primary font-medium text-sm mb-8 border border-orange-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          New courses available now
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-8 leading-tight">
          Master new skills with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Geonixa Academy</span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
          Unlock your potential with our expert-led courses. Learn at your own pace, anywhere, anytime. Join thousands of students today.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/signup" 
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all hover:shadow-xl flex items-center justify-center gap-2 group"
          >
            Get Started
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/courses" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-bold text-lg hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center"
          >
            View Courses
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-12">
          <div>
            <div className="text-3xl font-bold text-gray-900">10k+</div>
            <div className="text-gray-500 mt-1">Active Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">200+</div>
            <div className="text-gray-500 mt-1">Expert Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">50+</div>
            <div className="text-gray-500 mt-1">Instructors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">4.9</div>
            <div className="text-gray-500 mt-1">User Rating</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Geonixa?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We provide the best learning experience with top-notch features designed for your success.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Video size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">HD Video Lessons</h3>
              <p className="text-gray-500 leading-relaxed">High-quality video content that you can watch on any device, ensuring a seamless learning experience.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Notes</h3>
              <p className="text-gray-500 leading-relaxed">Detailed study materials and notes for every lesson to help you revise and retain concepts better.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Support</h3>
              <p className="text-gray-500 leading-relaxed">Join a vibrant community of learners and instructors to get help, share knowledge, and grow together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">G</div>
            <span className="text-xl font-bold text-gray-900">Geonixa LMS</span>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Geonixa. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
