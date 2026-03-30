import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
      
      {/* Book Image */}
      <img
        src={book.imgUrl || "https://via.placeholder.com/150"}
        alt={book.title}
        className="w-full h-50 object-cover"
      />

      {/* Book Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {book.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1 h-10">
          {book.author || "Unknown Author"}
        </p>

        {/* Optional button */}
        <button onClick={()=>navigate(`/book/${book._id}`)} className="mt-3  w-full bg-indigo-600 text-white py-1.5 rounded-md hover:bg-indigo-700 transition">
          View Details
        </button>
      </div>
    </div>
  );
};

export default BookCard;