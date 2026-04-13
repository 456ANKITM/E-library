import React from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useGetAllFavouriteBooksQuery } from '../redux/api/authApi'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const {data} = useGetAllFavouriteBooksQuery()
  const favouriteBooks = data?.favouriteBooks || [];

  return (
    <div>
      <Navbar />
            <div className="min-h-screen p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* RIGHT SECTION - 60% */}
        <div className="md:col-span-3 bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Favourite Books</h2>

          {favouriteBooks.length === 0 ? (
            <p>No favourite books yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favouriteBooks.map((book) => (
                <div
                  onClick={()=>navigate(`/book/${book._id}`)}
                  key={book._id}
                  className="bg-gray-50 rounded-xl shadow hover:shadow-md transition p-4 cursor-pointer"
                >
                  <img
                    src={book.imgUrl}
                    alt={book.title}
                    className="w-full h-80 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
      <Footer />
    </div>
  )
}

export default Profile
