import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import { artistongsAPI } from '../Services/allAPI';
import { BASE_URL } from '../Services/baseURL';

function Oldsongs() {
  const [allMusic, setAllMusic] = useState([]);
  const navigate = useNavigate();

  const fetchMusic = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      const result = await artistongsAPI(headers);
      setAllMusic(result.data || []);
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  const handleCategoryClick = (category) => {
    const routes = {
      malayalam: '/m',
      tamil: '/t',
      hindi: '/h',
      english: '/e',
      telugu: '/tu',
    };
    navigate(routes[category] || '/');
  };

  return (
    <div style={{ backgroundColor: '#1a0006', minHeight: '40vh' }}>
      <Container>
        <h2 className="mb-3 ms-3" style={{ color: '#f8f9fa', marginTop: '-30px', fontFamily: "'Poppins', sans-serif", }}>  Artist Collections</h2>
        <Row>
          {allMusic.length > 0 ? (
            allMusic.map((music) => (
              <Col xs={12} sm={6} md={4} lg={3} xl={2} key={music.id}>
                <div
                  style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#1e1e1e', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.7)', cursor: 'pointer', transition: 'transform 0.3s ease', }}
                  onClick={() => handleCategoryClick(music.category)}
                  className="circle-card"
                >
                  <Image
                    src={`${BASE_URL}/uploads/${music.artistimage}`}
                    alt={music.artistname}
                    fluid
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', opacity: '0', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.3s ease', borderRadius: '50%', }}
                    className="overlay"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
                      alt="Play Icon"
                      style={{ width: '50px', height: '50px', filter: 'invert(1)' }}
                    />
                  </div>
                </div>
                <div
                  style={{ textAlign: 'center', marginTop: '10px', color: '#ffffff', fontWeight: 'bold', fontFamily: "'Poppins', sans-serif", fontSize: '1em', }}
                >
                  {music.artistname}
                </div>
              </Col>
            ))
          ) : (
            <div
              style={{ textAlign: 'center', color: '#f8f9fa', marginTop: '50px', fontFamily: "'Poppins', sans-serif", }}>
              <h3>No music uploaded yet!</h3>
            </div>
          )}
        </Row>
      </Container>
      <style>
        {`.circle-card { animation: fadeIn 0.6s ease-in-out; } .circle-card:hover { transform: scale(1.1);}.circle-card:hover .overlay {opacity: 1;}@keyframes fadeIn {from {opacity: 0;transform: scale(0.9);}to {opacity: 1;transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Oldsongs;
