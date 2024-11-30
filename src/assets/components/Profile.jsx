import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    borrowedBooksCount: 0,
    recentlyBorrowed: false,
  });
  const [profileImage, setProfileImage] = useState(null); // For the new image
  const [previewImage, setPreviewImage] = useState(null); // For the preview
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('No token found, please log in.');
      navigate('/login');
      return;
    }
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const data = await response.json();
        setUserData(data);
  
        // Check if the user is a regular user
        if (data.role === 'user') {
          // Calculate borrowed books count and recent borrowing status for regular users
          const borrowedBooksCount = data.borrowedBooks?.length || 0;
          let recentlyBorrowed = false;
          if (data.borrowedBooks && data.borrowedBooks.length > 0) {
            const lastBorrowed = new Date(data.borrowedBooks[data.borrowedBooks.length - 1].borrowedDate);
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            recentlyBorrowed = lastBorrowed >= oneWeekAgo;
          }
  
          // Update the state with the user's borrowed book data
          setUpdatedData({
            borrowedBooksCount,
            recentlyBorrowed,
          });
        }
  
        // Optionally handle the case if the role is not 'user' (e.g., for 'admin' or other roles)
        else {
          // Handle logic for admins or other roles if needed (you can return early here)
          console.log('User is not a regular user');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Could not load user data. Please try again.');
      }
    };
  
    fetchUserData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && userData) {
      setUpdatedData({
        borrowedBooksCount: userData.borrowedBooksCount || 0,
        recentlyBorrowed: userData.recentlyBorrowed || false,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setUpdatedData({
        ...updatedData,
        [name]: checked, // If it's a checkbox, use checked value
      });
    } else {
      setUpdatedData({
        ...updatedData,
        [name]: value, // For other inputs, use the value
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // Save the file for upload
      setPreviewImage(URL.createObjectURL(file)); // Show a preview
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      if (profileImage) {
        formData.append('profilePicture', profileImage); // Add image to formData
      }

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Send formData instead of JSON
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setUserData(data.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Could not update profile.');
    }
  };

  if (error) return <div className="text-red-500">{error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Profile</h1>
    <div className="bg-white shadow-md rounded-lg p-6">
      <img
        src={previewImage || userData.profilePicture || 'https://via.placeholder.com/100'}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4"
      />
      {isEditing ? (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="borrowedBooksCount"
            value={updatedData.borrowedBooksCount}
            onChange={handleInputChange}
            placeholder="Books Borrowed"
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          {/* Add the checkbox for "Recently Borrowed" here */}
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              name="recentlyBorrowed"
              checked={updatedData.recentlyBorrowed}
              onChange={handleInputChange} // Use handleInputChange here
              className="mr-2"
            />
            Recently Borrowed
          </div>
          <input
            type="number"
            name="followersCount"
            value={updatedData.followersCount}
            onChange={handleInputChange}
            placeholder="Followers"
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="followingCount"
            value={updatedData.followingCount}
            onChange={handleInputChange}
            placeholder="Following"
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleProfileUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Books Borrowed:</strong> {updatedData.borrowedBooksCount}</p>
          <p><strong>Recent Borrowing:</strong> {updatedData.recentlyBorrowed ? 'Yes' : 'No'}</p>
          <button
            onClick={handleEditToggle}
            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Logout
      </button>
    </div>
  </div>
  
  );
};

export default Profile;







