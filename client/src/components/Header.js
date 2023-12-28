import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import token from "../utils/token";
import { useLocation, useHistory } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (token.getUsername()) {
      setUsername(token.getUsername());
    } else {
      setUsername(null);
    };
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };

  const styles = {
    brand: {
      textShadow: "10px 10px 23px black"
    }
  }

  return (
    <div className="mb-5">
    <Navbar expand="sm" fixed="top" className="shadow bg-maroon">
      <Navbar.Brand href="/collection" className="font-weight-bold" style={styles.brand}>Reading Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {username ? <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto font-weight-bold">
          <Nav.Link href="/collection" className="text-light">{username}'s Books</Nav.Link>
          <Nav.Link href="/search" className="text-light">Book Search</Nav.Link>
          <Nav.Link onClick={handleLogout} className="text-secondary">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse> : null}
    </Navbar>
    </div>
  );
};

export default Header;
