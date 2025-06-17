import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <header>
      <div className="container">
        <h1>Pure Song Selection</h1>
        <nav>
          {user ? (
            <>
              <span>Hi, {user}</span>
              <button className="login-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button onClick={login}>Login with Princeton</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
