import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
  try{
    const token = req.cookies.token;
    if(!token) {
      return res.json({success:false, message:"You are not logged in"})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.id;
    next();
  } catch (error) {
    res.json({success:false, message:"Not Authorized, token failed"})
  }
}

export default protect;