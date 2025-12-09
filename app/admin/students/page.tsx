import Link from "next/link";
import { Search, User as UserIcon } from "lucide-react";
import dbConnect from "@/lib/db";
import { User, Enrollment } from "@/lib/models";

export default async function StudentsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  await dbConnect();

  const query = q ? { 
    role: 'student', 
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } }
    ]
  } : { role: 'student' };

  console.log("Querying students with:", query);
  const students = await User.find(query).sort({ createdAt: -1 });
  console.log("Found students:", students.length);

  // Fetch enrollment counts for each student (optional optimization: aggregate)
  // For simplicity, we'll just map and count in a separate query or loop if needed, 
  // but for now let's just show the list. 
  // To show enrollment count, we'd need to aggregate.
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
      </div>

      {/* Search Bar */}
      <form className="flex gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            name="q" 
            defaultValue={q}
            placeholder="Search by name or email..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          Search
        </button>
      </form>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student: any) => (
              <tr key={student._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mr-3">
                      <UserIcon size={20} />
                    </div>
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(student.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/students/${student._id}`} className="text-primary hover:text-orange-700">
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">No students found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
