export function CtaSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to unlock your skills?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Join thousands of students who are already transforming their academic work into career opportunities with SkillSync.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="/account/signup"
              className="px-8 py-3 bg-white text-[#2563EB] rounded-lg font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              Start Building Your Portfolio
            </a>
            <button className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg font-medium hover:bg-white hover:text-[#2563EB] transition-colors">
              Schedule a Demo
            </button>
          </div>
          <div className="flex items-center justify-center space-x-6 pt-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">Instant results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}