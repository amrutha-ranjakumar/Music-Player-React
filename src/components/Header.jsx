import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaHeart } from "react-icons/fa";


function Header() {

  return (
    <Navbar style={{ borderBottom: "2px solid  #ffffff", padding: "15px 0", position: "sticky", top: 0, backgroundColor: '	#1a0006' }}>
      <Container className="ms-4" >
        {/* Left Section: Brand Name */}
        <Navbar.Brand href="/" style={{ fontSize: "2rem", fontWeight: "bold", color: "#b30000", letterSpacing: "1.5px", }}>
          Music<span style={{ color: "#fff" }}>Hub</span>
        </Navbar.Brand>
        {/* Navbar Toggler */}
        <Navbar.Toggle aria-controls="navbarNav" className="text-white" />
        {/* Right Section: Icons and Profile */}
        <Nav className="ms-auto d-flex align-items-center">
          {/* Favorite Icon */}
          <Nav.Link
            href="/favourite"
            className="text-white"
            style={{ marginRight: "20px", fontSize: "1.2rem" }}>
            <FaHeart className="text-danger" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
