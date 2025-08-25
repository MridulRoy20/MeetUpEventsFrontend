import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './Pages/HomePage'
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  

  return (
    <div className='bg-light'>
      <Header />

      <HomePage />
    </div>
  )
}

export default App
