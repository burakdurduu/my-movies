import { Loader } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

const LogoutButton = () => {
  const { logout, isLoading } = useAuthStore();

  return (
    <button
      className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium border border-gray-700 hover:border-gray-600 transition-colors duration-300"
      onClick={logout}
    >
      {isLoading ? (
        <Loader className="w-6 h-6 animate-spin mx-auto" />
      ) : (
        "Logout"
      )}
    </button>
  );
};

export default LogoutButton;
