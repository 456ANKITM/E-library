// import React from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import { useSearchParams } from 'react-router-dom'
// import { useGetBooksByCategoryQuery } from '../redux/api/authApi'

// const Category = () => {
//     const [searchParams] = useSearchParams();

//     const category = searchParams.get("category")

//     const {data, isLoading, isError} = useGetBooksByCategoryQuery(category,{
//         skip: !category
//     })

//     const books = data?.books
//     console.log(books)
    
//   return (
//     <>
//     <Navbar />

//     <Footer />
    
//     </>
//   )
// }

// export default Category

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams, Link } from "react-router-dom";
import { useGetBooksByCategoryQuery } from "../redux/api/authApi";

const Category = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { data, isLoading, isError } = useGetBooksByCategoryQuery(category, {
    skip: !category,
  });

  const books = data?.books;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 mt-10">
        <h1 className="text-3xl font-bold text-gray-800">
          {category} Books
        </h1>
        <p className="text-gray-500 mt-1">
          Explore books in {category} category
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 md:px-12 lg:px-20 py-10">
        {/* Loading */}
        {isLoading && (
          <p className="text-center text-gray-500">Loading books...</p>
        )}

        {/* Error */}
        {isError && (
          <p className="text-center text-red-500">Failed to load books</p>
        )}

        {/* Empty */}
        {!isLoading && books?.length === 0 && (
          <p className="text-center text-gray-500">No books found</p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books?.map((book) => (
            <Link
              to={`/book/${book._id}`}
              key={book._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={book.imgUrl}
                  alt={book.title}
                  className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {book.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {book.author}
                </p>

                <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                  {book.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full">
                    {book.category}
                  </span>

                  <span className="text-yellow-500 text-sm">
                    ⭐ {book.averageRating?.toFixed(1) || "0.0"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Category;