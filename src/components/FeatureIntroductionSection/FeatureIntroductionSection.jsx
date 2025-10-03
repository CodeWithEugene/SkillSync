import { FeatureMockup } from "./FeatureMockup";

const features = [
  {
    title: "AI-Powered Skill Extraction",
    desc: "Our AI analyzes your coursework to identify transferable skills",
  },
  {
    title: "Career Path Mapping",
    desc: "See how your studies align with different career opportunities",
  },
  {
    title: "Industry Skill Badges",
    desc: "Earn verified digital badges for your skills and competencies",
  },
  {
    title: "Portfolio Generation",
    desc: "Create a professional skill portfolio to share with employers",
  },
  {
    title: "Real-time Analysis",
    desc: "Get instant feedback on your skill development progress",
  },
  {
    title: "Multi-format Support",
    desc: "Upload PDFs, documents, or plain text of your coursework",
  },
];

export function FeatureIntroductionSection() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-[#1E1E1E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start">
          {/* Left column: Feature content */}
          <div className="space-y-8 sm:space-y-10">
            {/* Small badge/tag */}
            <span className="inline-block px-3 py-1 bg-[#2563EB] bg-opacity-10 text-[#2563EB] text-sm font-medium rounded-full">
              Features
            </span>

            {/* Section headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
              Transform your studies into career advantage
            </h2>

            {/* Description text */}
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              SkillSync bridges the gap between academic learning and industry requirements. Our platform uses advanced AI to map your coursework to real-world skills that employers value.
            </p>

            {/* Feature list with icons */}
            <div className="space-y-4 sm:space-y-6 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 sm:space-x-4"
                >
                  <div className="w-2 h-2 bg-[#2563EB] rounded-full flex-shrink-0 mt-3"></div>
                  <div className="space-y-1 sm:space-y-2 flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: Feature interface mockup */}
          <FeatureMockup />
        </div>
      </div>
    </section>
  );
}