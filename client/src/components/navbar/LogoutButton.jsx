import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <button className="btn nav-btn" onClick={logout}>
      <i className="fas fa-sign-out-alt"></i> Logout
    </button>
  );
};

export default LogoutButton;
