import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";


const Navbar = ({about, contacts}) => {


  return (
    <nav className="bg-black border-b border-yellow-500 p-4 z-10 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white">
          <div className="flex">
            <Icon icon="cib:medium-m" color="#ffc500" width="50" />
            <div className="font-semibold text-xl mt-3">unchify</div>
          </div>
        </div>
        <div className="flex space-x-4 mx-5">
          <div className="border-b mr-1 text-lg border-yellow-500 hover:text-yellow-500 hover:scale-105 transition-transform">
            <Link to="/" className="text-white hover:text-yellow-500">
              Home
            </Link>
          </div>

          <div className="border-b mr-6 text-lg border-yellow-500 hover:scale-105 transition-transform">
            <a href={about} className="text-white hover:text-yellow-500">
              About
            </a>
          </div>
          <div className="border-b mr-5 text-lg border-yellow-500 hover:scale-105 transition-transform">
            <a href={contacts} className="text-white hover:text-yellow-500">
              Contact
            </a>
          </div>
          <div className="bg-yellow-500 cursor-pointer text-black px-4 py-2 hover:scale-105 transition-transform">
              <Link to="/login" className="text-black font-bold">
              LOG IN
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
