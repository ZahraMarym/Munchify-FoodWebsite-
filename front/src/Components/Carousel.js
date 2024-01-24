import S1 from "../Images/S1.jpg";
import S2 from "../Images/S2.jpg";
import S3 from "../Images/S3.jpg";
import S4 from "../Images/S4.jpg";
import S5 from "../Images/S5.jpg";
import S6 from "../Images/S6.jpg";
import S7 from "../Images/S7.jpg";
import S8 from "../Images/S8.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Carousel = () =>{

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


  //images for carousel
  const images = [S1, S2, S3, S4, S5, S6, S7, S8];

    return (
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
    );
};
export default Carousel;