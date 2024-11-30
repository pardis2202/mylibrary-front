import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user details by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [userId]);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle save
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/user/${userId}`, user);
      alert("User details updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="user-details">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      {user ? (
        <div className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block font-semibold mb-2">Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                isEditing ? "border-blue-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                isEditing ? "border-blue-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Role:</label>
            <select
              name="role"
              value={user.role}
              disabled={!isEditing}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded ${
                isEditing ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-between mt-6">
            {isEditing ? (
              <>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/admin")}
            >
              Back to Admin Panel
            </button>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetails;
