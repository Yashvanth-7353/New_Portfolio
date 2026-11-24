import React from 'react'
import Home from './pages/Home'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './utils/CursorAnimation'

export default function App() {
  return (
    <div className='font-sora'>
      <div className='scroll-progress fixed top-0 left-0 right-0 h-[2px] bg-black scale-x-0 z-[60]' aria-hidden='true' />
      <CustomCursor/>
      <Navbar />
      <Home />
      <div className='section-reveal'><About /></div>
      <div className='section-reveal'><Education /></div>
      <div className='section-reveal'><Experience /></div>
      <div className='section-reveal'><Skills /></div>
      <div className='section-reveal'><Projects /></div>
      <div className='section-reveal'><Achievements /></div>
      <div className='section-reveal'><Contact /></div>

      <Footer />
    </div>
  )
}
