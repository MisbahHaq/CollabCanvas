"use client";

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Menu, X, MousePointer } from 'lucide-react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import DashboardLayout from './(dashboard)/layout';
import DashboardPage from './(dashboard)/page';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <DashboardLayout><DashboardPage /></DashboardLayout>;
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-4 left-0 right-8 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg z-50 transition-all max-w-3xl w-full md:mx-4 mr-4 md:mr-0">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 md:h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Image src="/logo.svg" alt="CollabCanvas Logo" width={32} height={32} />
                <span className="text-xl font-bold text-gray-900">CollabCanvas</span>
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

      <main>
        <section className="relative bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center overflow-hidden dotted-bg">
           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
               CollabCanvas
             </h1>
             <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 leading-relaxed px-4">
               The ultimate collaboration platform for teams.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <SignUpButton>
                 <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium text-base shadow-lg w-full sm:w-auto">
                   Get Started
                 </button>
               </SignUpButton>
               <button className="text-gray-600 hover:text-gray-900 px-6 py-3 font-medium text-base transition-colors w-full sm:w-auto">
                 Learn More
               </button>
             </div>
           </div>

           {/* Floating Notepads - Hidden on mobile for better performance */}
           <div className="hidden md:block">
             <div className="absolute top-20 left-10 animate-float">
               <div className="bg-yellow-200 p-4 rounded-lg shadow-lg transform rotate-3 relative">
                 <p className="text-sm text-gray-800">Brainstorm ideas</p>
                 <div className="absolute -top-4 -right-4 animate-cursor">
                   <MousePointer className="w-6 h-6 text-blue-500" />
                 </div>
               </div>
             </div>
             <div className="absolute top-40 right-20 animate-float-slow">
               <div className="bg-pink-200 p-4 rounded-lg shadow-lg transform -rotate-2 relative">
                 <p className="text-sm text-gray-800">Collaborate in real-time</p>
                 <div className="absolute -bottom-4 -left-4 animate-cursor" style={{animationDelay: '1s'}}>
                   <MousePointer className="w-6 h-6 text-green-500" />
                 </div>
               </div>
             </div>
             <div className="absolute bottom-40 left-20 animate-float-slower">
               <div className="bg-green-200 p-4 rounded-lg shadow-lg transform rotate-1 relative">
                 <p className="text-sm text-gray-800">Draw & sketch</p>
                 <div className="absolute -top-4 -left-4 animate-cursor" style={{animationDelay: '2s'}}>
                   <MousePointer className="w-6 h-6 text-purple-500" />
                 </div>
               </div>
             </div>
             <div className="absolute bottom-20 right-10 animate-float">
               <div className="bg-blue-200 p-4 rounded-lg shadow-lg transform -rotate-3 relative">
                 <p className="text-sm text-gray-800">Share with team</p>
                 <div className="absolute -bottom-4 -right-4 animate-cursor" style={{animationDelay: '3s'}}>
                   <MousePointer className="w-6 h-6 text-red-500" />
                 </div>
               </div>
             </div>
           </div>
         </section>

        <footer className="bg-gray-900 text-gray-400 py-20 border-t border-gray-800">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid md:grid-cols-4 gap-16 mb-16">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Image src="/logo.svg" alt="CollabCanvas Logo" width={28} height={28} />
                  <span className="text-lg font-bold text-white">CollabCanvas</span>
                </div>
              </div>

              {[
                {
                  title: 'Product',
                  links: ['Features', 'Pricing', 'Templates']
                },
                {
                  title: 'Company',
                  links: ['About', 'Careers', 'Contact']
                },
                {
                  title: 'Resources',
                  links: ['Help', 'Community', 'API']
                }
              ].map((column, index) => (
                <div key={index}>
                  <h3 className="text-white font-medium mb-4 text-sm">{column.title}</h3>
                  <ul className="space-y-3">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href="#" className="text-sm hover:text-white transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-xs">© 2025 CollabCanvas</p>
              <div className="flex space-x-6 text-xs">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}