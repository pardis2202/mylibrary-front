import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; // Adjust this number based on your requirement

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        // Replace the URL with your backend API endpoint
        const response = await axios.get(`http://localhost:5000/api/books?page=${currentPage}&limit=${itemsPerPage}`);

        // Assuming your backend response includes `books` and `totalPages`
        setBooks(response.data.books);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex min-h-full bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to Our Library</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Browse our collection of books available for borrowing. Explore a variety of genres, from timeless classics to modern bestsellers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                className="w-full h-[700px] object-cover"
                src={book.image || "https://via.placeholder.com/150"} // Use default image if none is provided
                alt={book.title}
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
                <p className="text-gray-600 text-sm mb-2">By {book.author}</p>
                <p className="text-gray-600 mb-4">{book.description}</p>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    book.available ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                  }`}
                >
                  {book.available ? "Available" : "Not Available"}
                </span>
                <div className="mt-4">
                  <Link
                    to={`/books/${book._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded-md border px-4 py-2 bg-yellow-300 text-sm font-medium ${
              currentPage === 1 ? "text-gray-300" : "text-gray-700 hover:bg-yellow-200"
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span>
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`relative ml-3 inline-flex items-center rounded-md border bg-green-400 px-4 py-2 text-sm font-medium ${
              currentPage === totalPages ? "text-gray-300" : "text-gray-700 hover:bg-green-300"
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;





