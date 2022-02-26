import React from "react";
import { useHistory } from "react-router-dom";

const Nav = () => {
  const history = useHistory();

  let email = sessionStorage.getItem("email");
  let level = sessionStorage.getItem("level");

  function hapus() {
    sessionStorage.clear();
    history.push("/login");
  }
  return (
    <div className="mt-2 mb-2">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Dashboard</a>

          <li className="nav-item list-unstyled">Email : {email}</li>
          <li className="nav-item list-unstyled">Posisi : {level}</li>

          <button
            onClick={hapus}
            className="btn btn-outline-danger"
            type="submit"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
