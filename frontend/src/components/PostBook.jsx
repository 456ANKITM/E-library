import React from "react";
import { usePostBookMutation } from "../redux/api/authApi";
import { useState } from "react";
const PostBook = () => {
  const [postBook, { isLoading }] = usePostBookMutation();
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    category: "",
    image: null,
    file: null,
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("author", form.author);
    formData.append("category", form.category);
    formData.append("image", form.image);
    formData.append("file", form.file);
    try {
      const res = await postBook(formData).unwrap();
      console.log("Uploaded Response:", res);
      setForm({
        title: "",
        description: "",
        author: "",
        category: "",
        image: null,
        file: null,
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 shadow-rounded">
      {" "}
      <h2 className="text-2xl font-bold mb-4">Post a Book</h2>{" "}
      <form onSubmit={handleSubmit} className="space-y-4">
        {" "}
        <input
          type="text"
          name="title"
          Placeholder="Book Title"
          value={form.title}
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />{" "}
        <textarea
          name="description"
          placeholder="Description of the book"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />{" "}
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />{" "}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          {" "}
          <option value="">Select Category</option>{" "}
          <option value="Fiction">Fiction</option>{" "}
          <option value="Mystery">Mystery</option>{" "}
          <option value="Thriller">Thriller</option>{" "}
          <option value="Romance">Romance</option>{" "}
          <option value="Fantasy">Fantasy</option>{" "}
          <option value="Horror">Horror</option>{" "}
          <option value="Biography">Biography</option>{" "}
          <option value="History">History</option>{" "}
          <option value="Business">Business</option>{" "}
          <option value="Philosophy">Philosophy</option>{" "}
          <option value="Technology">Technology</option>{" "}
          <option value="Self-help">Self-help</option>{" "}
        </select>{" "}
        Image: <input type="file" name="image" onChange={handleFileChange} />{" "}
        File: <input type="file" name="file" onChange={handleFileChange} />{" "}
        <button
          type="submit"
          disableded={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {" "}
          {isLoading ? "Uploading..." : "Post Book"}{" "}
        </button>{" "}
      </form>{" "}
    </div>
  );
};
export default PostBook;
