export function TrustSection() {
  return (
    <section className="py-12 sm:py-16 bg-gray-900 dark:bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center">
        {/* "Trusted by" text */}
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8 sm:mb-12">
          Trusted by students and universities worldwide
        </p>

        {/* University logos row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 opacity-60 items-center justify-items-center">
          <div className="text-gray-400 dark:text-gray-500 font-semibold">
            MIT
          </div>
          <div className="text-gray-400 dark:text-gray-500 font-semibold">
            Stanford
          </div>
          <div className="text-gray-400 dark:text-gray-500 font-semibold">
            Harvard
          </div>
          <div className="text-gray-400 dark:text-gray-500 font-semibold col-span-2 sm:col-span-1">
            Berkeley
          </div>
          <div className="text-gray-400 dark:text-gray-500 font-semibold hidden sm:block lg:block">
            Oxford
          </div>
        </div>
      </div>
    </section>
  );
}