import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import DishesCard from "../Components/DishesCard";
import { useState } from "react";
import Cart from "../Models/Cart";
import ViewOrders from "../Models/ViewOrders";

const LoggedInContainer = ({ children, currentActiveScreen }) => {
  // useStates
  const [cartOpen, setCartOpen] = useState(false);
  const [OrderModels, setOrderModels] = useState(false);

  //logout function
  const logOut = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <div>
      {/* //Navbar */}
      <nav className="bg-black border-b border-yellow-500 p-4 z-10 relative">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white">
            <Link to="/home">
              <div className="flex">
                <Icon icon="cib:medium-m" color="#ffc500" width="50" />
                <div className="font-semibold text-xl mt-3">unchify</div>
              </div>
            </Link>
          </div>
          <div className="flex space-x-4 mx-5">
            <div className="bg-yellow-500 cursor-pointer text-black px-4 py-2 hover:scale-105 transition-transform">
              <div
                className="text-black font-bold"
                onClick={() => {
                  setOrderModels(true);
                }}
              >
                Orders
              </div>
            </div>
            <div className="bg-yellow-500 cursor-pointer text-black px-4 py-2 hover:scale-105 transition-transform">
              <div
                className="text-black font-bold"
                onClick={() => {
                  setCartOpen(true);
                }}
              >
                Cart
              </div>
            </div>
            <div className="bg-yellow-500 cursor-pointer text-black px-4 py-2 hover:scale-105 transition-transform">
              <div className="text-black font-bold" onClick={logOut}>
                LOG OUT
              </div>
            </div>
          </div>
        </div>
      </nav>
      {cartOpen && (
        <Cart
          closeModal={() => {
            setCartOpen(false);
          }}
        />
      )}
      {OrderModels && (
        <ViewOrders
          closeModal={() => {
            setOrderModels(false);
          }}
        />
      )}
      {children}
      <Footer />
    </div>
  );
};
export default LoggedInContainer;
