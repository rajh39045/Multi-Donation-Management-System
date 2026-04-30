import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            MultiDonate
          </h2>
          <p className="text-sm">
            Transparent and efficient multi-donation coordination platform.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li><NavLink to="/" className="hover:text-white">Home</NavLink></li>
            <li><NavLink to="/login" className="hover:text-white">Login</NavLink></li>
            <li><NavLink to="/register" className="hover:text-white">Register</NavLink></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm">
            <li>support@multidonate.com</li>
            <li>+91 7646061431</li>
            <li>Bihar, India</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} Multi Donation Coordination System.
        All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;