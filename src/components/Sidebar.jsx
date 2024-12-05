import React, { useState } from 'react';
import { Nav, Offcanvas, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaMusic, FaSearch, FaHeart, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { IoAlbumsOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";
import { MdRoomPreferences } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { Navbar, Container } from 'react-bootstrap';

function Sidebar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };


  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };



  return (
    <div>
      {/* Navbar */}
      <Navbar expand="lg" fixed="top">
        <Container fluid>
          <Button variant="dark"
            className="d-md-none"
            onClick={toggleSidebar}
            style={{ position: 'absolute', top: '50px', left: '2px', zIndex: 999, }}>
            ☰
          </Button>
        </Container>
      </Navbar>

      {/* Mobile Sidebar */}
      <Offcanvas show={sidebarOpen} onHide={toggleSidebar} placement="start" scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="/home" onClick={handleClose}>
              <FaHome size={18} /> Home
            </Nav.Link>
            <Nav.Link href="/albums" onClick={handleClose}>
              <IoAlbumsOutline size={18} />  Albums

            </Nav.Link>
            <Nav.Link href="/oldsongs" onClick={handleClose}>
              <FaMusic size={18} /> Old Songs
            </Nav.Link>
            <Nav.Link href="/newsongs" onClick={handleClose}>
              <FaMusic size={18} /> New Songs
            </Nav.Link>
            <Nav.Link href="/paymentpage" onClick={handleClose}>
              <MdOutlinePayments size={18} /> Payment
            </Nav.Link>
            <Nav.Link href="/dashboard" className="mb-3 text-white">
              <IoIosCreate size={18} /> Create Music
            </Nav.Link>
            <Nav.Link href="/favourite" onClick={handleClose}>
              <FaHeart size={18} /> Favorites
            </Nav.Link>
            <Nav.Link href="/preferences" onClick={handleClose}>
              <MdRoomPreferences size={18} /> Preferences
            </Nav.Link>
            <Nav.Link
              onClick={handleLogout}
              className="text-danger"
              style={{ cursor: 'pointer' }}
            >
              <FaSignOutAlt size={18} /> Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-flex flex-column"
        style={{ height: '100vh', width: '250px', borderRight: '2px solid #33001a', backgroundColor: '#1a0006', boxShadow: '2px 0 10px rgba(0, 0, 0, 0.5)', padding: '20px', }}>
        {/* Profile Section */}
        <div
          style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '15px', }}>
          <div
            style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#444', margin: '0 auto 10px', }}
          ></div>
          <h5 style={{ margin: '0', color: '#fff' }}>User Name</h5>
          <small style={{ color: '#aaa' }}>Music Enthusiast</small>
        </div>

        {/* Navigation Menu */}
        <h6 style={{ fontSize: '0.9rem', color: '#ff1a1a', marginBottom: '10px' }}>Main</h6>
        <Nav className="flex-column">
          <Nav.Link href="/home" className="mb-3 text-white">
            <FaHome size={18} /> Home
          </Nav.Link>
          <Nav.Link href="/albums" className="mb-3 text-white">
            <IoAlbumsOutline size={18} />  Albums
          </Nav.Link>
          <Nav.Link href="/oldsongs" className="mb-3 text-white">
            <FaMusic size={18} /> Old Songs
          </Nav.Link>
          <Nav.Link href="/newsongs" className="mb-3 text-white">
            <FaMusic size={18} /> New Songs
          </Nav.Link>
          <Nav.Link href="/paymentpage" className="mb-3 text-white">
            <MdOutlinePayments size={18} /> Payment
          </Nav.Link>
          <Nav.Link href="/favourite" className="mb-3 text-white">
            <FaHeart size={18} /> Favorites
          </Nav.Link>

          <Nav.Link href="/dashboard" className="mb-3 text-white">
            <IoIosCreate size={18} /> Create Music
          </Nav.Link>
        </Nav>

        <h6 style={{ fontSize: '0.9rem', color: '#ff1a1a', marginBottom: '10px' }}>Settings</h6>
        <Nav className="flex-column">
          <Nav.Link href="/preferences" className="mb-3 text-white">
            <MdRoomPreferences size={18} /> Preferences
          </Nav.Link>
          <Nav.Link
            onClick={handleLogout}
            className="text-danger mb-3"
            style={{ cursor: 'pointer' }}
          >
            <FaSignOutAlt size={18} /> Logout
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
