import mongoose from "mongoose";

const BOOK_CATEGORIES = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Horror",
  "Biography",
  "History",
  "Business",
  "Philosophy",
  "Technology",
  "Self-help"
];

const bookSchema = new mongoose.Schema({
  title:{type:String, required:true},
  description:{type:String, required:true},
  author:{type:String, required:true},
  category:{type:String, enum: BOOK_CATEGORIES, required:true},
  fileUrl:{type:String, required:true},
  imgUrl:{type:String, required:true},
  genre:{type:String, default:""},
  ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    averageRating: {type:Number, default:0},
    favouriteCount: {
      type: Number,
      default: 0, 
    },
     reviews:[
    {
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      },
      name: String,
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }
  ]

},{timestamps:true})

const Book = mongoose.model("Book", bookSchema);

export default Book;


