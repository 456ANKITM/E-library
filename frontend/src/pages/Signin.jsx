import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSigninMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import toast from 'react-hot-toast';

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin] = useSigninMutation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [loading, setLoading] =  useState(false);

  const handleSubmit= async (e) => {
       e.preventDefault();
       setLoading(true);
       try {
           const response = await signin({email, password})
           
           if(response.data.success) {
              dispatch(setUser(response.data.user))
              toast.success("Signin Successfull")
              navigate("/")
           } else {
            toast.error(response.data.message)
           }
           
           
       } catch (error) {
         console.log(error.message)
       } {
      setLoading(false);
    }
  }
  return (
    <>
    <Navbar />
    <form onSubmit={handleSubmit} className="bg-white text-gray-500 w-full max-w-85  md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10 mx-auto mt-10 ">
      
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Sign in
      </h2>

      <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="email"
        placeholder="Email"
        required
      />

      <input
       value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
        type="password"
        placeholder="Password"
        required
      />

      <button disabled={loading} type="submit" className="w-full mb-3 bg-black hover:bg-black/90 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
        {loading ? "Logging in.." : "Login"}
      </button>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <a onClick={()=>navigate("/signup")} href="#" className="text-blue-500 underline">
          Sign up
        </a>
      </p>
     
    </form>
    <Footer />
    </>
  )
}

export default Signin
