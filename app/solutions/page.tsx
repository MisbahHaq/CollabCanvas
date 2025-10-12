"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function Solutions() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-4 left-0 right-8 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg z-50 transition-all max-w-3xl w-full md:mx-4 mr-4 md:mr-0">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 md:h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Link href="/" className="flex items-center space-x-2">
                  <Image src="/logo.svg" alt="CollabCanvas Logo" width={32} height={32} />
                  <span className="text-xl font-bold text-gray-900">CollabCanvas</span>
                </Link>
              </div>

              <div className="hidden md:flex space-x-6">
                <Link href="/products" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Products</Link>
                <Link href="/solutions" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Solutions</Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <SignInButton>
                <button className="text-gray-700 hover:text-gray-900 px-4 py-2 font-medium transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm hover:shadow-md">
                  Sign up free
                </button>
              </SignUpButton>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
           <div className="md:hidden border-t border-gray-200 bg-white rounded-b-lg">
             <div className="px-4 py-4 space-y-3">
              <Link href="/products" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Products</Link>
              <Link href="/solutions" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Solutions</Link>
              <div className="pt-4 space-y-2">
                <SignInButton>
                  <button className="w-full text-gray-700 hover:text-gray-900 px-4 py-2 font-medium">Sign In</button>
                </SignInButton>
                <SignUpButton>
                  <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium">
                    Sign up free
                  </button>
                </SignUpButton>
              </div>
             </div>
           </div>
        )}
      </header>

      <main className="">
        <div className="min-h-screen dotted-bg">
          <div className="max-w-4xl mx-auto px-6 py-32 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Solutions</h1>
            <p className="text-lg text-gray-600 mb-12">Discover tailored solutions for your team&#39;s unique collaboration needs.</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Remote Teams</h3>
                <p className="text-gray-600 mb-6">Keep your distributed team connected with real-time collaboration tools that work seamlessly across time zones.</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Live cursors and presence indicators</li>
                  <li>• Instant messaging and comments</li>
                  <li>• Cross-platform synchronization</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Creative Agencies</h3>
                <p className="text-gray-600 mb-6">Enhance creativity with collaborative drawing tools perfect for design teams and creative workflows.</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Advanced drawing tools</li>
                  <li>• Layer management</li>
                  <li>• Asset sharing and versioning</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Education</h3>
                <p className="text-gray-600 mb-6">Transform learning experiences with interactive collaboration tools for classrooms and online education.</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Interactive whiteboards</li>
                  <li>• Student participation tracking</li>
                  <li>• Real-time feedback systems</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg text-left">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">For Startups</h3>
                <p className="text-gray-600 mb-6">Scale your startup with affordable collaboration tools that grow with your team.</p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Flexible pricing plans</li>
                  <li>• Quick setup and onboarding</li>
                  <li>• API integrations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}