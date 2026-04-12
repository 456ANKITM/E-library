import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useSignupMutation } from "../redux/api/authApi";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signup({ username, email, password }).unwrap();
      if(response.success) {
        toast.success(response.message)
        navigate("/signin");
      } else {
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.error("Signup error:", error);
    }  finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 w-full max-w-85  md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10 mx-auto mt-10 "
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Sign Up
        </h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Username"
          required
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="email"
          placeholder="Email"
          required
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
          type="password"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mb-3 bg-black hover:bg-black/90 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a
            onClick={() => navigate("/signin")}
            href="#"
            className="text-blue-500 underline"
          >
            Log In
          </a>
        </p>
      </form>
      <Footer />
    </>
  );
};

export default Signup;
