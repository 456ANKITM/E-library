import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import BookList from '../components/BookList'
import PostBook from '../components/PostBook'

const Admin = () => {
    const [activeTab, setActiveTab] =  useState("books")
  return (
    <div>
      <Navbar />
      {/* Main Section  */}
      <div className='flex flex-1 mt-10'>

        {/* Sidebar  */}
        <div className='w-64 h-160 bg-gray-100 text-black p-5'>
            <h2 className='text-xl font-bold mb-6'>Admin Panel</h2>
            <ul className='space-y-4'>
                 <li className={`cursor-pointer p-2 rounded ${activeTab === "books" ? "bg-gray-200" : ""}`} onClick={()=>setActiveTab("books")}>
                      📚 Books
                 </li>
                  <li
              className={`cursor-pointer p-2 rounded ${
                activeTab === "post" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab("post")}
            >
              ➕ Post Book
            </li>
            </ul>
        </div>

        {/* Content Area  */}

        <div className='flex-1 p-6 bg-gray-100'>

            {activeTab === "books" && (
                <div> 
                    {/* <h1>All Books</h1> */}
                     <BookList />
                </div>
            )}

            {activeTab === "post" && (
                <div>
                    {/* <h1>Post a Book</h1> */}
                    <PostBook />
                </div>
            )}

        </div>


      </div>
      <Footer />
    </div>
  )
}

export default Admin
