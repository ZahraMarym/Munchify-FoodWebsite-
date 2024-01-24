import { useState } from "react";
import Cart from "../Models/Cart";

const DishesCard = ({ dish, className }) => {
  const [addToCartModel, setAddToCart] = useState(false);
  const Sizeoptions = ["small", "medium", "large"];
  const { image, title, description, options } = dish;
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(Sizeoptions[0]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
  };

  const getPrice = () => {
    // Find the selected size in the options array and get its price
    const selectedOption = options[0]; // Assuming there's only one set of options
    return selectedOption ? selectedOption[selectedSize] * quantity : 0;
  };

  //add to cart
  const addFoodItemToLocalstorage = () => {
    // Create a new food item object
    const foodItem = {
      title,
      description,
      quantity,
      size: selectedSize,
      price: getPrice(),
      image,
    };

    // Get the existing food items from local storage
    const existingFoodItems = JSON.parse(localStorage.getItem('foodItems')) || [];

    // Add the new food item
    existingFoodItems.push(foodItem);

    // Save the updated food items back to local storage
    localStorage.setItem('foodItems', JSON.stringify(existingFoodItems));
    alert("Success", "Added to Cart!!");
  };

  return (
    <div className={`border border-yellow-500 text-yellow-500 border-2 max-w-xs mx-auto my-8 p-1 justify-center items-center overflow-hidden shadow-lg ${className}`}>
      <div className="flex justify-center items-center">
        <img className="w-60 h-52" src={image} alt={title} />
      </div>{" "}
      <div className="px-2 py-4">
        <div className="text-center">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-base">{description}</p>
        </div>
        <div className="mt-4 flex">
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="5"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-1/2 px-2 py-1 mr-2 bg-transparent border border-yellow-500"
          />
          <select
            value={selectedSize}
            onChange={handleSizeChange}
            className="w-1/2 px-2 py-1 bg-transparent border border-yellow-500"
          >
            {Sizeoptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 justify-center items-center flex">
          {getPrice()} {/* Display dynamically calculated price */}
        </div>
      </div>
      <div className="flex justify-center items-center m-1">
        <button onClick={addFoodItemToLocalstorage} className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded full w-1/2">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default DishesCard;
