import express from "express"
import { uploadFields } from "../middleware/upload.js";
import { addBook, addRating, addToFavourites, fetchBookByCategory, getAllBooks, getAllFavouriteBooks, getBookbyId, removeFavourites, searchBook } from "../controllers/bookController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router()


router.get("/get-all-books", getAllBooks);
router.get("/search", searchBook)
router.post("/upload", uploadFields, addBook)
router.get("/getAllFavouriteBooks", protect, getAllFavouriteBooks)
router.get("/category/:category", fetchBookByCategory)
router.get("/:bookId", getBookbyId);
router.post("/addRating/:bookId", protect, addRating )
router.post("/addToFavourites/:bookId",protect, addToFavourites)
router.post("/removeFromFavourites/:bookId",protect, removeFavourites)


export default router;