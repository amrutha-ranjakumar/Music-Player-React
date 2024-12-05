import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../Services/allAPI';
import Swal from 'sweetalert2';

function Auth({ register }) {
  const registerForm = register ? true : false;

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("Please fill the form completely.");
    } else {
      const result = await registerAPI(userData);
      if (result.status === 200) {

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User registered successfully",
          showConfirmButton: false,
          timer: 1500
        });

        setUserData({
          username: '',
          email: '',
          password: ''
        });
        navigate('/login');
      } else {
        alert(result.response.data);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      alert("Please fill the form completely.");
    } else {
      const result = await loginAPI(userData);
      if (result.status === 200) {
        sessionStorage.setItem('existinguser', JSON.stringify(result.data.existinguser));
        sessionStorage.setItem('token', result.data.token);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User logged in successfully",
          showConfirmButton: false,
          timer: 1500
        });


        setUserData({
          username: '',
          email: '',
          password: ''
        });
        navigate('/home');
      } else {
        alert(result.response.data);
      }
    }
  };

  return (
    <div style={{  width: '100%',  height: '100vh',  display: 'flex',  justifyContent: 'center',  alignItems: 'center',  background: 'linear-gradient(45deg, #FF6F61, #FFB74D)',}}  >
     <div className="card shadow-lg p-4" style={{   width: '90%',   maxWidth: '700px',   display: 'flex',   flexDirection: 'row',   backgroundColor: 'rgba(255, 255, 255, 0.9)',   borderRadius: '20px',overflow: 'hidden',boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)', }}>
 {/* Form Section */}
        <div className="col-md-12 p-5" style={{   display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center', }}>
          <h2 style={{ontSize: '2rem', color: '#FF6F61', fontWeight: '600', marginBottom: '20px', }}> Music Hub </h2>
         <h5 style={{ fontSize: '1.2rem', fontWeight: '500',color: '#555',marginBottom: '30px', }} > {registerForm ? 'Create Your Account' : 'Log In to Your Account'}</h5>
        <Form style={{ width: '100%' }}>
            {registerForm && (
              <Form.Group controlId="validationCustom01" className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  value={userData.username}
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  type="text"
                  placeholder="Enter your username"
                  required
                  style={{ borderRadius: '10px', border: '1px solid #FF6F61', padding: '10px', fontSize: '1rem', marginBottom: '15px',}}/>
              </Form.Group>
            )}
            <Form.Group controlId="validationCustom02" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                type="email"
                placeholder="Enter your email"
                required
                style={{ borderRadius: '10px', border: '1px solid #FF6F61', padding: '10px', fontSize: '1rem', marginBottom: '15px',
                }} />
            </Form.Group>

            <Form.Group controlId="validationCustom03" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                type="password"
                placeholder="Enter your password"
                required
                style={{ borderRadius: '10px', border: '1px solid #FF6F61', padding: '10px', fontSize: '1rem', marginBottom: '15px', }}
              />
            </Form.Group>

            {registerForm ? (
              <div>
                <button
                  className="btn btn-primary rounded mt-4 w-100"
                  onClick={handleRegister}
                  style={{ padding: '12px 0', fontSize: '1.1rem', backgroundColor: '#FF6F61', border: 'none', borderRadius: '10px', color: '#fff', }}
                >
                  Register
                </button>
                <p className="mt-3" style={{ color: '#555' }}>
                  Already a user? Click here to{' '}
                  <Link to="/login" style={{ textDecoration: 'none', color: '#FF6F61' }}>
                    Login
                  </Link>
                </p>
              </div>
            ) : (
              <div>
                <button
                  className="btn btn-primary rounded mt-4 w-100"
                  onClick={handleLogin}
                  style={{ padding: '12px 0',fontSize: '1.1rem',  backgroundColor: '#FF6F61',  border: 'none',  borderRadius: '10px',  color: '#fff',}}
                >
                  Login
                </button>
                <p className="mt-3" style={{ color: '#555' }}>
                  Not a user yet? Click here to{' '}
                  <Link to="/register" style={{ textDecoration: 'none', color: '#FF6F61' }}>
                    Register
                  </Link>
                </p>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
