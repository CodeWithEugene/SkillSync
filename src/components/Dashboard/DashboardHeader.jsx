import { User, LogOut, Home } from "lucide-react";

export function DashboardHeader({ user }) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-[#2563EB] mr-8">
              SkillSync
            </a>
            <nav className="hidden md:flex space-x-6">
              <a 
                href="/dashboard" 
                className="flex items-center space-x-2 text-gray-900 dark:text-gray-100 font-medium"
              >
                <Home size={16} />
                <span>Dashboard</span>
              </a>
              <a 
                href="/profile" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Portfolio
              </a>
            </nav>
          </div>

          {/* User menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user?.name || 'Student'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
            </div>
            
            <a
              href="/account/logout"
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign Out</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}