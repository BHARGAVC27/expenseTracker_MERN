import React from 'react'
import SideNav from './components/SideNav'
import DashboardHeader from './components/DashboardHeader'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function DashboardLayout({children}) {
  const {user, isLoaded, isSignedIn} = useUser();
  
  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <svg className="animate-spin h-12 w-12 text-teal-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>
    );
  }
  
  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Navigate to='/auth/sign-in' replace />;
  }

  return (
    <div className="relative">
        {/* Mobile: SideNav is positioned fixed and handled by its own state */}
        {/* Desktop: SideNav is fixed with proper width */}
        <div className='md:fixed md:w-64 md:block'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
            <DashboardHeader/>
        </div>
        <main className='md:ml-64 p-2 sm:p-4 pt-16 md:pt-4'>
            <Outlet/>
        </main>
    </div>
  )
}
export default DashboardLayout