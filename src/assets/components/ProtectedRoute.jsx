import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      try {
        const response = await fetch("/api/protected-route", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result); // Set the data state with the result
        } else {
          setError("Unauthorized access or token expired.");
        }
      } catch (error) {
        setError("Error fetching protected data.",error);
      }
    };

    fetchProtectedData();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Protected Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ProtectedRoute;
