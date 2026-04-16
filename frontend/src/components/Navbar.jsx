import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    setDropdownOpen(false);
    navigate("/");
  };

  const goToFavourites = () => {
    setDropdownOpen(false);
    navigate("/favourites");
  };

  return (
    <nav className="h-17.5 relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D]">

      {/* Logo */}
      <img onClick={() => navigate("/")} src={logo} alt="logo" className="h-20 cursor-pointer" />

      {/* Desktop Menu */}
      <ul className="md:flex hidden items-center gap-10">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* USER SECTION */}
      {currentUser ? (
        <div className="relative">

          {/* Username */}
          <span
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-sm font-medium cursor-pointer"
          >
            {currentUser.username}
          </span>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg overflow-hidden">

              <button
                onClick={goToFavourites}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                ⭐ Favourite Books
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500"
              >
                🚪 Logout
              </button>
              {currentUser.isAdmin && <button
                onClick={()=>navigate("/admin")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm "
              >
                👑 Admin Dashboard 
              </button> }

            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full"
        >
          Get started
        </button>
      )}

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="inline-block md:hidden"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-17.5 left-0 w-full bg-white p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-lg">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <button
          onClick={() => navigate("/signup")}
          className="bg-black text-white p-2 rounded-xl mt-5"
        >
          Get started
        </button>
          
           
        </div>
      )}

    </nav>
  );
};

export default Navbar;