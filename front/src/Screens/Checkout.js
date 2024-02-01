import LoggedInContainer from "../Container/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import { useState, useEffect } from "react";
import Textfield from "../Components/Textfield";
import CheckoutModel from "../Models/CheckoutModel";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaBiking } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";

const Checkout = () => {
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [location, setLocation] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [checkoutModel, setCheckoutModel] = useState(false);
  const [TotalPrice, setTotalPrice] = useState(null);
  const [OrderPrice, setOrderPrice] = useState(null);

  //get current user id
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          "/auth/current-user"
        );
        setUserId(response._id);
        setUserEmail(response.email);
        setUserName(response.name);
        console.log(response.name);
      } catch (error) {
        console.error("Error fetching current user: ", error.message);
      }
    };

    getUser();
  }, [userId]); // Add userId as a dependency here

  //cart items
  const getFoodItemsFromLocalstorage = () => {
    if (userId == null) {
      return [];
    }

    const userKey = `foodItems_${userId}`;
    const storedData = localStorage.getItem(userKey);

    return JSON.parse(storedData) || [];
  };

  const allFoodItems = getFoodItemsFromLocalstorage();

  //totalprice
  useEffect(() => {
    const getTotalPrice = () => {
      let totalPrice = 300;
      let orderitemPrice = 0;
      for (const item of allFoodItems) {
        totalPrice += item.price;
        orderitemPrice += item.price;
      }
      console.log(totalPrice);
      setTotalPrice(totalPrice);
      setOrderPrice(orderitemPrice);
    };

    getTotalPrice();
  }, [allFoodItems, setTotalPrice, setOrderPrice]);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const address = response.data.display_name; // Extract the address from the response
      return address;
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  };

  return (
    <div className="bg-black">
      <LoggedInContainer currentActiveScreen={"checkout"}>
        {/* left box */}
        <div className="flex flex-col md:flex-row text-white m-3">
          <div className="w-full md:w-1/2 lg:w-2/3 m-3 p-4 bg-black border border-yellow-400 border-2">
            <h1 className="text-2xl font-bold">Your information</h1>
            <div className="black mt-6">
              <div className="flex bg-black border border-yellow-400">
                <div className="pt-3 pl-3">
                  <MdDriveFileRenameOutline
                    style={{ color: "yellow", size: 2 }}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <p className="w-1/2 p-2">{userName}</p>
                  <select className="bg-black border my-3 border-yellow-500 text-yellow-500">
                    <option className="bg-black border border-yellow-500 text-yellow-500">
                      Cash On Delivery
                    </option>
                  </select>
                </div>
                <div className="flex">
                  <div className="m-3 ">
                    {"   "}
                    <IoCall style={{ color: "yellow", size: 30 }} />
                  </div>
                  <div className="m-2 flex">
                    <Textfield
                      label={"Phone Number"}
                      placeholder={"Enter your phone number"}
                      value={phoneNumber}
                      setValue={setPhoneNumber}
                      className={"my-1"}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2nd one */}
            <div className="black mt-6">
              <div className="bg-black border border-yellow-400 flex">
                <div className="mt-6 p-3">
                  <FaBiking style={{ color: "yellow", fontSize: "2em" }} />
                </div>

                <div className="flex flex-col">
                  <p className="w-full p-2 font-bold">Delivery from</p>
                  <p className="w-full p-2">MUNCHIFY , Saddar Rawalpindi.</p>
                </div>
              </div>
            </div>
            <div></div>
            {checkoutModel && (
              <CheckoutModel
                closeModal={() => {
                  setCheckoutModel(false);
                }}
                location={location}
                userEmail={userEmail}
                phoneNumber={phoneNumber}
                allFoodItems={allFoodItems}
                TotalPrice={TotalPrice}
              />
            )}
            {/* 3rd one */}
            <div className="black mt-6 ">
              <div className="bg-black border border-yellow-400 ">
                <p className="w-1/2 p-2 font-bold text-2xl">
                  We'll deliver your order here
                </p>
                <p
                  className="bg-black rounded-full border border-yellow-500 w-1/3 p-2 m-2 text-center text-yellow-500 cursor-pointer"
                  onClick={() => {
                    if ("geolocation" in navigator) {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const { latitude, longitude } = position.coords;
                          console.log("Latitude:", latitude);
                          console.log("Longitude:", longitude);
                          reverseGeocode(latitude, longitude)
                      .then((address) => {
                        console.log("Address:", address);
                        setLocation(address);
                        console.log(location);
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                      });
                          // You can use latitude and longitude to fetch more location-specific data or perform other actions
                        },
                        (error) => {
                          console.error(
                            "Error getting user location:",
                            error.message
                          );
                        }
                      );
                    } else {
                      console.log(
                        "Geolocation is not supported by this browser."
                      );
                    }
                  }}
                >
                  Add Current Location
                </p>

                <div className="flex">
                  <div className="pt-2 pl-2 pr-1 pb-4 mt-1">
                    {" "}
                    <FaLocationDot style={{ color: "yellow" }} />
                  </div>

                  <iframe
                    title="Location"
                    width="700"
                    height="150"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;color=black&amp;height=200&amp;hl=en&amp;q=MCS%20NUST%20,%20Rawalpindi%20,%20Pakistan+(Munchify)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  >
                    <a href="https://www.maps.ie/population/">
                      Population Estimator map
                    </a>
                  </iframe>
                </div>

                <p className="text-center mt-6">OR...</p>

                <div className="m-2 mt-5">
                  <p className="text-center">
                    You can enter your Address here{" "}
                  </p>
                </div>

                <div className="m-2 text-black p-3">
                  <textarea
                    className="resize-none border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 bg-black text-gray-400 w-full"
                    placeholder="Enter your address..."
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      console.log(location);
                    }}
                  ></textarea>
                </div>
              </div>
              <p className="text-yellow-400 p-2 text-center font-bold text-xl mt-7">
                Thank you for choosing MUNCHIFY!
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 m-3 p-4 bg-black border border-yellow-400 border-2">
            <h1 className="text-2xl font-bold">Order summary</h1>
            <div className="black mt-6">
              <div className="bg-black border border-yellow-400 text-white">
                <p className="w-1/2 mx-auto p-2 font-bold text-2xl text-center">
                  Your order
                </p>
                <p className="w-full mx-auto p-2 m-2 text-center bg-yellow-400">
                  <div className="space-y-4 flex flex-col justify-center items-center">
                    <ul className="space-y-2 w-full">
                      {Array.isArray(allFoodItems) &&
                        allFoodItems.length === 0 && (
                          <div className="text-lg font-semibold">
                            Cart is Empty
                          </div>
                        )}
                      {Array.isArray(allFoodItems) &&
                        allFoodItems.length > 0 && (
                          <React.Fragment>
                            {allFoodItems.map((foodItem, index) => (
                              <li
                                key={index}
                                className="flex justify-between items-center text-yellow-600 p-2 bg-black border border-yellow-500 rounded-md shadow-md"
                              >
                                <div className="w-2/3 text-sm flex">
                                  <div className="w-full mr-5">
                                    <img
                                      src={foodItem.image}
                                      alt="image"
                                      className="h-20 mt-5"
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
                </p>
              </div>
            </div>

            {/* 2nd one */}

            <div className="black mt-6">
              <div className="bg-black border border-yellow-400 text-white">
                <p className="w-1/2 mx-auto p-2 font-bold text-2xl text-center">
                  Your Bill
                </p>

                <div className="flex ">
                  <p className="m-2 w-1/2">Order Charges : </p>
                  <p className="m-2 w-1/2 jtext-right">Rs {OrderPrice}</p>
                </div>

                <div className="flex ">
                  <p className="m-2 w-1/2">Delivery Charges : </p>
                  <p className="m-2 w-1/2 jtext-right">Rs 300</p>
                </div>

                <p className="m-2 border-t-2 border-yellow-400 p-2 text-center font-bold">
                  Total :
                </p>
                <p className="text-center">Rs {TotalPrice}</p>

                <div className="p-4 text-center">
                  <button
                    className="bg-yellow-400 p-2 text-black"
                    onClick={() => {
                      setCheckoutModel(true);
                      console.log("true");
                    }}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoggedInContainer>
    </div>
  );
};

export default Checkout;
