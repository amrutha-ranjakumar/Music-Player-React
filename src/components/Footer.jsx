import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#1a0006', color: '#ffffff', padding: '60px 0', fontFamily: "'Poppins', sans-serif", }}>
      <div className="container">
        <div className="row ms-4">
          {/* Brand Info */}
          <div className="col-12 col-md-6 col-lg-4">
            <h4 style={{ color: '#ff9966', fontWeight: 'bold' }}>Music Hub</h4>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#ddd' }}>
              "Music Hub is your ultimate destination for discovering new music, connecting with artists, and enjoying a wide range of genres. Explore curated playlists, the latest tracks, and exclusive content to elevate your music experience like never before."
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-12 col-md-6 col-lg-2 ms-3">
            <h5 style={{ color: '#ff9966', fontWeight: 'bold' }}>Quick Links</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Link
                  to="/"
                  style={{ textDecoration: 'none', color: '#fff', fontSize: '14px', }}> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', color: '#fff', fontSize: '14px', }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  style={{ textDecoration: 'none', color: '#fff', fontSize: '14px', }}>
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="col-12 col-md-6 col-lg-2">
            <h5 style={{ color: '#ff9966', fontWeight: 'bold' }}>Resources</h5>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: '#fff', fontSize: '14px', }}>
                  React Docs
                </a>
              </li>
              <li>
                <a
                  href="https://react-bootstrap.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: '#fff', fontSize: '14px', }}>
                  React Bootstrap
                </a>
              </li>
              <li>
                <a
                  href="https://bootswatch.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', color: '#fff', fontSize: '14px', }}>
                  Bootswatch Themes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Social Media */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 style={{ color: '#ff9966', fontWeight: 'bold' }}>Get in Touch</h5>
            <form>
              <input
                type="email"
                placeholder="Your Email"
                style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: 'none', outline: 'none', }} />
              <button
                type="submit"
                style={{ width: '100%', padding: '10px', backgroundColor: '#ff9966', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', }} >
                Subscribe
              </button>
            </form>
            <div className="mt-3 d-flex justify-content-start">
              <a
                href="#"
                className="me-3"
                style={{ color: '#ff9966', fontSize: '20px', textDecoration: 'none', }}>
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="#"
                className="me-3"
                style={{ color: '#ff9966', fontSize: '20px', textDecoration: 'none', }}>
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href="#"
                className="me-3"
                style={{ color: '#ff9966', fontSize: '20px', textDecoration: 'none', }}>
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="#"
                style={{
                  color: '#ff9966', fontSize: '20px', textDecoration: 'none',
                }}
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ marginTop: '40px', borderTop: '1px solid #444', paddingTop: '20px', textAlign: 'center', color: '#ddd', fontSize: '14px', }}>
        &copy; {new Date().getFullYear()} Music Hub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
