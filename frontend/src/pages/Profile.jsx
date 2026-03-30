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

        {/* LEFT SECTION - 40% */}
         <div className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            {/* Cover + Avatar */}
            <div className="relative h-32 bg-linear-to-r from-indigo-500 to-purple-500">
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                  {currentUser.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="pt-14 p-6">
              <h2 className="text-xl font-bold">{currentUser.username}</h2>
              <p className="text-gray-500 text-sm">{currentUser.email}</p>

              {/* Bio */}
              <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                {currentUser.bio || "No bio added yet. Tell us what you love to read!"}
              </p>

              {/* Extra Info */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">📍 Address</span>
                  <span className="font-medium">{currentUser.address || "Not added"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">📚 Favourite Genres</span>
                  <span className="font-medium text-right">
                    {currentUser.genres?.length ? currentUser.genres.join(", ") : "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">⭐ Total Favourites</span>
                  <span className="font-medium">{currentUser.favouriteBooks?.length || 0}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">📅 Joined</span>
                  <span className="font-medium">
                    {new Date(currentUser.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                  Edit Profile
                </button>
                <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

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
