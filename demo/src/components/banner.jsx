import React from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-1.png';

function Banner() {
  const { isLoaded, isSignedIn } = useUser();
  // Loading state while Clerk initializes
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  // Redirect signed-in users to dashboard
  if (isSignedIn) {
    window.location.replace('/dashboard');
    return null;
  }
  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-12 lg:px-24 xl:px-44">
      {/* Header */}
      <header className="bg-white shadow-sm w-full">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row h-16 items-center justify-between gap-2 sm:gap-0">
            {/* Logo */}
            <Link to="/" className="flex items-center mb-2 sm:mb-0 ">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-16 w-auto sm:h-14"
              />
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-2 sm:gap-4">
              {isSignedIn ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <Link
                    to="/dashboard"
                    className="rounded-md bg-teal-600 px-3 py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Dashboard
                  </Link>
                  <UserButton />
                </div>
              ) : (
                <Link
                  to="/auth/sign-in"
                  className="rounded-md bg-teal-600 px-3 py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-2 py-12 sm:px-4 sm:py-20 md:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Take Control of Your{' '}
              <span className="text-teal-600">Finances</span>
            </h1>
            <h2 className="mt-3 text-lg font-semibold text-teal-700 sm:text-xl md:text-2xl">
              Visualize Your Financial Progress
            </h2>
            <p className="mt-4 text-base sm:text-lg md:text-xl leading-7 text-gray-600">
              Your Money, Your Way: Simplify Budgeting with Ease!
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                to={isSignedIn ? "/dashboard" : "/auth/sign-in"}
                className="w-full rounded-md bg-teal-600 px-6 py-2 text-sm sm:text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
              >
                Get Started
              </Link>
              <button
                type="button"
                className="w-full rounded-md border border-teal-600 px-6 py-2 text-sm sm:text-base font-semibold text-teal-600 transition-colors hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  featuresSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Everything you need to manage your finances
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-7 text-gray-600">
              Take control of your financial future with our comprehensive expense tracking tools.
            </p>
          </div>
          
          <div className="mx-auto mt-10 max-w-2xl sm:mt-14 md:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 sm:gap-y-16 md:gap-x-12 lg:max-w-none md:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-5 w-5 flex-none rounded-full bg-teal-600" />
                  Track Expenses
                </dt>
                <dd className="mt-3 sm:mt-4 flex flex-auto flex-col text-sm sm:text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Monitor your spending habits with detailed expense tracking and categorization.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-5 w-5 flex-none rounded-full bg-teal-600" />
                  Budget Planning
                </dt>
                <dd className="mt-3 sm:mt-4 flex flex-auto flex-col text-sm sm:text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Create and manage budgets to stay on track with your financial goals.
                  </p>
                </dd>
              </div>
              
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-5 w-5 flex-none rounded-full bg-teal-600" />
                  Visual Reports
                </dt>
                <dd className="mt-3 sm:mt-4 flex flex-auto flex-col text-sm sm:text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Get insights with beautiful charts and reports to understand your financial health.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Banner