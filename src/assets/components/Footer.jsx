import { Link } from 'react-router-dom';

const Footer = () => {
    // Scroll to top function
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scroll
      });
    };

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto flex justify-evenly">
        <div className="flex justify-between items-center gap-20">
          {/* Footer Left */}
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} Online Library. All rights reserved.</p>
          </div>

          {/* Footer Links */}
          <div className="space-x-6">
            <Link to="/about" className="text-gray-400 hover:text-white">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white">
              Contact
            </Link>
          </div>

          {/* Footer Social Media (Optional) */}
          <div className="space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i> {/* You can replace this with actual icons */}
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>

        </div>

             {/* Scroll to top button */}
             <button
            onClick={scrollToTop}
            className="mt-4 text-white hover:text-blue-500 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7-7-7 7"
              />
            </svg>
            <span className="block mt-2">Back to top</span>
          </button>
      </div>
    </footer>
  );
};

export default Footer;
