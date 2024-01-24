import { Icon } from "@iconify/react";
const About = ({id}) =>{
    return (
        <div>
            <section className="py-16" id={id}>
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-2/3 pr-8 mb-8">
              <h2 className="text-4xl font-extrabold text-yellow-600 mb-4">
                About Us
              </h2>
              <p className="text-gray-300 leading-loose">
                Welcome to Munchify, where culinary excellence meets a
                delightful dining experience. Our passion for food drives us to
                create dishes that not only satisfy your taste buds but also
                tell a unique story.
              </p>
              <p className="text-gray-300 leading-loose mt-4">
                At Munchify, we source the finest ingredients, combining flavors
                to craft exceptional dishes. Whether you're a connoisseur or
                just exploring, our menu offers a variety of options to suit
                every palate.
              </p>
            </div>
            <div className=" md:w-1/4 justify-center ml-40">
              {/* Add an image or any other visual elements here */}
              <Icon
                icon="cib:medium-m"
                color="#ffc500"
                width="100"
                className="border-4 p-5 border border-yellow-500"
              />
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};
export default About;