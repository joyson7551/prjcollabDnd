import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-black text-white">
      <div className="text-xl font-bold">
        <Link to="/login" className="hover:text-blue-500">
          Project Collab
        </Link>
      </div>
      <div className="space-x-4">
        <Link to="/home" className="hover:text-blue-500">
          Home
        </Link>
        <Link to="/projects" className="hover:text-blue-500">
          Projects
        </Link>
        
        <Link to="/login" className="hover:text-blue-500">
          Login
        </Link>
        <button onClick={handleLogout} className="hover:text-red-500">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
