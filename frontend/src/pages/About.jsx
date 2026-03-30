import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-6 md:px-16 lg:px-32 py-16 bg-gray-50">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Our Library
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Our online library is dedicated to making knowledge accessible to everyone, everywhere. Explore thousands of books across genres and authors, read anytime, and expand your imagination.
          </p>
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
            alt="Library"
            className="rounded-lg shadow-lg mx-auto mb-8"
          />

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-6">
            To empower readers by providing a seamless digital platform for discovering, reading, and enjoying books. We believe in lifelong learning and strive to inspire curiosity in every user.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <ul className="text-gray-700 list-disc list-inside space-y-2">
            <li>Extensive collection of books from various genres.</li>
            <li>User-friendly interface with advanced search options.</li>
            <li>Accessible anytime, anywhere, on any device.</li>
            <li>Encourages learning, imagination, and critical thinking.</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;