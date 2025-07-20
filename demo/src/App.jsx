import { useState } from 'react'
import Logo from './assets/logo.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css';
import Banner from './components/banner';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function App() {
  const {user,isLoaded,isSignedIn} = useUser();
  
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
