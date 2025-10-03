import { DashboardHeader } from "../../components/Dashboard/DashboardHeader";
import { UploadSection } from "../../components/Dashboard/UploadSection";
import { AnalysisResults } from "../../components/Dashboard/AnalysisResults";
import useUser from "@/utils/useUser";
import { useQuery } from "@tanstack/react-query";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();

  const { data: analyses, loading: analysesLoading, refetch: refetchAnalyses } = useQuery({
    queryKey: ['user-analyses'],
    queryFn: async () => {
      const response = await fetch('/api/user/analyses');
      if (!response.ok) {
        throw new Error('Failed to fetch analyses');
      }
      const data = await response.json();
      return data.analyses;
    },
    enabled: !!user,
  });

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to signin if not authenticated
    if (typeof window !== 'undefined') {
      window.location.href = '/account/signin?callbackUrl=/dashboard';
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212]">
      <DashboardHeader user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Welcome back, {user.name || 'Student'}! 👋
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Upload your coursework to discover the skills you've gained and how they align with your career goals.
                </p>
              </div>
              {analyses && analyses.length > 0 && (
                <div className="mt-4 sm:mt-0 sm:ml-6 flex space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#2563EB]">
                      {analyses.reduce((sum, a) => sum + a.totalSkills, 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Skills Identified</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#10B981]">
                      {analyses.reduce((sum, a) => sum + a.badgesEarned, 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Upload section */}
          <UploadSection onUploadComplete={refetchAnalyses} />

          {/* Analysis results */}
          {analyses && analyses.length > 0 ? (
            <AnalysisResults analyses={analyses} loading={analysesLoading} />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No analyses yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Upload your first syllabus or coursework document to start mapping your skills to career opportunities.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainComponent;