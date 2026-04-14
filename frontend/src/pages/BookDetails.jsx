import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useAddReviewMutation, useAddToFavouriteMutation, useGetBookByIdQuery, useGetBookReviewsQuery, useGetUserByIdQuery, useRemoveFromFavouriteMutation } from "../redux/api/authApi";
import { useAddRatingMutation } from "../redux/api/authApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const BookDetails = () => {

  const navigate = useNavigate()
  const { bookId } = useParams();
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const { data, isLoading, error, refetch } = useGetBookByIdQuery(bookId, {
    skip: !bookId,
  });

  const [addRating] = useAddRatingMutation();
  const [addToFavourite] = useAddToFavouriteMutation();
  const [removeFromFavourite] = useRemoveFromFavouriteMutation();
  const {data:userData, refetch: refetchUser} = useGetUserByIdQuery()
  const {data:reviewData, isLoading:reviewLoading} = useGetBookReviewsQuery(bookId,
    {skip: !bookId})
  const [addReview, {isLoading: addingReview}] = useAddReviewMutation()

  

  // Assuming you store current logged-in user in Redux
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;

  const requireAuth = (currentUser, navigate) => {
  if (!currentUser) {
    navigate("/signup");
    return false;
  }
  return true;
};


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
     if (!requireAuth(currentUser, navigate)) return;
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
     if (!requireAuth(currentUser, navigate)) return;
    try {
      await addToFavourite({bookId}).unwrap();
      refetchUser();
      toast.success("Book Added to Favourites")
    } catch (error) {
      console.error("Failed to add to favourite", error.message)
    }
  }

  const handleRemoveFavourite = async () => {
    //  if (!requireAuth(currentUser, navigate)) return;
    try {
      await removeFromFavourite({bookId}).unwrap();
      refetchUser();
      toast.error("Book removed from favourites")

    } catch (error) {
      console.error("Error Removing from favourites:", error.message)
    }
  }

  const handlePreview = (bookId, fileUrl) => {
  if (!requireAuth(currentUser, navigate)) return;
  navigate(`/book-preview/${bookId}`)
};

const handleAddReview = async () => {
 if(!requireAuth(currentUser, navigate)) return;
 if(!comment.trim()) {
  toast.error("Review can not be empty")
 }
 try {
  let res = await addReview({bookId, comment}).unwrap()
   if(res.success) {
    setComment("")
    toast.success("Review added")
   } else {
    setComment("")
    toast.error(res.message)
   }
 } catch (error) {
   toast.error(error?.data?.message || "Failed to add Review")
 }
}

const isFavourite = currentUser && userData?.user?.favouriteBooks?.includes(book?._id);

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
              <button
  onClick={() => handlePreview(book?._id, book?.fileUrl)}
  className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
>
  Preview Book
</button>
              {/* Favourite Button */}{" "}
            {isFavourite ? (
  <button
    onClick={handleRemoveFavourite}
    className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-md hover:bg-indigo-50 transition"
  >
    Remove from Favourites
  </button>
) : (
  <button
    onClick={handleAddFavourite}
    className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-md hover:bg-indigo-50 transition"
  >
    Add to Favourites
  </button>
)}
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
             <div className='mt-12'>
              <h2 className='text-2xl font-bold text-gray-800 mb-6'>Reviews</h2>
              {/* Add Review box  */}
              <div className='bg-white shadow-md rounded-xl p-4 mb-6'>
                <textarea
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                placeholder="Wrie Your review..."
                className='w-full rounded-lg p-3 outline-none resize-none'
                rows={4}
                 />

                 <div className="flex justify-end mt-3">
                  <button
                  onClick={handleAddReview}
                  disabled={addingReview}
                  className='bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50'
                  >
                   {addingReview ? "Posting..." : "Post Review"}
                  </button>
                 </div>

              </div>
              
              {/* Reviews List  */}
              {reviewLoading ? (
                <p className='text-gray-500'>Loading Reviews....</p>
              ) : reviewData?.reviews?.length === 0 ? (
                <p className="text-gray-500">No Reviews Yet. Be the first!</p>
              ): (
                <div className='space-y-4'> 
                   {reviewData?.reviews.map((review)=>(
                    <div key={review._id} className='bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition'>
                      <div className='flex items-center justify-between mb-2'>
                        <h4>{review?.user?.username || review?.name || "Anonymous"}</h4>
                         <span>{new Date(review.createdAt).toLocaleString()}</span>
                      </div>
                       <p className="text-gray-600">{review.comment}</p>
                       </div>
                   ))}
                </div>
              )}

             </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDetails;
