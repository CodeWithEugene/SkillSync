import { FileText, Brain, Award, Share2 } from "lucide-react";

export function FeatureMockup() {
  return (
    <div className="relative lg:pl-8 flex justify-center lg:justify-end">
      <div className="bg-white dark:bg-[#262626] rounded-xl shadow-2xl dark:shadow-none dark:ring-1 dark:ring-gray-700 overflow-hidden w-full max-w-sm">
        {/* Browser header */}
        <div className="h-8 sm:h-10 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700 flex items-center px-3 sm:px-4">
          <div className="flex space-x-1.5 sm:space-x-2">
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-red-400 rounded-full"></div>
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Feature interface content */}
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Skill Portfolio
            </h3>
            
            {/* Upload status */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 flex items-center space-x-3">
              <FileText className="text-[#10B981]" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  CS350 Syllabus.pdf
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Processed successfully
                </p>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex items-center space-x-3">
              <Brain className="text-[#2563EB]" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  AI Analysis Complete
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  15 skills identified
                </p>
              </div>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                <Award className="mx-auto mb-1 text-[#8B5CF6]" size={16} />
                <p className="text-xs font-medium text-purple-800 dark:text-purple-200">
                  Algorithms
                </p>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 text-center">
                <Award className="mx-auto mb-1 text-[#10B981]" size={16} />
                <p className="text-xs font-medium text-emerald-800 dark:text-emerald-200">
                  Problem Solving
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
                <Award className="mx-auto mb-1 text-[#F59E0B]" size={16} />
                <p className="text-xs font-medium text-amber-800 dark:text-amber-200">
                  Data Structures
                </p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
                <Award className="mx-auto mb-1 text-[#EF4444]" size={16} />
                <p className="text-xs font-medium text-red-800 dark:text-red-200">
                  Software Design
                </p>
              </div>
            </div>

            {/* Share portfolio */}
            <button className="w-full py-2 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] transition-colors flex items-center justify-center space-x-2">
              <Share2 size={16} />
              <span>Share Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}