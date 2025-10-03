import { Award, Target, Calendar, FileText, TrendingUp, Share2 } from "lucide-react";

export function AnalysisResults({ analyses, loading }) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analyses || analyses.length === 0) {
    return null;
  }

  const getSkillColor = (confidence) => {
    if (confidence >= 80) return "text-[#10B981] bg-emerald-50 dark:bg-emerald-900/20";
    if (confidence >= 60) return "text-[#F59E0B] bg-amber-50 dark:bg-amber-900/20";
    return "text-[#EF4444] bg-red-50 dark:bg-red-900/20";
  };

  const getCareerMatchColor = (percentage) => {
    if (percentage >= 80) return "text-[#10B981]";
    if (percentage >= 60) return "text-[#F59E0B]";
    return "text-[#EF4444]";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Your Skill Analyses
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {analyses.length} {analyses.length === 1 ? 'analysis' : 'analyses'} completed
        </p>
      </div>

      <div className="grid gap-6">
        {analyses.map((analysis) => (
          <div
            key={analysis.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <FileText className="text-[#2563EB]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {analysis.document.filename}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Target size={14} />
                        <span>{analysis.targetCareer}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(analysis.analysisDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getCareerMatchColor(analysis.careerMatchPercentage)}`}>
                      {analysis.careerMatchPercentage}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Career Match</div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Identified Skills ({analysis.totalSkills})
                </h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Award size={14} />
                  <span>{analysis.badgesEarned} badges earned</span>
                </div>
              </div>

              {analysis.extractedSkills?.skills && analysis.extractedSkills.skills.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.extractedSkills.skills.map((skill, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        skill.confidence >= 70 
                          ? 'border-green-200 dark:border-green-800' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                          {skill.name}
                        </h5>
                        {skill.confidence >= 70 && (
                          <Award className="text-[#10B981]" size={16} />
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {skill.category}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 dark:text-gray-400">Confidence</span>
                          <span className={`text-xs font-medium ${getSkillColor(skill.confidence)}`}>
                            {skill.confidence}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              skill.confidence >= 80 
                                ? 'bg-[#10B981]' 
                                : skill.confidence >= 60 
                                ? 'bg-[#F59E0B]' 
                                : 'bg-[#EF4444]'
                            }`}
                            style={{ width: `${skill.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No skills data available for this analysis.
                </p>
              )}

              {/* Career Match Details */}
              {analysis.extractedSkills?.careerMatch && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <TrendingUp className="text-[#2563EB]" size={16} />
                    <h5 className="font-medium text-gray-900 dark:text-gray-100">
                      Career Match Analysis
                    </h5>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {analysis.extractedSkills.careerMatch.reasoning}
                  </p>

                  {analysis.extractedSkills.careerMatch.strongestMatches?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">
                        Strongest Matches:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {analysis.extractedSkills.careerMatch.strongestMatches.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.extractedSkills.careerMatch.missingSkills?.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">
                        Skills to Develop:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {analysis.extractedSkills.careerMatch.missingSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}