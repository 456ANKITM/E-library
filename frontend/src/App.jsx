import React from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Books from './pages/Books'
import BookDetails from './pages/BookDetails'
import Profile from './pages/Profile'
import Search from './pages/Search'
import About from './pages/About'
import Contact from './pages/Contact'

const App = () => {
  return (
   <BrowserRouter> 
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/signin" element={<Signin />} />
     <Route path="/books" element={<Books />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/about" element={<About />} />
     <Route path="/contact" element={<Contact />} />
     <Route path="/search" element={<Search />} />
     <Route path="/book/:bookId" element={<BookDetails />} />
     
   </Routes>
   </BrowserRouter>
  )
}

export default App
