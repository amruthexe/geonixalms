import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Video, BookOpen, Users, Award, Zap, Shield, Globe, Smartphone, BarChart } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Video size={24} />,
      title: "HD Video Lessons",
      description: "Crystal clear video content optimized for all devices. Learn with the best visual experience.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Comprehensive Notes",
      description: "Detailed study materials and downloadable resources for every single lesson.",
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: <Users size={24} />,
      title: "Community Support",
      description: "Join a global community of learners. Share ideas, ask questions, and grow together.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <Award size={24} />,
      title: "Certificates",
      description: "Earn industry-recognized certificates upon completion of your courses.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: <Zap size={24} />,
      title: "Fast Learning",
      description: "Bite-sized lessons designed for maximum retention in minimum time.",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: <Shield size={24} />,
      title: "Secure Platform",
      description: "Your data and progress are safe with our enterprise-grade security.",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: <Globe size={24} />,
      title: "Learn Anywhere",
      description: "Access your courses from anywhere in the world, on any device.",
      color: "bg-cyan-100 text-cyan-600"
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Friendly",
      description: "Fully responsive design ensures a great experience on phones and tablets.",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: <BarChart size={24} />,
      title: "Progress Tracking",
      description: "Visualize your learning journey with detailed analytics and progress bars.",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
          Powerful Features for <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Modern Learning</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Everything you need to master new skills, all in one place. Designed for students, built for success.
        </p>
      </section>

      {/* Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className={`h-14 w-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
