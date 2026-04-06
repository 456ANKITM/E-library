import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CategorySection from '../components/CategorySection'
import Footer from '../components/Footer'

const Home = () => {
  console.log(import.meta.env.VITE_BASE_URL);
  return (
    <div>
      <Navbar />
      <Hero />
      <CategorySection />
      <Footer />
    </div>
  )
}

export default Home
