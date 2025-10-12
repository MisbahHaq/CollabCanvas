"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function Products() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-4 left-0 right-8 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg z-50 transition-all max-w-4xl w-full md:mx-4 mr-4 md:mr-0">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 md:h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <a href="/" className="flex items-center space-x-2">
                  <img src="/logo.svg" alt="CollabCanvas Logo" className="w-8 h-8" />
                  <span className="text-xl font-bold text-gray-900">CollabCanvas</span>
                </a>
              </div>

              <div className="hidden md:flex space-x-6">
                <a href="/products" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Products</a>
                <a href="/solutions" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Solutions</a>
                <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Contact</a>
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
              <a href="/products" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Products</a>
              <a href="/solutions" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Solutions</a>
              <a href="/contact" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Contact</a>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Products</h1>
            <p className="text-lg text-gray-600 mb-12">Explore our range of collaboration tools designed to enhance team productivity.</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Canvas Drawing</h3>
                <p className="text-gray-600">Real-time collaborative drawing and sketching tools.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Collaboration</h3>
                <p className="text-gray-600">Seamless teamwork with live cursors and comments.</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600">Track productivity and collaboration metrics.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}