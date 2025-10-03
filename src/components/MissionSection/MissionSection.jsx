export function MissionSection() {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-[#121212]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start">
          {/* Left column: Mission statement */}
          <div className="space-y-6 sm:space-y-8">
            <span className="inline-block px-3 py-1 bg-[#2563EB] bg-opacity-10 text-[#2563EB] text-sm font-medium rounded-full">
              Our Mission
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Bridging the gap between education and employment
            </h2>
          </div>

          {/* Right column: Extended mission text and team member */}
          <div className="space-y-8 sm:space-y-10">
            <div className="space-y-6 sm:space-y-8">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Too many talented students struggle to articulate their skills to employers. They complete rigorous coursework but can't translate their academic achievements into job-relevant competencies.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                SkillSync changes this by using AI to automatically identify and validate the skills embedded in your academic work. We help you build a comprehensive skill portfolio that speaks the language employers understand.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                From computer science algorithms to literature analysis, from statistical methods to design thinking - every course teaches valuable skills. We make them visible and shareable.
              </p>
            </div>

            {/* Team member quote/profile */}
            <div className="flex items-start space-x-3 sm:space-x-4 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-[#2563EB] rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-white font-semibold">AS</span>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Dr. Alex Smith
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  CEO & Founder, Former Academic Advisor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}