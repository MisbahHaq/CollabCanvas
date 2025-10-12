"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function Contact() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-4 left-0 right-8 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg z-50 transition-all max-w-4xl w-full md:mx-4 mr-4 md:mr-0">
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
                <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Contact</Link>
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
              <Link href="/contact" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Contact</Link>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
            <p className="text-lg text-gray-600 mb-12">Get in touch with our team for support or inquiries.</p>

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}