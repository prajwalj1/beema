import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="glass-nav text-neutral-600 py-16 border-t border-neutral-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Image
                src="/images/Logo.png"          
                alt="BeemaDukaan Logo"
                width={150}              
                height={35}
                priority
                className="object-contain"
              />
            </div>
            <p className="max-w-sm text-sm text-neutral-500 mx-auto md:mx-0">
              Your trusted, next-generation digital insurance marketplace. Finding, comparing and choosing the right insurance plan in Nepal has never been simpler.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-brand-50 hover:text-brand-600 flex items-center justify-center text-neutral-500 transition-all cursor-pointer"
                title="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-brand-50 hover:text-brand-600 flex items-center justify-center text-neutral-500 transition-all cursor-pointer"
                title="Twitter / X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-brand-50 hover:text-brand-600 flex items-center justify-center text-neutral-500 transition-all cursor-pointer"
                title="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-brand-50 hover:text-brand-600 flex items-center justify-center text-neutral-500 transition-all cursor-pointer"
                title="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-brand-50 hover:text-brand-600 flex items-center justify-center text-neutral-500 transition-all cursor-pointer"
                title="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-neutral-900 font-bold text-sm mb-4 tracking-wider uppercase">Products</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/child-endowment" className="hover:text-brand-600 transition-colors">Child Endowment</Link></li>
              <li><Link href="/whole-life-policies" className="hover:text-brand-600 transition-colors">Whole Life Policies</Link></li>
              <li><Link href="/health-and-medical-cover" className="hover:text-brand-600 transition-colors">Health & Medical Cover</Link></li>
              <li><Link href="/term-life-insurance" className="hover:text-brand-600 transition-colors">Term Life Insurance</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-neutral-900 font-bold text-sm mb-4 tracking-wider uppercase">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-brand-600 transition-colors">About Us</Link></li>
              <li><Link href="/partners" className="hover:text-brand-600 transition-colors">Our Partners</Link></li>
              <li><Link href="/contact" className="hover:text-brand-600 transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-200/50 text-xs flex flex-col md:flex-row justify-between items-center text-center gap-4">
          <p>© {new Date().getFullYear()} Beema Dukaan. All rights reserved.</p>  
        </div>
      </div>
    </footer>
  );
}
