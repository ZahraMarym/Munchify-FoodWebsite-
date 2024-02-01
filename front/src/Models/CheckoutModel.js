import React, { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import {useCookies} from "react-cookie";
import { makeAuthenticatedPOSTRequest } from "../utils/ServerHelper";
import { useNavigate } from "react-router-dom";




const CheckoutModel = ({ closeModal, userEmail, location, phoneNumber, allFoodItems, TotalPrice }) => {
  const [userId, setUserId] = useState(null);
  // const [TotalPrice, setTotalPrice]=useState(null);
  const [cookie, setCookie] = useCookies(["token"]);
  const [timerModel,setTimerModel] = useState(false);
  const navigate = useNavigate();


  //get current user id
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          "/auth/current-user"
        );
        setUserId(response._id);
      } catch (error) {
        console.error("Error fetching current user: ", error.message);
      }
    };

    getUser();
  }, [userId]); // Add userId as a dependency here

  //place order
  const placeOrder = async () => {
    const data = {
        "location":location,
        "email":userEmail,
        "phoneNumber":phoneNumber,
        "orderItems": allFoodItems,
        "totalPrice":TotalPrice
    };
    console.log(data);
    const response = await makeAuthenticatedPOSTRequest("/Order/placeOrder", data);
    if (response.error) {
      alert("Invalid Uplaod");
      return;
    }
    alert("Success");
  };


  return (
    
    <div
      className="fixed h-full inset-0 bg-black bg-opacity-70 flex z-10 justify-center items-center overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="bg-black text-gray-400 bg-opacity-90 w-full md:w-2/3 lg:w-2/3 xl:w-1/2 rounded-md border border-yellow-500 p-4 md:p-8 overflow-auto text-sm md:text-base lg:text-md xl:text-lg"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-yellow-500 mb-4 font-semibold text-base md:text-md lg:text-md xl:text-lg">
          YOUR CART
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <ul className="space-y-2 w-full">
            {Array.isArray(allFoodItems) && allFoodItems.length === 0 && (
              <div className="text-lg font-semibold">Cart is Empty</div>
            )}
            {Array.isArray(allFoodItems) && allFoodItems.length > 0 && (
              <React.Fragment>
                {allFoodItems.map((foodItem, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-yellow-600 p-2 bg-black border border-yellow-500 border-2 rounded-md shadow-md"
                  >
                    <div className="w-2/3 text-sm flex">
                      <div className="w-1/2 mr-5">
                        <img
                          src={foodItem.image}
                          alt="image"
                          className="w-24 h-24"
                        />
                      </div>
                      <div className="w-full">
                        <strong className="text-lg font-semibold">
                          {foodItem.title}
                        </strong>
                        <p>Quantity: {foodItem.quantity}</p>
                        <p>Size: {foodItem.selectedSize}</p>
                        <p>Price: {foodItem.price}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </React.Fragment>
            )}
          </ul>
        </div>
        <div className="w-full text-md">
        <table className="text-yellow-500">
  <tbody>
    <tr>
      <td style={{ textDecoration: 'none' }}><strong>Email:</strong></td>
      <td>{userEmail}</td>
    </tr>
    <tr>
      <td style={{ textDecoration: 'none' }}><strong>Location:</strong></td>
      <td>{location}</td>
    </tr>
    <tr>
      <td style={{ textDecoration: 'none' }}><strong>Phone Number:</strong></td>
      <td>{phoneNumber}</td>
    </tr>
    <tr>
      <td style={{ textDecoration: 'none' }}><strong>Payment Method:</strong></td>
      <td className="text-right">Cash on Delivery</td>
    </tr>
    <tr>
      <td style={{ textDecoration: 'none' }}><strong>Delievery Charges:</strong></td>
      <td className="text-right">300</td>
    </tr>
    <tr>
      <td style={{ textDecoration: 'none' }}><strong>Total Price:</strong></td>
      <td className="text-right">{TotalPrice}</td>
    </tr>
  </tbody>
</table>
        </div>
        <button
          className="bg-black text-yellow-500 border border-yellow-500 border-2 px-3 py-2 rounded-md hover:text-yellow-700"
          onClick={() => {
            placeOrder();
            localStorage.removeItem(`foodItems_${userId}`);
            navigate("/timer");
          }}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutModel;
