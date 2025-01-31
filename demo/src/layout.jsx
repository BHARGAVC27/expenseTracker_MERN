import React from 'react'
import SideNav from './components/SideNav'
import DashboardHeader from './components/DashboardHeader'
import { Outlet } from 'react-router-dom'
function DashboardLayout({children}) {
  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
            <DashboardHeader/>
        </div>
        <main className='md:ml-64 p-4'>
            <Outlet/>
        </main>

    </div>
  )
}
export default DashboardLayout