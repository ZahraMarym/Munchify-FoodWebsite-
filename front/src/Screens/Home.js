import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Front from "../Components/Front";
import Search from '../Components/Search';
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import LoggedInContainer from "../Container/LoggedInContainer";
import DishesCard from "../Components/DishesCard";

const Home = () => {
  const [foodData, setFoodData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Appetizers");

  // categories
  const categories = [
    "Appetizers",
    "Soup & Salads",
    "Main Courses",
    "Burgers & Sandwiches",
    "Pizza",
    "Asian Cuisines",
    "Mexican Cuisines",
    "Desserts",
    "Beverages",
    "Kids Menu",
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          "/Category/getFoodItems/"+selectedCategory
        );
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching all Categories: ", error.message);
      }
    };

    getData();
  }, [foodData]);


  // category click
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <LoggedInContainer>
        {/* Slider */}
        <div className="bg-black text-yellow-500 border-b border-yellow-500 flex overflow-x-auto sm:overflow-hidden">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`category flex-1 text-center py-2 cursor-pointer transition-colors ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-black'
                  : 'hover:bg-yellow-500 hover:text-black'
              }`}
            >
              {category}
            </div>
          ))}

          {/* Sliding indicator */}
          {selectedCategory && (
            <div
              className="indicator bg-green-500 h-1 transition-transform"
              style={{
                transform: `translateX(${categories.indexOf(
                  selectedCategory
                ) * 100}%)`,
              }}
            />
          )}
        </div>

        {/* Render DishesCard for each item in foodData */}
        <div className="flex flex-wrap justify-center items-center m-3">
  {foodData.map((dish, index) => (
    <DishesCard key={index} dish={dish} className="your-custom-class" />
  ))}
</div>

      </LoggedInContainer>
    </div>
  );
};

export default Home;
