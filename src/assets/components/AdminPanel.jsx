import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AdminPanel = () => {
  const [books, setBooks] = useState([]); // Fiction books
  const [nonfictionBooks, setNonfictionBooks] = useState([]); // Non-fiction books

  const [newBook, setNewBook] = useState({ title: "", description: "", genre: "fiction", available: true }); // Add Book Form
  const [newNonfictionBook, setNewNonfictionBook] = useState({ title: "", description: "", available: true }); // Add Non-Fiction Book Form
  const [statistics, setStatistics] = useState({
    userCount: 0,
    totalBooks: 0,
    borrowedBooks: 0,
    mostPopularBooks: [],
  });
  const [authError, setAuthError] = useState(false); // State to track if the user is authenticated

  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token")); // Use state to handle token

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        console.error("No token found. Redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        // Decode and validate token
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // Log to verify payload
        const isExpired = Date.now() >= decodedToken.exp * 1000;

        if (isExpired) {
          console.error("Token expired. Redirecting to login...");
          setAuthError(true);
          setTimeout(() => navigate("/login"), 500); // Small delay for a smoother experience
          return;
        }

        if (decodedToken.role !== "admin") {
          console.error("User is not an admin. Redirecting to home...");
          navigate("/");
          return;
        }

        // Proceed to fetch data if authenticated
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:5000/admin/statistics", {
              headers: {
                Authorization: `Bearer ${token}`, // Add token to Authorization header
              },
            });

            setBooks(response.data.books);
            setNonfictionBooks(response.data.nonfictionBooks);
            setStatistics({
              totalBooks: response.data.totalBooks,
              totalUsers: response.data.totalUsers,
            });
          } catch (error) {
            console.error("Error fetching dashboard data:", error.response || error);
            setAuthError(true);
            setTimeout(() => navigate("/login"), 500); // Small delay for a smoother experience
          }
        };

        fetchData();
      } catch (error) {
        console.error("Token decoding or validation error:", error);
        setAuthError(true);
        setTimeout(() => navigate("/login"), 500); // Small delay for a smoother experience
      }
    };

    checkAuth(); // Run the authentication check
  }, [token, navigate]); // Depend on token and navigate

  // Handle Add Book (Fiction)
  const handleAddBook = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/books", newBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks((prevBooks) => [...prevBooks, response.data]); // Update books list
      setNewBook({ title: "", description: "", genre: "fiction", available: true, author: "", image:"",  pdfUrl:"" }); // Reset form
    } catch (error) {
      console.error("Error adding book:", error.response || error);
    }
  };

  // Handle Add Non-Fiction Book
  const handleAddNonfictionBook = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/nonfiction", newNonfictionBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNonfictionBooks((prevBooks) => [...prevBooks, response.data]); // Update non-fiction books list
      setNewNonfictionBook({ title: "", description: "", available: true,  genre: "Non-Fiction", author: "", image:"",  pdfUrl:"" }); // Reset form
    } catch (error) {
      console.error("Error adding non-fiction book:", error.response || error);
    }
  };

  // Handle Delete Book (Fiction)
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id)); // Update books list
    } catch (error) {
      console.error("Error deleting book:", error.response || error);
    }
  };

  // Handle Delete Non-Fiction Book
  const handleDeleteNonfictionBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/nonfiction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNonfictionBooks((prevBooks) => prevBooks.filter((book) => book._id !== id)); // Update non-fiction books list
    } catch (error) {
      console.error("Error deleting non-fiction book:", error.response || error);
    }
  };

  // Handle Delete User
  
  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); // Clear token in state
    navigate("/login");
  };

  if (authError) {
    return <div>Authentication Error. Please log in again.</div>;
  }

  return (
    <div className="bg-red-300 flex relative">
    <div className="p-10 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
  
      {/* Logout Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
        onClick={handleLogout}>
        Logout
      </button>
  
      {/* Statistics Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Statistics</h2>
        <p className="text-lg">
          Total Books: <span className="font-bold">{statistics.totalBooks}</span>
        </p>
        <p className="text-lg">
          Total Users: <span className="font-bold">{statistics.totalUsers}</span>
        </p>
      </div>
  
      {/* Books Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Books</h2>
  
        {/* Fiction Books */}
        <div className="mb-4">
          {books && books.length > 0 ? (
            books.map((book) => (
              <div key={book._id} className="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.description}</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                  onClick={() => handleDeleteBook(book._id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No books available</p>
          )}
        </div>
  
        {/* Non-Fiction Books */}
        <div>
          <h3 className="text-xl font-semibold">Non-Fiction Books</h3>
          {nonfictionBooks && nonfictionBooks.length > 0 ? (
            nonfictionBooks.map((book) => (
              <div key={book._id} className="bg-gray-100 p-4 mb-4 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold">{book.title}</h3>
                <p className="text-gray-600">{book.description}</p>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
                  onClick={() => handleDeleteNonfictionBook(book._id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No non-fiction books available</p>
          )}
        </div>
      </div>
  
      {/* Add Book Forms */}
      <div className="mb-8">
        {/* Add Fiction Book Form */}
        <h3 className="text-xl font-semibold">Add Book (Fiction)</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md mt-5"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newBook.image}
            onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Description"
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="PDF URL"
            value={newBook.pdf}
            onChange={(e) => setNewBook({ ...newBook, pdf: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleAddBook}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Add Book
          </button>
        </div>
      </div>
  
      {/* Add Non-Fiction Book Form */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Add Non-Fiction Book</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newNonfictionBook.title}
            onChange={(e) =>
              setNewNonfictionBook({ ...newNonfictionBook, title: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md mt-5"
          />
          <input
            type="text"
            placeholder="Author"
            value={newNonfictionBook.author}
            onChange={(e) =>
              setNewNonfictionBook({ ...newNonfictionBook, author: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newNonfictionBook.image}
            onChange={(e) =>
              setNewNonfictionBook({ ...newNonfictionBook, image: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Description"
            value={newNonfictionBook.description}
            onChange={(e) =>
              setNewNonfictionBook({ ...newNonfictionBook, description: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="PDF URL"
            value={newNonfictionBook.pdf}
            onChange={(e) =>
              setNewNonfictionBook({ ...newNonfictionBook, pdf: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleAddNonfictionBook}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Add Non-Fiction Book
          </button>
        </div>
      </div>
    </div>
  </div>
  
  
  );
};

export default AdminPanel;





