import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title:{type:String, required:true},
  description:{type:String, required:true},
  author:{type:String, required:true},
  category:{type:String, required:true},
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

},{timestamps:true})

const Book = mongoose.model("Book", bookSchema);

export default Book;


