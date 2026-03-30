import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    "Fiction",
    "Science",
    "Business",
    "Technology",
    "Self-Help",
    "History",
    "Education",
    "Biography",
  ];

  const handleCategoryClick = (category) => {
    navigate(`/books?category=${category}`);
  };

  return (
    <section className="px-6 xl:px-32 py-16 bg-white mt-20">
      
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
        Browse by Category
      </h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category)}
            className="cursor-pointer border border-gray-300 rounded-xl p-6 text-center hover:bg-black hover:text-white transition-all duration-300"
          >
            <p className="text-lg font-medium">{category}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default CategorySection;