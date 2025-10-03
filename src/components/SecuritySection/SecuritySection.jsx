import { Shield, Lock, Eye, CheckCircle, FileText, Users } from "lucide-react";

const securityFeatures = [
    {
      icon: Shield,
      title: "Data Encryption",
      desc: "Your coursework and personal data are encrypted with industry-standard security",
    },
    {
      icon: Lock,
      title: "Privacy First",
      desc: "We never share your academic information without your explicit consent",
    },
    {
      icon: Eye,
      title: "Transparent AI",
      desc: "Understand exactly how our AI analyzes and maps your skills",
    },
    {
      icon: CheckCircle,
      title: "Verified Skills",
      desc: "All skill mappings are validated against industry standards",
    },
    {
      icon: FileText,
      title: "Secure Storage",
      desc: "Your documents are securely stored and processed in encrypted environments",
    },
    {
      icon: Users,
      title: "Student Owned",
      desc: "You control your data and can delete or export it at any time",
    },
];

export function SecuritySection() {
    return (
        <section className="py-16 sm:py-24 bg-gray-900 dark:bg-[#0A0A0A]">
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                {/* Section header */}
                <div className="text-center mb-16 sm:mb-20">
                    <span className="inline-block px-3 py-1 bg-[#2563EB] text-white text-sm font-medium rounded-full mb-6 sm:mb-8">
                        Privacy & Trust
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 dark:text-gray-200 mb-3 sm:mb-4">
                        Your data, your control
                    </h2>
                    <p className="text-lg text-gray-400 dark:text-gray-500">
                        Built with student privacy and academic integrity at the core
                    </p>
                </div>

                {/* Feature cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {securityFeatures.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className="bg-gray-800 dark:bg-[#1E1E1E] dark:ring-1 dark:ring-gray-700 rounded-xl p-6 sm:p-8"
                            >
                                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-700 dark:bg-gray-600 rounded-lg mb-4 sm:mb-6 flex items-center justify-center">
                                    <IconComponent className="text-[#2563EB]" size={20} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-100 dark:text-gray-200 mb-3 sm:mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}