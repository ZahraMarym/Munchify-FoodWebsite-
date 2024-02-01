import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../utils/ServerHelper";
import {makeAuthenticatedPOSTRequest} from "../utils/ServerHelper";

const ViewOrders = ({ closeModal }) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [deleiverdItems, setDeleiverdItems] = useState([]);
  const [inProgressItems, setInProgressItems] = useState([]);

  //get current user id
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          "/auth/current-user"
        );
        setUserEmail(response.email);
      } catch (error) {
        console.error("Error fetching current user: ", error.message);
      }
    };

    getUser();
  }, [userEmail]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/Order/delivered");
        setDeleiverdItems(response);
      } catch (error) {
        console.error("Error fetching current user: ", error.message);
      }
    };

    getData();
  }, [deleiverdItems]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          "/Order/in-progress"
        );
        setInProgressItems(response);
      } catch (error) {
        console.error("Error fetching current user: ", error.message);
      }
    };

    getData();
  }, [inProgressItems]);

  const Cancel = async(id) =>{
    try {
      const response = await makeAuthenticatedPOSTRequest(
        "/Order/cancelOrder/"+id
      );
      alert("Success", "Your order has been cancelled :(");
      navigate("/home");
    } catch (error) {
      console.error("Error fetching current user: ", error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-10 flex justify-center items-center" onClick={closeModal}>
      <div className="bg-black text-gray-400 bg-opacity-90 w-full md:w-2/3 lg:w-1/2 xl:w-1/2 rounded-md border border-yellow-500 p-4 md:p-8 overflow-y-auto">
        <div className="text-yellow-500 mb-6 font-semibold text-lg text-center">Your Orders</div>
        
        <div className="space-y-8">
          <div className="w-full">
            <p className="text-yellow-500 font-bold border-b border-yellow-500 mb-2 pb-2">In Progress:</p>
            {inProgressItems.map((items) => (
              <div key={items._id} className="border p-4 mb-4 flex items-center justify-between">
                <OrderItems items={items} />
                <button className="bg-yellow-500 p-2 font-bold text-black" onClick={()=>{
                  Cancel(items._id);
                  console.log("Cancelled");
                }}>Cancel</button>
              </div>
            ))}
            {inProgressItems.length === 0 && <p className="text-lg font-semibold">No orders in progress</p>}
          </div>

          <div className="w-full">
            <p className="text-yellow-500 font-bold border-b border-yellow-500 mb-2 pb-2">Delivered:</p>
            {deleiverdItems.map((items) => (
              <div key={items._id} className="border p-4 mb-4">
                <OrderItems items={items} />
              </div>
            ))}
            {deleiverdItems.length === 0 && <p className="text-lg font-semibold">No delivered orders</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderItems = ({ items }) => {
  const date = new Date(items.createdAt);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <React.Fragment>
      {items.orderItems.map((orderitem) => (
        <div key={orderitem._id}>
          <p className="font-bold">{orderitem.title}</p>
          <p>Quantity: {orderitem.quantity}</p>
          <p>Price: {orderitem.price}</p>
          <p>Date: {formattedDate}</p>
        </div>
      ))}
    </React.Fragment>
  );
};

export default ViewOrders;
