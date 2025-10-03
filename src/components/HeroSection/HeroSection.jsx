import { SkillSyncMockup } from "./SkillSyncMockup";

export function HeroSection() {
  return (
    <section className="pt-16 pb-12 sm:pb-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#1E1E1E] dark:to-[#121212] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[85vh]">
          {/* Left column: Hero text and CTA */}
          <div className="space-y-6 sm:space-y-8 pt-4 sm:pt-8 text-center lg:text-left">
            {/* Main headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Turn Your Studies Into <span className="text-[#2563EB]">Career Skills</span>
            </h1>

            {/* Subtext paragraph */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
              Upload your coursework and unit notes. Our AI maps them to industry-recognized skills and shows how they align with your dream career path.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 sm:pt-6">
              <a
                href="/account/signup"
                className="px-8 py-3 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#1D4ED8] active:bg-[#1E40AF] transition-colors text-center"
              >
                Get Started Free
              </a>
              <button className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                See How It Works
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Skills Mapped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Careers</div>
              </div>
            </div>
          </div>

          {/* Right column: SkillSync interface mockup */}
          <SkillSyncMockup />
        </div>
      </div>
    </section>
  );
}