import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ closeModal }) => {
    const navigate = useNavigate();
  // Function to get all food items from local storage
  const getFoodItemsFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('foodItems')) || [];
  };

  // Function to remove a food item from local storage
  const removeFoodItem = (index) => {
    const updatedFoodItems = getFoodItemsFromLocalstorage();
    updatedFoodItems.splice(index, 1);
    localStorage.setItem('foodItems', JSON.stringify(updatedFoodItems));
  };

  // Example usage
  const allFoodItems = getFoodItemsFromLocalstorage();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-black text-gray-400 bg-opacity-90 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-md border border-yellow-500 p-4 md:p-8 overflow-auto text-sm md:text-base lg:text-lg xl:text-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-yellow-500 mb-4 font-semibold text-base md:text-lg lg:text-xl xl:text-2xl">
          YOUr CART
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <ul className="space-y-4 w-full">
            {Array.isArray(allFoodItems) && allFoodItems.length === 0 &&
            <div className='text-lg font-semibold'>Cart is Empty</div>}
            {Array.isArray(allFoodItems) && allFoodItems.length > 0 &&
              allFoodItems.map((foodItem, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-yellow-600 p-4 bg-black border border-yellow-500 border-2 rounded-md shadow-md"
                >
                  <div className="w-2/3 text-sm">
                    <strong className="text-lg font-semibold">
                      {foodItem.title}
                    </strong>
                    <p>Quantity: {foodItem.quantity}</p>
                    <p>Size: {foodItem.selectedSize}</p>
                    <p>Price: {foodItem.price}</p>
                    {/* Add more details based on your food item structure */}
                  </div>
                  <button
                    className="bg-yellow-500 text-black px-3 py-1 rounded-md hover:bg-yellow-700"
                    onClick={() => removeFoodItem(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
          {
            allFoodItems.length >0 && 
            <button
                    className="bg-black text-yellow-500 border border-yellow-500 border-2 px-3 py-2 rounded-md hover:text-yellow-700"
                    onClick={()=>{
                        navigate("/checkout");
                    }}
                  >
                    Proceed To Checkout
                  </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;
