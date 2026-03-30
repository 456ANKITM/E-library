import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import logo from "../assets/logo.png"
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

const Navbar = () => {
  
  const {currentUser} = useSelector((state)=>state.user)
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser())
    navigate("/")
  }

  return (
    <nav className="h-17.5 relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      
      <img onClick={()=>navigate("/")} src={logo} alt="logo" className="h-20" />

      {/* Desktop Menu */}
      <ul className="md:flex hidden items-center gap-10">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Desktop Button */}
      {currentUser ? (
       <div className='flex items-center gap-4 cursor-pointer'> 
         <span onClick={()=>navigate("/profile")} className="text-sm font-medium">
             {currentUser.username}
         </span>
         <button
         onClick={handleLogout}
         className="bg-gray-500 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-600 active:scale-95 transition"
         >
            Logout
         </button>
       </div>
         )  
       : (
        <button
        onClick={()=>navigate("/signup")}
        type="button"
        className="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full cursor-pointer"
      >
        Get started
      </button> )} 

      {/* Mobile Menu Button */}
      <button
        aria-label="menu-btn"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="inline-block md:hidden active:scale-90 transition"
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="#000">
          <path d="M3 7H27M3 14H27M3 21H27" stroke="black" strokeWidth="2" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-17.5 left-0 w-full bg-white p-6 md:hidden transition-all ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col space-y-4 text-lg">
         <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        </ul>

        {currentUser ? currentUser.name : <button
          type="button"
          className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
        >
          Get started
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;