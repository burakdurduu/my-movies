import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <button
      className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium border border-gray-700 hover:border-gray-600 transition-colors duration-300"
      onClick={logout}
    >
      <i className="fas fa-sign-out-alt mr-2"></i>Logout
    </button>
  );
};

export default LogoutButton;
