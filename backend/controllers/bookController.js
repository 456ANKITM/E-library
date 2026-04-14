// controllers/bookController.js
import Book from "../models/Book.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/User.js";
import streamifier from "streamifier";

// const streamUpload = (buffer, resourceType) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { resource_type: resourceType },
//       (error, result) => {
//         if (result) resolve(result);
//         else reject(error);
//       }
//     );

//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };

// const streamUpload = (buffer, resourceType, format = null) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: resourceType,
//         format: format, // 👈 add this
//       },
//       (error, result) => {
//         if (result) resolve(result);
//         else reject(error);
//       }
//     );

//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };

const streamUpload = (buffer, resourceType) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        type: "upload", // ✅ IMPORTANT (public delivery)
        access_mode: "public", // ✅ ensure public
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};


export const addBook = async (req, res) => {
  try {
    const { title, description, author, category } = req.body;

    if (!req.files || !req.files.image || !req.files.file) {
      return res.status(400).json({
        success: false,
        message: "Image and file are required",
      });
    }

    // ✅ Get buffers instead of paths
    const imageBuffer = req.files.image[0].buffer;
    const fileBuffer = req.files.file[0].buffer;

    // ✅ Upload image
    const imageResult = await streamUpload(imageBuffer, "image");

    // ✅ Upload PDF
    const fileResult = await streamUpload(fileBuffer, "auto");

    const fileURL = fileResult.secure_url
   
    const newBook = new Book({
      title,
      description,
      author,
      category,
      imgUrl: imageResult.secure_url,
      fileUrl: fileURL,
    });

    const savedBook = await newBook.save();

    res.status(201).json({
      success: true,
      book: savedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
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

// export const searchBook = async (req, res) => {
//   try {
//     const {query} = req.query;
//     if(!query) {
//       return res.json({success:false, message:"Search Query is required"})
//     }
//     const books = await Book.find({
//       $or: [
//           { title: { $regex: query, $options: "i" } },
//            { author: { $regex: query, $options: "i" } },
//              { category: { $regex: query, $options: "i" } },
//       ]
//     }).sort({createdAt:-1});
//     res.json({success:true, books})
//   } catch (error) {
//     res.json({success:false, message:"Server error"})
//   }
// }

export const searchBook = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // 1. Split query into words
    const keywords = query
      .toLowerCase()
      .split(" ")
      .filter((word) => word.trim() !== "");

    const books = await Book.find();

    // 2. Score each book
    const scoredBooks = books.map((book) => {
      let score = 0;

      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      const category = book.category.toLowerCase();

      keywords.forEach((word) => {
        if (title.includes(word)) score += 5;      // strongest match
        if (author.includes(word)) score += 3;
        if (category.includes(word)) score += 2;
      });

      return { book, score };
    });

    // 3. Filter + sort
    const filtered = scoredBooks
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.book);

    return res.json({
      success: true,
      count: filtered.length,
      books: filtered,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const fetchBookByCategory = async (req, res) => {
  try {
    const {category} = req.params;
    if(!category) {
      return res.json({success:false, message:"Category is required"})
    }
    const books = await Book.find({category:category})
    return res.json({success:true, books})
  } catch (error) {
     res.json({success:false, message:"Server Error"})
  }
}

export const deleteBook = async (req, res) => {
  try {
    const {bookId} = req.params;
    if(!bookId) {
      return res.json({success:false, Message:"Book Id is required"})
    }
    const book = await Book.findById(bookId)
    if(!book) {
      return res.json({success:false, message:"Book not found"})
    }

    await Book.findByIdAndDelete(bookId)

    return res.json({success:true, message:"Book Deleted Successfully"})
    
  } catch (error) {
    return res.json({success:false, message:"Server Error"})
  }
}

