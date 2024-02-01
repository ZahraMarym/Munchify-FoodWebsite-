import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeAuthenticatedGETRequest } from '../utils/ServerHelper';

const Cart = ({ closeModal }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  //get current user id
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/auth/current-user");
        setUserId(response._id);
      } catch (error) {
        console.error("Error fetching current user: ", error.message);
      }
    };

    getUser();
  }, [userId]); // Add userId as a dependency here

  // Function to get all food items from local storage
  
  const getFoodItemsFromLocalstorage = () => {
    if (userId == null) {
      return [];
    }

    const userKey = `foodItems_${userId}`;
    const storedData = localStorage.getItem(userKey);

    return JSON.parse(storedData) || [];
  };

  // Function to remove a food item from local storage
  const removeFoodItem = (index) => {
    const updatedFoodItems = getFoodItemsFromLocalstorage();
    updatedFoodItems.splice(index, 1);
    const userKey = `foodItems_${userId}`;
    localStorage.setItem(userKey, JSON.stringify(updatedFoodItems));
  };

  // Example usage
  const allFoodItems = getFoodItemsFromLocalstorage();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-10 flex justify-center items-center"
      onClick={closeModal}
    >
      <div
        className="bg-black text-gray-400 bg-opacity-90 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-md border border-yellow-500 p-4 md:p-8 overflow-auto text-sm md:text-base lg:text-lg xl:text-xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-yellow-500 mb-4 font-semibold text-base md:text-lg lg:text-xl xl:text-2xl">
          YOUR CART
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <ul className="space-y-4 w-full">
            {Array.isArray(allFoodItems) && allFoodItems.length === 0 && (
              <div className='text-lg font-semibold'>Cart is Empty</div>
            )}
            {Array.isArray(allFoodItems) && allFoodItems.length > 0 && (
              <React.Fragment>
                {allFoodItems.map((foodItem, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-yellow-600 p-4 bg-black border border-yellow-500 border-2 rounded-md shadow-md"
                  >
                    <div className="w-2/3 text-sm flex">
                      <div className='w-1/2 mr-4'>
                        <img src={foodItem.image} alt="image" className='w-32 h-32' />
                      </div>
                      <div className='w-full'>
                        <strong className="text-lg font-semibold">
                          {foodItem.title}
                        </strong>
                        <p>Quantity: {foodItem.quantity}</p>
                        <p>Size: {foodItem.selectedSize}</p>
                        <p>Price: {foodItem.price}</p>
                      </div>
                    </div>
                    <button
                      className="bg-yellow-500 text-black px-3 py-1 rounded-md hover:bg-yellow-700"
                      onClick={() => removeFoodItem(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
                <button
                  className="bg-black text-yellow-500 border border-yellow-500 border-2 px-3 py-2 rounded-md hover:text-yellow-700"
                  onClick={() => {
                    navigate("/checkout");
                  }}
                >
                  Proceed To Checkout
                </button>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
