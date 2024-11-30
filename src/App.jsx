import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./assets/components/navbar";
import Home from "./assets/components/Home";
import About from "./assets/components/About";
import Contact from "./assets/components/Contact";
import NotFound from "./assets/components/NotFound";
import BookDetails from "./assets/components/BookDetails";
import Login from "./assets/components/Login";
import Signup from "./assets/components/Signup";
import Profile from "./assets/components/Profile";
import PDFReader from "./assets/components/PDFreader";
import Nonfiction from "./assets/components/NonFiction";
import NonFictionDetails from "./assets/components/NonFictionDetails";
import Articles from "./assets/components/Articles";
import SearchBar from "./assets/components/SearchBar";
import Footer from "./assets/components/Footer";
import AdminPanel from "./assets/components/AdminPanel";
import UserDetails from "./assets/components/UserDetails";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // Track user role

  // Persist login state across page reloads
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (token && storedRole) {
      setLoggedIn(true);
      setRole(storedRole); // Restore role
    }
  }, []);

  const setAuth = (status, token = null, userRole = null) => {
    console.log("User authenticated:", status);
    setLoggedIn(status);
    if (status && token && userRole) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);
      setRole(userRole);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setRole(null);
    }
  };

  return (
    <Router>
      <Navbar setAuth={setAuth} loggedIn={loggedIn}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/nonfiction" element={<Nonfiction />} />
        <Route path="/nonfiction/:id" element={<NonFictionDetails  loggedIn={loggedIn}/>} />
        <Route path="/books/:id" element={<BookDetails loggedIn={loggedIn} />}/>

        {/* Authenticated Routes */}
        <Route
          path="/login"
          element={<Login setAuth={setAuth} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/profile"
          element={loggedIn && role == 'user' ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/pdfreader"
          element={loggedIn ? <PDFReader /> : <Navigate to="/login" />}
        />

        {/* Admin Panel Route */}
        <Route
          path="/admin"
          element={
            loggedIn && role === "admin" ? (
              <AdminPanel />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/admin/users/:userId" element={<UserDetails />} />

        <Route path="/articles" element={<Articles />} />
        <Route path="/searchbar" element={<SearchBar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

