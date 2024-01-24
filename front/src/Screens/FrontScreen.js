import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Front from "../Components/Front";
import Search from '../Components/Search';
import Carousel from "../Components/Carousel";
import MainHeader from "../Components/MainHeader";
import About from "../Components/About";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const FrontScreen = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar about={"#about"} contacts={"#contacts"}/>
      <Search/>
      <div className="bg-black w-full">
      <Carousel />
      <MainHeader/>
      <Front onClick={()=>{
        navigate("/login");
      }}/>
      <About id="about"/>
      <Footer id="contacts"/>
      </div>
    </div>
  );
};
export default FrontScreen;
