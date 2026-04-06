import { useGetAllBooksQuery } from "../redux/api/authApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllBooksQuery();
  

  if (isLoading) {
    return <p className="text-center mt-10">Loading books...</p>;
  }

  const books = data?.books || []


  return (
    <div>
      <Navbar />

      <div className="px-4 md:px-10 lg:px-20 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard onClick={()=>navigate(`/book/${book._id}`)} key={book._id} book={book} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Books;