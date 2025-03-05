import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser, isLoading } = useAuthContext();
  console.log("Auth User:", authUser);
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="min-h-screen font-sans text-gray-100 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#302b63]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/favorites"
          element={authUser ? <Favorites /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route path="/profile" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
