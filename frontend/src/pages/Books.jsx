import { useGetAllBooksQuery } from "../redux/api/authApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import BookCard from "../components/BookCard";
import { useNavigate, Link } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllBooksQuery();
  

  if (isLoading) {
    return <p className="text-center mt-10">Loading books...</p>;
  }

  const books = data?.books || []
  console.log(books);


  return (
    <div>
      <Navbar />

      <div className="px-4 md:px-10 lg:px-20 py-10">
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard onClick={()=>navigate(`/book/${book._id}`)} key={book._id} book={book} />
          ))}
        </div> */}
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

export default Books;