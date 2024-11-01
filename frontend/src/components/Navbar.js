import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../Modal.js";
import Cart from "../screens/Cart.js";
import { useCart } from "./ContextReducer.js";

const Navbar = () => {
  let data = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    alert("You are logged out");
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const [cartview, setCartview] = useState(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-1 fst-italic fw-bold mb-1 "
            to="/"
            style={{
              fontFamily: "Verdana, Geneva, sans-serif",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            Swigato
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 ">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 mt-2 "
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <Link
                  className="nav-link active fs-5 mt-2 "
                  aria-current="page"
                  to="/myorderData"
                >
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1 " to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1 "
                  to="/createuser"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-2"
                  onClick={() => {
                    setCartview(true);
                  }}
                >
                  My Cart{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartview ? (
                  <Modal onClose={() => setCartview(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
