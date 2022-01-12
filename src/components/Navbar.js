import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <h2>Proligz</h2>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              {!isPending && (
                <button onClick={logout} className="btn">
                  Logout
                </button>
              )}
              {isPending && (
                <button disabled className="btn">
                  Logging out
                </button>
              )}
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
