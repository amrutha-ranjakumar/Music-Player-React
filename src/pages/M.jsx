import React, { useEffect, useState, useRef } from 'react';
import { BASE_URL } from '../Services/baseURL';
import { Table, Button, Container, Form } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa';
import { getmalayalamAPI } from '../Services/allAPI';
import { Row, Col, } from "react-bootstrap";
import { TiHeartOutline } from "react-icons/ti";
import { GoDownload } from "react-icons/go";
import { PiDotsThreeThin } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";

function M() {
  const [show, setShow] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [allMusic, setAllMusic] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handleShow = (song) => {
    setCurrentSong(song);
    setShow(true);
  };

  const getAllMusic = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      };
      const result = await getmalayalamAPI(reqHeader);
      setAllMusic(result.data);
      setFilteredMusic(result.data); // Initialize filtered music list
    }
  };

  // Search handler to filter songs based on name
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = allMusic.filter((song) =>
      song.songname.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredMusic(filtered);
  };

  useEffect(() => {
    if (show && currentSong) {
      const audio = audioRef.current;
      audio.src = `${BASE_URL}/uploads/${currentSong.audio}`;
      audio.load();
      audio.play();
      setIsPlaying(true);

      audio.ontimeupdate = () => setCurrentTime(audio.currentTime);
      audio.onloadedmetadata = () => setDuration(audio.duration);
    }
  }, [show, currentSong]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = e.target.value / 100;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    getAllMusic();
  }, []);

  return (
    <div style={{ backgroundColor: "#1a0006", color: "#fff", minHeight: "100vh" }}>
      <Container fluid className="py-5" style={{ background: "linear-gradient(to bottom, #330000, #1a0006)" }}>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start px-5">
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>KS Harisankar</h1>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
              Immerse yourself in the soulful music of KS Harisankar. Discover melodies that resonate and evoke deep emotions.</p>
            <p style={{ margin: 0, fontSize: "1rem" }}>4,567,890 monthly listeners</p>
            <Form.Control
              type="text"
              placeholder="Search songs..."
              value={searchTerm}
              onChange={handleSearch}
              style={{ borderRadius: "20px", backgroundColor: "#330000", color: "#fff", padding: "10px 15px", maxWidth: "400px", marginTop: "20px", }} className="text-white" />

            <style>
              {`
    input::placeholder {
      color: #fff !important;
    }
  `}
            </style>
            <div className="d-flex align-items-center gap-3 mt-4">
              <Button variant="info" size="lg">
                Follow KS Harisankar
              </Button>
              <h1>
                <PiDotsThreeThin />
              </h1>
            </div>
          </Col>
          <Col md={2} className="text-center">
            <img
              src="https://c.saavncdn.com/127/Best-Of-K-S-Harisankar-Malayalam-2020-20200427194526-500x500.jpg"
              alt="KS Harisankar"
              style={{ borderRadius: "20px", maxWidth: "160%", height: "auto", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)", }} />
          </Col>
        </Row>
      </Container>

      {/* Songs Section */}
      <Container >
        <h2 className=" mb-4" style={{ fontWeight: "bold" }}>
          popular
        </h2>
        <Table responsive className="table-modern text-center table table-borderless table-striped table-hover">
          <tbody>
            {filteredMusic.length > 0 ? (
              filteredMusic.map((song, index) => (
                <tr key={index}>
                  <td style={{ backgroundColor: '#1a0006', color: '#fff' }}>{index + 1}</td>
                  <td style={{ backgroundColor: '#1a0006', color: '#fff' }}>
                    <img
                      src={`${BASE_URL}/uploads/${song.songimage}`}
                      alt="Song"
                      style={{
                        borderRadius: "10px",
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td style={{ backgroundColor: '#1a0006', color: '#fff' }}>{song.songname}</td>
                  <td style={{ backgroundColor: '#1a0006', color: '#fff' }}>
                    <audio controls src={`${BASE_URL}/uploads/${song.audio}`} />
                  </td>
                  <td style={{ backgroundColor: '#1a0006', color: '#fff' }}>
                    <TiHeartOutline className="ms-3" />
                    <GoDownload className="ms-3" />
                    <BsThreeDotsVertical className="ms-3" />


                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No songs found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

      </Container>



      {/* Modal for Music Player */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Body style={{ backgroundColor: '#101010', color: '#fff' }}>
          {currentSong ? (
            <>
              <div className="text-center mb-4">
                <img
                  src={`${BASE_URL}/uploads/${currentSong.songimage}`}
                  alt={currentSong.songname}
                  style={{ width: '200px', height: '200px', borderRadius: '15px', objectFit: 'cover', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)', }} />
              </div>
              <div className="text-center mb-3">
                <h5>{currentSong.songname}</h5>
                <p>{formatTime(currentTime)} / {formatTime(duration)}</p>
                <input
                  type="range"
                  value={currentTime}
                  max={duration}
                  onChange={(e) => {
                    audioRef.current.currentTime = e.target.value;
                    setCurrentTime(e.target.value);
                  }}
                  style={{ width: '100%', backgroundColor: '#555', cursor: 'pointer', }}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <FaStepBackward size={30} className="mx-2 text-white" />
                {isPlaying ? (
                  <FaPause size={30} onClick={togglePlayPause} className="mx-2 text-white" />
                ) : (
                  <FaPlay size={30} onClick={togglePlayPause} className="mx-2 text-success" />
                )}
                <FaStepForward size={30} className="mx-2 text-white" />
              </div>
              <div className="mt-4">
                <FaVolumeUp className="text-white" />
                <input
                  type="range"
                  value={volume}
                  onChange={handleVolumeChange}
                  min="0"
                  max="100"
                  className="mx-2"
                  style={{ width: '50%' }}
                />
              </div>
              <audio ref={audioRef}></audio>
            </>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default M;
