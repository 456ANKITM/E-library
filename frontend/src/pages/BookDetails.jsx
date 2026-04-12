import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useAddToFavouriteMutation, useGetBookByIdQuery, useGetUserByIdQuery, useRemoveFromFavouriteMutation } from "../redux/api/authApi";
import { useAddRatingMutation } from "../redux/api/authApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BookDetails = () => {

  const { bookId } = useParams();
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const { data, isLoading, error, refetch } = useGetBookByIdQuery(bookId, {
    skip: !bookId,
  });

  const [addRating] = useAddRatingMutation();
  const [addToFavourite] = useAddToFavouriteMutation();
  const [removeFromFavourite] = useRemoveFromFavouriteMutation();
  const {data:userData, refetch: refetchUser} = useGetUserByIdQuery()

  // Assuming you store current logged-in user in Redux
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;

  useEffect(() => {
    if (data?.book && userId) {
      // Check if user has already rated
      const existingRating = data.book.ratings.find((r) => r.user === userId);

      if (existingRating) {
        setRating(existingRating.rating);
        setHasRated(true);
        refetch()
      }
    }
  }, [data, userId]);

  if (isLoading) return <p className="text-center mt-10">Loading book...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Error loading book</p>;

  const book = data?.book;
  const averageRating = book?.averageRating || 0;

  const handleRating = async (star) => {
    try {
      setRating(star);
      const response = await addRating({ rating: star, bookId }).unwrap();
      console.log("Rating submitted", response);
      refetch();
    } catch (error) {
      console.error("Rating failed", error);
    }
  };

  const handleAddFavourite = async () => {
    try {
      await addToFavourite({bookId}).unwrap();
      refetchUser();
      toast.success("Book Added to Favourites")
    } catch (error) {
      console.error("Failed to add to favourite", error.message)
    }
  }

  const handleRemoveFavourite = async () => {
    try {
      await removeFromFavourite({bookId}).unwrap();
      refetchUser();
      toast.error("Book removed from favourites")

    } catch (error) {
      console.error("Error Removing from favourites:", error.message)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-10 lg:px-20 py-10 mt-10 mr-10 ml-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-[30%] w-full">
            <img
              src={book?.imgUrl}
              alt={book?.title}
              className="w-full h-auto rounded-xl shadow-md"
            />
            <h2 className="text-xl font-bold mt-4 text-gray-800">
              {book?.title}
            </h2>
            <p className="text-gray-500 mt-1">{book?.author}</p>
          </div>

          <div className="md:w-[70%] w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">{book?.description}</p>
            {/* Buttons */}{" "}
            <div className="mt-6 flex gap-4 flex-wrap">
              {" "}
              {/* Preview Button */}{" "}
              <a
                href={book?.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                {" "}
                Preview Book{" "}
              </a>{" "}
              {/* Favourite Button */}{" "}
              {userData?.user?.favouriteBooks?.includes(book._id) ? (
                <button onClick={handleRemoveFavourite} className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-md hover:bg-indigo-50 transition">
                {" "}
                Remove from Favourites{" "}
              </button>
              ) : ( <button onClick={handleAddFavourite} className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-md hover:bg-indigo-50 transition">
                {" "}
                Add to Favourites{" "}
              </button>) }
            </div>
            {/* Stars */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Rate this Book
              </h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-3xl cursor-pointer transition ${
                      rating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => {
                      if (!hasRated) handleRating(star);
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Average Rating */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-gray-700 font-medium">
                  Average Rating:
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        averageRating >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({averageRating.toFixed(1)})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDetails;
