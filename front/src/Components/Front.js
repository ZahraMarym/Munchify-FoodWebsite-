import { Icon } from "@iconify/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import S1 from "../Images/S1.jpg";
import S2 from "../Images/S2.jpg";
import S3 from "../Images/S3.jpg";
import S4 from "../Images/S4.jpg";
import S5 from "../Images/S5.jpg";
import S6 from "../Images/S6.jpg";
import S7 from "../Images/S7.jpg";
import S8 from "../Images/S8.jpg";
import Card from "./Card";
import { FaGithubSquare, FaFacebookSquare, FaTwitterSquare, FaInstagram } from 'react-icons/fa';


const Front = () => {
  //slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500, // Adjust this value to control the autoplay speed in milliseconds
  };

  //card
    const cards = [
      {
        image: S1,
        title: 'Card 1',
        description: 'This is the description for card 1.',
      },
      {
        image: S2,
        title: 'Card 2',
        description: 'This is the description for card 2.',
      },
      {
        image: S3,
        title: 'Card 3',
        description: 'This is the description for card 3.',
      },
    ];

  //images for carousel
  const images = [S1, S2, S3, S4, S5, S6, S7, S8];

  return (
    <div className="bg-black w-full">
      {/* //navbar */}
      <nav className="bg-black border-b border-yellow-500 p-4 z-10 relative">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white">
            <div className="flex">
              <Icon icon="cib:medium-m" color="#ffc500" width="45" />
              <div className="font-semibold text-lg mt-3">unchify</div>
            </div>
          </div>
          <div className="flex space-x-4 mx-5">
            <div className="border-b mr-1 text-lg border-yellow-500 hover:text-yellow-500 hover:scale-105 transition-transform">
              <a href="/" className="text-white hover:text-yellow-500">
                Home
              </a>
            </div>

            <div className="border-b mr-6 text-lg border-yellow-500  hover:scale-105 transition-transform ">
              <a href="/" className="text-white hover:text-yellow-500">
                About
              </a>
            </div>
            <div className="border-b mr-5 text-lg border-yellow-500 hover:scale-105 transition-transform ">
              <a href="/" className="text-white hover:text-yellow-500">
                Contact
              </a>
            </div>
            <div className="bg-yellow-500 mx-5 px-4 py-2 hover:scale-105 transition-transform">
              <a href="/" className="text-white">
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* carousel */}
      <div className="relative">
      <h1 className="font-serif capitalize ml-6 md:ml-20 mt-24 font-extrabold absolute text-4xl md:text-7xl w-full text-yellow-500 lg:w-1/3 z-10 opacity-100">
        Indulge in a culinary journey where every bite tells a story
      </h1>
      <div className="flex items-center justify-center h-screen">
        <Slider {...settings} className="w-11/12 sm:w-3/4 md:w-2/3 lg:w-3/4">
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="relative h-full flex flex-col opacity-50"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
      {/* Heading */}
      <div className="flex flex-col font-mono justify-center items-center w-full p-10">
        <div className="font-familyfont-bold items-center text-4xl text-yellow-500 mt-5 p-5 ">MUNCHIFY, The Best Food In Town</div>
        <div className="text-yellow-500 w-2/3 text-lg">
        Delight your taste buds with our exquisite dishes,
          crafted with passion and the finest ingredients. At MUNCHIFY, we believe in creating memorable dining experiences that go
          beyond just a meal.<br/>Explore a menu that blends tradition with innovation, offering a
          diverse range of flavors to satisfy every palate. From hearty classics
          to contemporary delights, our chefs prepare each dish with precision
          and care.
        </div>
      </div>
      
      {/* cuisines */}
      <div>
      <div className="flex flex-wrap justify-center">
      {cards.map((card, index) => (
        <Card key={index} {...card} className="border text-black transition-color duration-500 border-yellow-500 p-2 bg-yellow-500 border-2 text-black hover:bg-black hover:text-yellow-500"/>
      ))}
    </div>
      </div>
      
      {/* //About */}
      <section className="py-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-2/3 pr-8 mb-8">
            <h2 className="text-4xl font-extrabold text-yellow-600 mb-4">
              About Us
            </h2>
            <p className="text-gray-300 leading-loose">
              Welcome to Munchify, where culinary excellence meets
              a delightful dining experience. Our passion for food drives us to
              create dishes that not only satisfy your taste buds but also tell a
              unique story.
            </p>
            <p className="text-gray-300 leading-loose mt-4">
              At Munchify, we source the finest ingredients,
              combining flavors to craft exceptional dishes. Whether you're a
              connoisseur or just exploring, our menu offers a variety of options
              to suit every palate.
            </p>
          </div>
          <div className=" md:w-1/4 justify-center ml-40">
            {/* Add an image or any other visual elements here */}
            <Icon icon="cib:medium-m" color="#ffc500" width="100" className="border-4 p-5 border border-yellow-500"/>
          </div>
        </div>
      </div>
    </section>

      {/* //footer */}
      {/* 
      footer */}

<div id="contacts">
        <div className="w-full mx-auto py-16 px-4 grid lg:grid-cols-3 border-t border-yellow-400 gap-8 text-yellow-400 bg-black">
          <div>
            <h1 className="w-full text-3xl font-bold text-yellow-500">
              Munchify
            </h1>
            <p className="py-4">
            Indulge in a culinary journey where every bite tells a story.
            </p>
            <div className="flex justify-between md:w-[75%] my-6">
              <a href="https://github.com/ZahraMarym">
                <FaGithubSquare size={30} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100072811640476">
                <FaFacebookSquare size={30} />
              </a>
              <a href="https://twitter.com/ZahraMa50274393">
                <FaTwitterSquare size={30} />
              </a>
              <a href="https://www.instagram.com/its_zahramarym115/">
                <FaInstagram size={30} />
              </a>
            </div>
          </div>
          <div className="lg:col-span-3 flex justify-between mt-6">
            <div>
              <h2 className="font-medium text-gray-400">Solutions</h2>
              <ul>
                <li className="py-2 text-sm">Analytics</li>
                <li className="py-2 text-sm">Marketing</li>
                <li className="py-2 text-sm">Commerce</li>
                <li className="py-2 text-sm">Insights</li>
              </ul>
            </div>
            <div>
              <h2 className="font-medium text-gray-400">Support</h2>
              <ul>
                <li className="py-2 text-sm">Pricing</li>
                <li className="py-2 text-sm">Documentation</li>
                <li className="py-2 text-sm">Guides</li>
                <li className="py-2 text-sm">API Status</li>
              </ul>
            </div>
            <div>
              <h2 className="font-medium text-gray-400">Company</h2>
              <ul>
                <li className="py-2 text-sm">About</li>
                <li className="py-2 text-sm">Blog</li>
                <li className="py-2 text-sm">Jobs</li>
                <li className="py-2 text-sm">Press</li>
                <li className="py-2 text-sm">Careers</li>
              </ul>
            </div>
            <div>
              <h2 className="font-medium text-gray-400">Legal</h2>
              <ul>
                <li className="py-2 text-sm">Claim</li>
                <li className="py-2 text-sm">Policy</li>
                <li className="py-2 text-sm">Terms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Front;
