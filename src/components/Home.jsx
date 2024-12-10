import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../Services/baseURL';
import { getallsongAPI, getallsongsAPI } from '../Services/allAPI';
import Artist from '../pages/Artist';
import Albums from '../components/Albums';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Image } from 'react-bootstrap';
import play from '../assets/play.png';

function Home() {
  const [show, setShow] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // New state for the second modal
  const [currentSong, setCurrentSong] = useState({});
  const [allproject, setAllproject] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Default volume: 100%
  const audioRef = useRef(null);
  const [allsongs, setAllsongs] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const handleMouseEnter = (index) => setHoveredCard(index);
  const handleMouseLeave = () => setHoveredCard(null);
  const handleTouchStart = (index) => setHoveredCard(index);
  const handleClose = () => setShow(false);
  const handleShow = (song) => {
    setCurrentSong(song);
    setShow(true);
  };

  const handleCloseDetailsModal = () => setShowDetailsModal(false);
  const handleShowDetailsModal = (song) => {
    setCurrentSong(song);
    setShowDetailsModal(true); // Open the song details modal
  };

  const getAllmusic = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await getallsongAPI(reqHeader);
      setAllproject(result.data);
    }
  };

  useEffect(() => {
    getAllmusic();
  }, []);


  const getAllsongs = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await getallsongsAPI(reqHeader);
      setAllsongs(result.data);
    }
  };

  useEffect(() => {
    getAllsongs();
  }, []);

  // Handle audio playback
  useEffect(() => {
    if (show && audioRef.current) {
      const audio = audioRef.current;
      audio.play();
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
      };
      audio.volume = volume; // Set the volume
    }
  }, [show, volume]);

  // Format time to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle volume change
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <>
      {/* Full Background for Home Page */}
      <div style={{ backgroundColor: '#1a0006', minHeight: '100vh', color: '#fff' }}>
        {/* Header Section */}
        <Container fluid className="text-center py-5" style={{ color: '#101820', background: 'linear-gradient(45deg, #FF6F61, #FFB74D)' }}>
          <h1 className="fw-bold" style={{ fontSize: '3rem', textShadow: '2px 2px 4px #000' }}>
            Explore Music Universe
          </h1>
          <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
            Discover new tunes and relive your favorite beats. Play it loud, play it proud.
          </p>
          <Button variant="dark" size="lg" style={{ marginRight: '10px', fontWeight: '600', borderRadius: '10px' }}>
            Start Listening
          </Button>
          <Button variant="outline-dark" size="lg" style={{ fontWeight: '600', borderRadius: '10px', color: '#101820' }}>
            Learn More
          </Button>
        </Container>
        <Container className="py-5" style={{ backgroundColor: "#1a0006" }}>
          <Row>

            {allproject.length > 6 ? (
              allproject.slice(6, 12).map((item, index) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  key={item.id}
                  className="d-flex justify-content-center mb-4"
                  style={{
                    animation: `slideUp ${0.5 + index * 0.2}s ease-in-out`,
                  }}
                >
                  <div style={{ position: "relative", backgroundColor: "#330000", borderRadius: "15px", boxShadow: "0 6px 15px rgba(0, 0, 0, 0.5)", textAlign: "center", transition: "transform 0.3s ease", width: "100%", maxWidth: "250px", cursor: "pointer", }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={() => handleTouchStart(index)}
                    onClick={() => handleShow(item)}
                  >
                    <Image
                      src={`${BASE_URL}/uploads/${item.image}`}
                      fluid
                      alt={item.title}
                      style={{ borderRadius: "15px 15px 0 0", height: "200px", width: "100%", }} />
                    {/* Play Icon Overlay */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", justifyContent: "center", alignItems: "center", opacity: hoveredCard === index ? 1 : 0, transition: "opacity 0.3s ease", borderRadius: "15px",
                    }}
                    >
                      <img src={play}
                        alt="Play Icon"
                        style={{ width: "50px", height: "50px" }} />
                    </div>
                    <div style={{ padding: "10px", backgroundColor: "#1a0006", color: "#f8f9fa"}} >
                      <h5 style={{ margin: "0", fontWeight: "500" }}>{item.title}</h5>
                      <h5 style={{ margin: "0", fontWeight: "500" }}>{item.title}</h5>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center">
                <img
                  src="https://i.pinimg.com/564x/ea/37/ea/ea37ea689a2f2a928dd88026cebe8615.jpg"
                  alt="No music"
                  style={{ maxWidth: "300px", margin: "0 auto", borderRadius: "15px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", animation: "fadeIn 1.5s ease-in-out", }}
                />
                <p style={{ color: "#f8f9fa", fontFamily: "'Poppins', sans-serif", fontSize: "1.2rem", marginTop: "20px", animation: "fadeIn 2s ease-in-out", }}
                > No music available yet
                </p>
              </Col>
            )}
          </Row>

          <style>
            {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              transform: translateY(60px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}
          </style>
        </Container>

        {/* Main Content Section */}
        <Container fluid>
          <Row>
            {/* Artist Section */}
            <Col xs={12}>
              <Artist />
            </Col>
          </Row>
        </Container>
        {/* Songs Table Section */}
        <Container fluid className="py-5 ms-3 me-3">
          <Row>
            {/* Left Section: Songs 1 to 6 */}
            <Col md={6}>
              <Table bordered={false} hover responsive style={{ borderCollapse: "collapse" }} className='table table-borderless table-striped table-hover'>
                <thead></thead>
                <tbody style={{ color: "#fff" }}>
                  {allsongs.length ? (
                    allsongs.slice(0, 5).map((item, index) => (
                      <tr
                        key={index}
                        className="text-center song-row"
                        style={{
                          transition: "transform 0.3s, background-color 0.3s, opacity 0.5s",
                          animation: `fadeIn ${0.3 + index * 0.1}s ease-in-out`,
                        }}
                      >
                        <td style={{ backgroundColor: "#330000", color: "#fff" }}>{index + 1}</td>
                        <td style={{ backgroundColor: "#1a0006", color: "#fff" }}>
                          <img
                            src={`${BASE_URL}/uploads/${item.image}`}
                            alt={item.songname}
                            width="60"
                            height="60"
                            style={{
                              objectFit: "cover",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                            }}
                            onClick={() => handleShow(item)}
                          />
                        </td>
                        <td style={{ fontWeight: "600", backgroundColor: "#1a0006", color: "#fff" }}>
                          {item.songname}
                        </td>
                        <td style={{ fontWeight: "600", backgroundColor: "#1a0006", color: "#fff" }}>
                          {item.artistname}
                        </td>
                        <td style={{ backgroundColor: "#1a0006", color: "#fff" }}>
                          <BsThreeDotsVertical
                            className="ms-3"
                            onClick={() => handleShowDetailsModal(item)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center" style={{ backgroundColor: "#1a0006", color: "#fff" }}>
                        No songs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>

            {/* Right Section: Songs 7 to 12 */}
            <Col md={6}>
              <Table bordered={false} hover responsive style={{ borderCollapse: "collapse" }} className='table table-borderless table-striped table-hover'>
                <thead></thead>
                <tbody style={{ color: "#fff" }}>
                  {allsongs.length > 6 ? (
                    allsongs.slice(5, 12).map((item, index) => (
                      <tr
                        key={index}
                        className="text-center song-row"
                        style={{
                          transition: "transform 0.3s, background-color 0.3s, opacity 0.5s",
                          animation: `fadeIn ${0.5 + index * 0.1}s ease-in-out`,
                        }}
                      >
                        <td style={{ backgroundColor: "#330000", color: "#fff" }}>{index + 7}</td>
                        <td style={{ backgroundColor: "#1a0006", color: "#fff" }}>
                          <img
                            src={`${BASE_URL}/uploads/${item.image}`}
                            alt={item.songname}
                            width="60"
                            height="60"
                            style={{
                              objectFit: "cover",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
                            }}
                            onClick={() => handleShow(item)}
                          />
                        </td>
                        <td style={{ fontWeight: "600", backgroundColor: "#1a0006", color: "#fff" }}>
                          {item.songname}
                        </td>
                        <td style={{ fontWeight: "600", backgroundColor: "#1a0006", color: "#fff" }}>
                          {item.artistname}
                        </td>
                        <td style={{ backgroundColor: "#1a0006", color: "#fff" }}>
                          <BsThreeDotsVertical
                            className="ms-3"
                            onClick={() => handleShowDetailsModal(item)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center" style={{ backgroundColor: "#1a0006", color: "#fff" }}>
                        No songs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>

          <style>
            {`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .song-row:hover {
        background-color: #330000 !important;
        transform: scale(1.02);
      }
    `}
          </style>
        </Container>

        {/* Music Display Section */}
        <Container>
          <Row>

            {allproject.length > 0 ? (
              allproject.slice(0, 6).map((item, index) => (
                <Col xs={12} sm={6} md={4} lg={2} key={item.id} className="mt-3">
                  <div
                    style={{
                      position: 'relative', overflow: 'hidden', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer',
                    }}
                    className="music-card"
                    onClick={() => handleShow(item)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={() => handleTouchStart(index)}
                  >
                    <Image
                      src={`${BASE_URL}/uploads/${item.image}`}
                      fluid
                      style={{
                        width: '100%', height: 'auto', transition: 'transform 0.3s ease',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: hoveredCard === index ? '1' : '0', transition: 'opacity 0.3s ease', borderRadius: '15px',
                      }}
                      className="overlay"
                    >
                      <img
                        src={play}
                        alt="Play Icon"
                        style={{
                          width: '50px', height: '50px', filter: 'invert(1)',

                        }}
                      />
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <div
                style={{
                  textAlign: 'center', color: '#f8f9fa', marginTop: '50px', fontFamily: "'Poppins', sans-serif",
                }}
              >
                <img
                  src="https://i.pinimg.com/564x/ea/37/ea/ea37ea689a2f2a928dd88026cebe8615.jpg"
                  alt="No music"
                  style={{
                    maxWidth: '300px', marginBottom: '15px', borderRadius: '15px',
                  }}
                />
                <p>No music available yet</p>
              </div>
            )}
          </Row>
          <style>
            {`
          .music-card:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.7);
          }

          .music-card:hover .overlay {
            opacity: 1;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .music-card {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}
          </style>
        </Container>

        <Container fluid>
          <Row>
            {/* Artist Section */}
            <Col xs={15}>
              <Albums />
            </Col>
          </Row>
        </Container>
        {/* Modal for Minimalistic Music Player */}
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="modal-custom"
          aria-labelledby="music-player-modal-title"
          centered
          size="2g"
          className="minimal-modal"
        >
          <Modal.Header
            closeButton
            style={{
              backgroundColor: '#1a0006', borderBottom: '1px solid #e0e0e0', padding: '1.5rem 2rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Modal.Title
              id="music-player-modal-title"
              style={{
                fontWeight: 'bold', fontSize: '1.8rem', color: '#ffffff',
              }}
            >
              {currentSong.songname || 'Now Playing'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            style={{
              backgroundColor: '#1a0006', color: '#333', textAlign: 'center', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Song Image */}
            <div
              style={{
                marginBottom: '20px', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', overflow: 'hidden', transition: 'all 0.3s ease',
              }}
            >
              <img
                src={`${BASE_URL}/uploads/${currentSong.image}`}
                alt={currentSong.songname}
                width="250"
                height="250"
                style={{ objectFit: 'cover', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', }}
              />
            </div>

            {/* Audio Player */}
            {currentSong.audio && (
              <div style={{
                backgroundColor: '#1a0006', borderRadius: '10px', padding: '20px', width: '80%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px',
              }}
              >
                <audio
                  ref={audioRef}
                  controls
                  style={{
                    width: '100%', backgroundColor: '#1a0006', borderRadius: '10px', color: '#1a0006', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <source
                    src={`${BASE_URL}/uploads/${currentSong.audio}`}
                    type="audio/mp3"
                  />
                  Your browser does not support the audio element.
                </audio>

                {/* Time and Volume Controls */}
                <div
                  style={{
                    marginTop: '20px', color: '#ffffff', fontSize: '1.1rem', textAlign: 'center',
                  }}
                >
                  <span>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}
                >
                  <span style={{ marginRight: '10px' }}>Volume</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    style={{ width: '150px', backgroundColor: '#1a0006', marginRight: '20px', cursor: 'pointer', }}
                  />
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Home;
