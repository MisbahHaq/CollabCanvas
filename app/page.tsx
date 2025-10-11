"use client";

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Menu, X, ArrowRight, Play, CheckCircle, Users, Zap, Lock, Globe } from 'lucide-react';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
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
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Miro</span>
              </div>

              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Products</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Solutions</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Resources</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Enterprise</a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Pricing</a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 hover:text-gray-900 px-4 py-2 font-medium transition-colors">
                Contact Sales
              </button>
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
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Products</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Solutions</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Resources</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Enterprise</a>
              <a href="#" className="block text-gray-700 hover:text-gray-900 py-2 font-medium">Pricing</a>
              <div className="pt-4 space-y-2">
                <SignInButton>
                  <button className="w-full text-gray-700 hover:text-gray-900 px-4 py-2 font-medium">Sign In</button>
                </SignInButton>
                <SignUpButton>
                  <button className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all font-medium">
                    Sign up free
                  </button>
                </SignUpButton>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
            <div className="absolute top-32 left-[8%] w-40 h-32 bg-yellow-200/80 rounded shadow-lg transform -rotate-3 animate-float-slow p-4">
              <p className="text-gray-700 text-sm font-medium">Brainstorm</p>
            </div>

            <div className="absolute top-24 right-[10%] w-36 h-36 bg-blue-200/80 rounded shadow-lg transform rotate-2 animate-float p-4">
              <p className="text-gray-700 text-sm font-medium">Collaborate</p>
            </div>

            <div className="absolute bottom-48 left-[12%] w-32 h-32 bg-green-200/80 rounded shadow-lg transform rotate-6 animate-float-slower p-4">
              <p className="text-gray-700 text-sm font-medium">Plan</p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-40 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                The innovation workspace
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
                Bring teams together to build better. Miro helps unlock creativity and build momentum.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <SignUpButton>
                  <button className="group bg-blue-600 text-white px-7 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
                    <span>Get started free</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </SignUpButton>
                <button className="group flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-7 py-3 font-medium transition-colors">
                  <Play className="w-4 h-4" />
                  <span>Watch video</span>
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Free forever • No credit card required
              </p>
            </div>

            <div className="mt-20 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none"></div>
              <div className="rounded-xl overflow-hidden shadow-xl border border-gray-200">
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Miro workspace"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <p className="text-sm text-gray-500 mb-8">Trusted by teams worldwide</p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40">
                {['Cisco', 'Walmart', 'Volvo', 'Deloitte'].map((company) => (
                  <span key={company} className="text-xl font-semibold text-gray-600">{company}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Built for the way you work
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Bring your team together in one place.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: Users,
                  title: 'Collaborate',
                  description: 'Work seamlessly with your team, anywhere.'
                },
                {
                  icon: Zap,
                  title: 'Move fast',
                  description: 'Real-time collaboration for instant feedback.'
                },
                {
                  icon: Lock,
                  title: 'Stay secure',
                  description: 'Enterprise-grade security for your data.'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-5 mx-auto">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                  Transform how your team works
                </h2>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  From brainstorming to execution, Miro helps teams visualize ideas and ship faster.
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    'Infinite canvas',
                    '1000+ templates',
                    '100+ integrations',
                    'Real-time collaboration'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-gray-900 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="group text-gray-900 font-medium flex items-center space-x-2 hover:gap-3 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
                  <img
                    src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt="Team collaboration"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join millions of users worldwide
              </h2>
              <p className="text-lg mb-10 text-gray-300 leading-relaxed">
                Teams of all sizes use Miro to collaborate and innovate.
              </p>
              <SignUpButton>
                <button className="bg-white text-gray-900 px-7 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium inline-flex items-center space-x-2">
                  <span>Get started free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignUpButton>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 text-gray-400 py-20 border-t border-gray-800">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid md:grid-cols-4 gap-16 mb-16">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-7 h-7 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-white">Miro</span>
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
              <p className="text-xs">© 2025 Miro</p>
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