import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import { useAuthContext } from "./context/AuthContext";
import EmailVerificationPage from "./pages/EmailVerificationPage";

function App() {
  const { authUser, isLoading } = useAuthContext();
  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="min-h-screen text-gray-100 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#302b63] flex flex-col items-center justify-center relative overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/favorites"
          element={authUser ? <Favorites /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route path="/profile" element={<Home />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
