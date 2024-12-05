import React from 'react';
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap';
import newsongs from '../assets/newsongs.png';
import artists from '../assets/artist.png';
import Favourite from '../assets/Favourite.png';
import { Link } from 'react-router-dom';
import old from '../assets/Untitled design (2).png';



function Albums() {
  return (
    <div style={{ padding: '10px 0', backgroundColor: '#1a0006', minHeight: '50vh' }}>
      <Container>
        <h2 className='mt-3' style={{ color: '#f8f9fa', marginBottom: '40px', fontFamily: "'Poppins', sans-serif" }} > Albums Collections</h2>
        <Row className="g-5 mb-5">
          {/* Album 1 */}
          <Col xs={12} sm={6} md={3}>
            <Card style={{ backgroundColor: '#1a0006', border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)', }} >
              <Link to='/oldsongs'>
                <div className="image-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: '15px', }}>
                  <Image
                    src={old}
                    fluid
                    alt="Album 1"
                    style={{ width: '100%', height: '200px', objectFit: 'cover', transition: 'transform 0.3s ease', }} />
                  <div className="overlay"
                    style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '80px', backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '0 0 15px 15px', opacity: '0', transition: 'opacity 0.3s ease', }}>
                    <Button
                      variant="outline-light"
                      style={{ fontWeight: 'bold', padding: '12px 24px', border: '2px solid #fff', borderRadius: '30px', }}>  Listen Now
                    </Button>
                  </div>
                </div>
              </Link>
            </Card>
          </Col>

          {/* Album 2 */}
          <Col xs={12} sm={6} md={3}>
            <Card
              style={{ backgroundColor: '#1a0006', color: '#1a0006', border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 15px 25px rgba(#1a0006)', }}>
              <Link to='/newsongs'>
                <div className="image-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: '15px', }} >
                  <Image
                    src={newsongs}
                    fluid
                    alt="Album 2"
                    style={{  width: '100%',  height: '200px',  objectFit: 'cover',  transition: 'transform 0.3s ease', }}/>
                  <div className="overlay"
                    style={{position: 'absolute',bottom: '0',left: '0',width: '100%',height: '80px',backgroundColor: '#1a0006',color: '#1a0006',display: 'flex',  justifyContent: 'center', alignItems: 'center', borderRadius: '0 0 15px 15px', opacity: '0', transition: 'opacity 0.3s ease', }} >
                    <Button
                      variant=""
                      style={{ fontWeight: 'bold', padding: '12px 24px', border: '2px solid #1a0006', borderRadius: '30px', }}  >  Listen Now
                    </Button>
                  </div>
                </div>
              </Link>
            </Card>
          </Col>

          {/* Album 3 */}
          <Col xs={12} sm={6} md={3} className='mb-4'>
            <Card
              style={{ backgroundColor: '#1a0006', border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',  }}
            >
              <Link to='/artist'>
                <div
                  className="image-container"
                  style={{ position: 'relative', overflow: 'hidden', borderRadius: '15px', }}
                >
                  <Image
                    src={artists}
                    fluid
                    alt="Album 3"
                    style={{width: '100%',height: '200px',objectFit: 'cover',transition: 'transform 0.3s ease',  }}/>
                  <div className="overlay"
                    style={{position: 'absolute',bottom: '0',left: '0',width: '100%',height: '80px',backgroundColor: 'rgba(0, 0, 0, 0.6)',color: '#fff',display: 'flex',justifyContent: 'center', alignItems: 'center', borderRadius: '0 0 15px 15px', opacity: '0', transition: 'opacity 0.3s ease', }}
                  >
                    <Button variant="outline-light" style={{ fontWeight: 'bold', padding: '12px 24px', border: '2px solid #fff', borderRadius: '30px',}}>
                      Listen Now
                    </Button>
                  </div>
                </div>
              </Link>
            </Card>
          </Col>


          {/* Album 3 */}
          <Col xs={12} sm={6} md={3} className='mb-4'>
            <Card
              style={{backgroundColor: '#1a0006',border: 'none',borderRadius: '15px',overflow: 'hidden',boxShadow: '0 15px 25px rgba(0, 0, 0, 0.1)',}}>
              <Link to='/Favourite'>
                <div className="image-container" style={{   position: 'relative',   overflow: 'hidden',   borderRadius: '15px', }}  >
                  <Image
                    src={Favourite}
                    fluid
                    alt="Album 3"
                    style={{width: '100%',height: '200px',objectFit: 'cover',transition: 'transform 0.3s ease',}}/>
                  <div className="overlay" style={{  position: 'absolute',  bottom: '0',  left: '0',  width: '100%',  height: '80px',  backgroundColor: 'rgba(0, 0, 0, 0.6)',  color: '#fff',  display: 'flex',  justifyContent: 'center',  alignItems: 'center',  borderRadius: '0 0 15px 15px', opacity: '0',ransition: 'opacity 0.3s ease',}}>
                    <Button variant="outline-light"style={{  fontWeight: 'bold',  padding: '12px 24px', border: '2px solid #fff', borderRadius: '30px', }} >
                      Listen Now
                    </Button>
                  </div>
                </div>
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>

      <style>
        {`
          .image-container:hover .overlay {
            opacity: 1;
          }

          .image-container:hover img {
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
}

export default Albums;
