import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-xl font-bold text-gray-900">Geonixa LMS</span>
        </div>
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Geonixa. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">Twitter</Link>
          <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">LinkedIn</Link>
          <Link href="#" className="text-gray-400 hover:text-gray-900 transition-colors">Instagram</Link>
        </div>
      </div>
    </footer>
  );
}
