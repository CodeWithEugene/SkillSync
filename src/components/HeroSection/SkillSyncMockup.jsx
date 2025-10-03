import { Upload, Target, Award } from "lucide-react";

export function SkillSyncMockup() {
  return (
    <div className="relative lg:pl-8 flex justify-center lg:justify-end">
      <div className="bg-white dark:bg-[#262626] rounded-2xl shadow-2xl dark:shadow-none dark:ring-1 dark:ring-gray-700 p-6 sm:p-8 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Skill Analysis
          </h3>
          <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
        </div>

        {/* Upload section */}
        <div className="space-y-4 sm:space-y-6">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center">
            <Upload className="mx-auto mb-2 text-gray-400" size={24} />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Upload your syllabus or notes
            </p>
          </div>

          {/* Career selection */}
          <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <Target className="text-[#2563EB]" size={20} />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Target Career
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Data Scientist
              </p>
            </div>
          </div>

          {/* Sample skill badges */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Identified Skills
            </h4>
            
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <Award className="text-[#10B981]" size={20} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Python Programming
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div className="bg-[#10B981] h-2 rounded-full w-[87%]"></div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#10B981]">87%</span>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <Award className="text-[#F59E0B]" size={20} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Data Analysis
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div className="bg-[#F59E0B] h-2 rounded-full w-[74%]"></div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#F59E0B]">74%</span>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <Award className="text-[#8B5CF6]" size={20} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Statistics
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div className="bg-[#8B5CF6] h-2 rounded-full w-[92%]"></div>
                </div>
              </div>
              <span className="text-xs font-medium text-[#8B5CF6]">92%</span>
            </div>
          </div>

          {/* Career match */}
          <div className="p-4 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-xl text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Career Match</p>
                <p className="text-lg font-bold">82% Data Scientist</p>
              </div>
              <div className="text-right">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">🎯</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}