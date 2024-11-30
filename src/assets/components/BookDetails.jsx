import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const BookDetails = ({ loggedIn }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ user: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError('Book ID is missing.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${id}`);
        setBook(response.data);
        setComments(response.data.comments || []);
      } catch {
        return("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBorrowClick = async () => {
    if (!loggedIn) {
      navigate('/login');
    } else if (book.available && book.pdfUrl) {
      navigate('/pdfreader', { state: { pdfUrl: book.pdfUrl } });
    } else {
      alert('Book is not available.');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.user || !newComment.text) {
      alert('Please provide a name and comment.');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/books/${id}/comments`, newComment);
      setComments([...comments, response.data]);
      setNewComment({ user: '', text: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-yellow-100 min-h-screen p-6">
      <div className="max-w-lg mx-auto mt-6 p-6 bg-white rounded-lg shadow-sm">
        <img
          src={book.image || "https://via.placeholder.com/150"}
          alt={book.title}
          className="w-full h-100 object-cover rounded"
        />
        <h2 className="text-2xl font-bold mt-4">{book.title}</h2>
        <p className="text-gray-600 mt-2">{book.description}</p>
        <p className="text-gray-500 mt-2">Pages: {book.pages}</p>
        <p
          className={`mt-2 ${book.available ? "text-green-600" : "text-red-600"}`}
        >
          {book.available ? "Available" : "Not Available"}
        </p>

        <button
          onClick={handleBorrowClick}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          disabled={!book.available || !loggedIn}
        >
          {book.available ? (loggedIn ? "Borrow" : "Login to Borrow") : "Book Unavailable"}
        </button>

        {/* Comments Section */}
        <h3 className="text-lg font-semibold mt-6">Comments</h3>
        <ul className="mt-4">
          {comments.map((comment, index) => (
            <li key={index} className="border-b py-2">
              <p className="font-bold">{comment.user}</p>
              <p>{comment.text}</p>
              <span className="text-xs text-gray-400">{new Date(comment.date).toLocaleString()}</span>
            </li>
          ))}
        </ul>

        {/* Add Comment Form */}
        <form onSubmit={handleAddComment} className="mt-4">
          <input
            type="text"
            placeholder="Your Name"
            value={newComment.user}
            onChange={(e) => setNewComment({ ...newComment, user: e.target.value })}
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Your Comment"
            value={newComment.text}
            onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          ></textarea>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};
BookDetails.propTypes = {
  loggedIn: PropTypes.bool.isRequired, // Ensure loggedIn is a required boolean
};
export default BookDetails;



