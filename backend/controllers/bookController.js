// controllers/bookController.js
import Book from "../models/Book.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.js";

export const addBook = async (req, res) => {
  try {
    const { title, description, author, category } = req.body;

    if (!req.files || !req.files.image || !req.files.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image and file are required" });
    }

    console.log(req.files);
    // Upload image
    const imageResult = await cloudinary.uploader.upload(
      req.files.image[0].path,
      { resource_type: "image" },
    );

    console.log("imageResult", imageResult);

    // upload a book
    const fileResult = await cloudinary.uploader.upload(
      req.files.file[0].path,
      { resource_type: "raw" },
    );

    const fileURL = cloudinary.url(fileResult.public_id, {
      resource_type: "raw",
      secure: true,
    });

    console.log("PDF URL for browser:", fileURL);

    
    const newBook = new Book({
      title,
      description,
      author,
      category,
      imgUrl: imageResult.secure_url,
      fileUrl: fileURL,
    });

    const savedBook = await newBook.save();

    res.status(201).json({ success: true, book: savedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({success:true, books})
  } catch (error) {
    res.json({success:false, message:"server error"})
  }
}


export const getBookbyId = async (req, res) => {
  try {
    const {bookId} = req.params;
    const book = await Book.findById(bookId);
    if(!book) {
      res.json({success:false, message:"Book not found"})
    }
    res.json({success: true, book})
  } catch (error) {
    res.json({success:false, message:"Server Error"})
  }
}

export const addRating = async (req, res) => {
  try {
    const {bookId} = req.params;
    const {rating} = req.body;
    const userId = req.user;

    const book = await Book.findById(bookId);
    if(!book) {
      return res.json({success:false, message:"Book not found"})
    }

    const alreadyRated = book.ratings.find((r)=>r.user.toString() === userId.toString())
    if(alreadyRated){
      res.json({success:false, message:"You have already rated this book"})
    } else {
  
      book.ratings.push({
        user: userId,
        rating
      })
    }
    const totalRating = book.ratings.reduce((acc, item)=> acc + item.rating, 0)
    
    const averageRating = totalRating / book.ratings.length;
    book.averageRating = averageRating;
    await book.save();
    res.json({success:true, message:"Rating added successfully", averageRating: book.averageRating, ratings: book.ratings})
  } catch (error) {
    res.json({success:false, message:"Error adding rating"})
  }
}

export const addToFavourites = async (req, res) => {
  try {

     const userId = req.user;
     const {bookId} = req.params;

    
     if(!bookId) {
      return res.json({success:false, message:"Book Id is required"})
     }
     const user = await User.findById(userId);
     if(!user) {
      return res.json({success:false, message:"User not found"})
     }
    
     if(user.favouriteBooks.includes(bookId)) {
      return res.json({success:false, message:"Book already in favourites"})
     }
     user.favouriteBooks.push(bookId)
     await user.save();
     res.json({success:true, message:"Book added to favourites", favouriteBooks: user.favouriteBooks})
  } catch (error) {
    res.json({success:false, message:"server error"})
  }
}

export const getAllFavouriteBooks = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).populate({path:"favouriteBooks"});
    if(!user) {
      return res.json({success:false, message:"User not found"})
    }
    res.json({success:true, favouriteBooks: user.favouriteBooks})
  } catch (error) {
    res.json({success:false, message:"Server error"})
  }
}

export const removeFavourites = async (req, res) => {
  try {
    const userId = req.user;
    const {bookId} = req.params;
    if(!bookId) {
      return res.json({success:false, message:"Book id is required"})
    }
    const user = await User.findById(userId)
    if(!user) {
      return res.json({success:false, message:"User not found"})
    }
    if(!user.favouriteBooks.includes(bookId)) {
      return res.json({success:false, message:"Book not in favourites"})
    }
    user.favouriteBooks = user.favouriteBooks.filter((id)=>id.toString() !== bookId)
    await user.save();
    res.json({success:true, message:"Book removed from favourites"})
  } catch (error) {
    res.json({success:false, message:"Server Error"})
  }
}

export const searchBook = async (req, res) => {
  try {
    const {query} = req.query;
    if(!query) {
      return res.json({success:false, message:"Search Query is required"})
    }
    const books = await Book.find({
      $or: [
          { title: { $regex: query, $options: "i" } },
           { author: { $regex: query, $options: "i" } },
             { category: { $regex: query, $options: "i" } },
      ]
    }).sort({createdAt:-1});
    res.json({success:true, books})
  } catch (error) {
    res.json({success:false, message:"Server error"})
  }
}

