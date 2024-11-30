import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchResults([]); // Clear results if the search query is empty
      return;
    }

    console.log("Search Query Sent to Backend:", searchQuery);

    try {
      // Send request to search for books based on the query
      const response = await axios.get(
        `http://localhost:5000/api/search?query=${encodeURIComponent(searchQuery)}`
      );
      console.log("Search Results:", response.data);
      setSearchResults(response.data); // Update search results
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      console.error("Error searching for books:", error);
      setErrorMessage("An error occurred while searching. Please try again.");
    }
  };

  const getBookRoute = (genre, id) => {
    if (genre && genre.toLowerCase() === "non-fiction") {
      return `/nonfiction/${id}`; // Non-Fiction route
    }
    return `/books/${id}`; // Fiction route
  };

  return (
    <div className="relative">
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-full focus:outline-none focus:ring focus:ring-blue-300"
          autoComplete="off"
        />
        <button
          type="submit"
          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </form>

      {/* Error Message */}
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}

      {/* Search Results Dropdown */}
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg">
          {searchResults.map((result) => (
            <Link
              key={result._id}
              to={getBookRoute(result.genre, result._id)}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              onClick={() => {
                setSearchQuery(""); // Clear search query on click
                setSearchResults([]); // Clear search results on click
              }}
            >
              {result.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
