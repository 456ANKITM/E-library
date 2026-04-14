import React from "react";
import { useDeleteBookMutation, useGetAllBooksQuery } from "../redux/api/authApi";
import { useNavigate, Link } from "react-router-dom";

const BookList = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetAllBooksQuery();
  const [deleteBook] = useDeleteBookMutation()
  if (isLoading) {
    return <p className="text-center mt-10">Loading books...</p>;
  }

  if (error) {
    return <p>Error Loading the book</p>;
  }
  const books = data?.books;

  const handleDelete = async (bookId, e) => {
    
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this book ?"
    )
    if(!confirmDelete) return;
    try{
        await deleteBook(bookId).unwrap()
        refetch()
        
    } catch (error) {
        console.log("Delete Error:", error)
    }
  }
  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <div className="flex justify-between">
                 <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {book.title}
            </h2>

<button
  onClick={(e) => {
    e.preventDefault();   // stop Link navigation
    e.stopPropagation();  // stop event bubbling
    handleDelete(book._id);
  }}
  className="text-red-500 hover:text-red-700 text-sm"
  title="Delete Book"
>
  🗑
</button>
            
            </div>
           

            <p className="text-sm text-gray-500 mt-1">{book.author}</p>

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
  );
};

export default BookList;
