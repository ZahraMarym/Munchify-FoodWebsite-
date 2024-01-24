import { FaGithubSquare, FaFacebookSquare, FaTwitterSquare, FaInstagram } from 'react-icons/fa';
const Footer = ({id}) =>{
    return (
        <div id={id}>
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
    );
};
export default Footer;