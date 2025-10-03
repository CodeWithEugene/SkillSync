import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-[#0A0A0A] border-t border-gray-800 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="text-xl font-bold text-[#2563EB]">
              SkillSync
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your academic achievements into career opportunities with AI-powered skill mapping.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </button>
            </div>
          </div>

          {/* Product column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Product</h3>
            <div className="space-y-2">
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                Features
              </button>
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                How it works
              </button>
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                Pricing
              </button>
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                API
              </button>
            </div>
          </div>

          {/* Resources column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Resources</h3>
            <div className="space-y-2">
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                Documentation
              </button>
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                Help Center
              </button>
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                Blog
              </button>
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                Community
              </button>
            </div>
          </div>

          {/* Company column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Company</h3>
            <div className="space-y-2">
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                About
              </button>
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                Careers
              </button>
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                Privacy
              </button>
              <button className="block text-gray-400 hover:text-white transition-colors text-sm">
                Terms
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 SkillSync. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <button className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </button>
            <button className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}