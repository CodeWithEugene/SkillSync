import useAuth from "@/utils/useAuth";

function MainComponent() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <div className="text-2xl font-bold text-[#2563EB] mb-4">
          SkillSync
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Sign Out
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Are you sure you want to sign out of your account?
        </p>

        <div className="space-y-4">
          <button
            onClick={handleSignOut}
            className="w-full rounded-lg bg-[#2563EB] px-4 py-3 text-base font-medium text-white transition-colors hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2"
          >
            Sign Out
          </button>
          
          <a
            href="/dashboard"
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;