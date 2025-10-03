import { Menu, LogIn } from "lucide-react";
import useUser from "@/utils/useUser";

export function Header() {
  const { data: user, loading } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-[#2563EB] dark:text-[#3B82F6]">
          SkillSync
        </div>

        {/* Navigation menu - hidden on mobile, shown on larger screens */}
        <div className="hidden sm:flex items-center space-x-4 lg:space-x-8">
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            Features
          </button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            How it works
          </button>
          <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            About
          </button>
          
          {!loading && (
            user ? (
              <a
                href="/dashboard"
                className="px-4 py-2 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] transition-colors"
              >
                Dashboard
              </a>
            ) : (
              <a
                href="/account/signin"
                className="flex items-center space-x-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] transition-colors"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </a>
            )
          )}
        </div>

        {/* Mobile menu button */}
        <button className="sm:hidden p-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}