// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Removed unused import
import { BookOpen, Users, Video } from "lucide-react";
import dbConnect from "@/lib/db";
import { Course, User } from "@/lib/models";
import AdminCharts from "@/components/AdminCharts";

// Simple Card Component since we don't have shadcn/ui yet
function DashboardCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-3xl font-bold mt-2 text-gray-900">{value}</h3>
      </div>
      <div className={`p-4 rounded-full ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  await dbConnect();
  
  const studentCount = await User.countDocuments({ role: { $in: ['student', 'user'] } });
  const courseCount = await Course.countDocuments();

  // 1. Student Growth (Group by Month)
  const rawStudentData = await User.aggregate([
    { $match: { role: { $in: ['student', 'user'] } } },
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Initialize all months with 0
  const enrollmentData = monthNames.map((name, index) => {
    const found = rawStudentData.find(d => d._id === index + 1);
    return {
      name,
      students: found ? found.count : 0
    };
  });

  // 2. Course Distribution (Group by Category)
  const rawCourseData = await Course.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 }
      }
    }
  ]);

  const colors = ['#f97316', '#3b82f6', '#a855f7', '#ec4899', '#22c55e', '#eab308'];
  
  const courseData = rawCourseData.map((d, index) => ({
    name: d._id || "Uncategorized",
    value: d.count,
    color: colors[index % colors.length]
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard 
          title="Total Students" 
          value={studentCount} 
          icon={Users} 
          color="bg-blue-500" 
        />
        <DashboardCard 
          title="Active Courses" 
          value={courseCount} 
          icon={BookOpen} 
          color="bg-orange-500" 
        />
        <DashboardCard 
          title="Total Lessons" 
          value="-" // We can query this too if needed
          icon={Video} 
          color="bg-purple-500" 
        />
      </div>

      <AdminCharts enrollmentData={enrollmentData} courseData={courseData} />

      {/* Recent Activity or Quick Actions could go here */}
    </div>
  );
}
