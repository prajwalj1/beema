import React from "react";

export const metadata = {
  title: "Privacy Policy | Beema Dukaan",
  description: "Read the Beema Dukaan Privacy Policy to understand how we protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF0] pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-neutral-100">
          <h1 className="text-3xl md:text-5xl font-black text-neutral-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-500 mb-10">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="space-y-8 text-neutral-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Introduction</h2>
              <p>
                At Beema Dukaan, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services to compare and purchase insurance products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Information We Collect</h2>
              <p className="mb-2">We may collect personal information that you provide directly to us when you:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Register for an account.</li>
                <li>Request an insurance quote.</li>
                <li>Fill out an application for an insurance policy.</li>
                <li>Contact our customer support team.</li>
              </ul>
              <p className="mt-2">This information may include your name, email address, phone number, date of birth, medical history (for health/life insurance), and financial information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. How We Use Your Information</h2>
              <p>
                The information we collect is used to provide you with accurate insurance quotes, process your applications with our partner insurance companies, improve our website and services, and communicate with you regarding your policies or inquiries. We do not sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Data Security</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at: support@beemadukaan.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
