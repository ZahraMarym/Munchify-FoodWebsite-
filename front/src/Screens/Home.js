import React, { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import LoggedInContainer from "../Container/LoggedInContainer";
import DishesCard from "../Components/DishesCard";
import { useTimer } from "../Context/TimerContext"; // Import the useTimer hook
import rider from "../Images/motorbike.png";
import { Progress } from "@material-tailwind/react";
const Home = () => {
  const [foodData, setFoodData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Appetizers");
  const { seconds, setSeconds, resetTimer } = useTimer();

  // State to track if there are orders in progress
  const [ordersInProgress, setOrdersInProgress] = useState(false);

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
    const fetchOrdersInProgress = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          "/Order/in-progress"
        );
        setOrdersInProgress(response.length > 0);
      } catch (error) {
        console.error("Error fetching orders in progress: ", error.message);
      }
    };

    fetchOrdersInProgress();
  }, []); // Fetch orders in progress only once on component mount

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          `/Category/getFoodItems/${selectedCategory}`
        );
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching food data: ", error.message);
      }
    };

    fetchFoodData();
  }, [selectedCategory]); // Update data when selected category changes

  // category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    // Reset seconds to zero when the Timer component mounts
    setSeconds(0);

    const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1); // Increase the seconds
    }, 1000);

    return () => clearInterval(timer);
}, [setSeconds]);


  const progressWidth = (seconds / (30 * 60)) * 100;


  return (
    <div>
      <LoggedInContainer currentActiveScreen="home">
        {/* Conditional rendering of the progress bar */}
        {ordersInProgress && (
          <div className="progress-bar flex flex-col justify-center items-center bg-yellow-500 h-auto border border-black rounded-md p-4">
            <p className="font-semibold text-lg mb-4">
              Your Order is in Progress.
            </p>
            <div className="w-full max-w-lg">
              <div className="flex h-2 border border-black bg-yellow-500 w-full rounded-full">
                <div
                  className="h-2 border border-black bg-black rounded-full"
                  style={{ width: `${progressWidth > 0 ? progressWidth : 0}%` }} // Set progress bar width based on remaining time
                />
              </div>
            </div>
            <img src={rider} alt="Rider" className="w-20 mt-4" />
          </div>
        )}

        {/* Slider */}
        <div className="bg-black text-yellow-500 border-b border-yellow-500 flex overflow-x-auto sm:overflow-hidden">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`category flex-1 text-center py-2 cursor-pointer transition-colors ${
                selectedCategory === category
                  ? "bg-yellow-500 text-black"
                  : "hover:bg-yellow-500 hover:text-black"
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
                transform: `translateX(${
                  categories.indexOf(selectedCategory) * 100
                }%)`,
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
