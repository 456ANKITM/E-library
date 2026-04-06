import multer from "multer";

const storage = multer.memoryStorage(); // 🔥 FIX

const upload = multer({ storage });

export const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);