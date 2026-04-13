
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const {currentUser} = useSelector((state)=>state.user)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchTerm.trim !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <section className=" mt-40 px-6 xl:px-32 text-black bg-white  w-full bg-no-repeat bg-cover bg-center text-sm">


      {/* Heading */}
      <h5 className="text-3xl md:text-5xl font-medium max-w-212.5 text-center mx-auto mt-8">
        Discover thousands of books online, read anytime, anywhere with ease.
      </h5>

      <p className="text-2xl mt-10 font-light max-w-212.5 mx-auto">Books expand knowledge, improve imagination, and develop critical thinking skills. They provide insights into different perspectives, enhance vocabulary, and empower individuals with information essential for personal growth and lifelong learning.</p>

        <form onSubmit={handleSearch} className="flex justify-center items-center mx-auto h-12 w-full max-w-md gap-2 mt-10 overflow-hidden rounded-full border border-gray-500/30 bg-white">
            <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder="Search by title, genre and author name" className="h-full bg-transparent w-full pl-6 text-sm placeholder-gray-500 outline-none" required />
            <button type="submit" className="mr-1 h-10 w-56 rounded-full bg-black text-sm text-white transition active:scale-95">Search</button>
        </form>

     
    </section>
  );
};

export default Hero;