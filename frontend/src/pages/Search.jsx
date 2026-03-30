import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard'; // make sure this is imported
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchBooksQuery } from '../redux/api/authApi';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchTerm = searchParams.get("query") || "";

  // Call the RTK Query
  const { data: booksData, isLoading, isError } = useSearchBooksQuery(searchTerm, {
    skip: searchTerm.trim() === "",
  });

  const books = booksData?.books || []; // safely handle undefined

  return (
    <div>
      <Navbar />

      <div className="px-4 md:px-10 lg:px-20 py-10">
        <h2 className="text-2xl mb-6">Search results for "{searchTerm}"</h2>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong while fetching books.</p>}
        {!isLoading && books.length === 0 && <p>No books found.</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onClick={() => navigate(`/book/${book._id}`)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;