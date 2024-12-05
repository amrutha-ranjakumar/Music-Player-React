import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row, Button, Form } from 'react-bootstrap';
import { newsongAPI } from '../Services/allAPI';
import { BASE_URL } from '../Services/baseURL';
import MusicModal from './MusicModal';
import { FaHeart } from 'react-icons/fa';

function Newsongs() {
  const [showModal, setShowModal] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [allMusic, setAllMusic] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const openMusicModal = (song) => {
    setCurrentSong(song);
    setShowModal(true);
  };

  const closeMusicModal = () => {
    setShowModal(false);
  };

  const getAllMusic = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await newsongAPI(reqHeader);
        setAllMusic(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching songs:', error);
      }
    }
  };

  useEffect(() => {
    getAllMusic();
  }, []);

  const filteredMusic = allMusic.filter((song) =>
    song.songname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFavourite = (song) => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    favourites.push(song);
    localStorage.setItem('favourites', JSON.stringify(favourites));
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Discover Your Next Favorite Song</h1>
        <p style={styles.heroSubtitle}>
          Listen, explore, and fall in love with the latest tracks.
        </p>
        <Form.Control
          type="text"
          placeholder="Search for songs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBar}
        />
      </div>

      {/* Songs Section */}
      <Container style={styles.songsContainer}>
        {loading ? (
          <p style={styles.loadingText}>Loading songs...</p>
        ) : filteredMusic.length > 0 ? (
          <Row>
            {filteredMusic.map((song) => (
              <Col key={song.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <div style={styles.card}>
                  <div style={styles.cardImageContainer} onClick={() => openMusicModal(song)}>
                    <Image
                      src={`${BASE_URL}/uploads/${song.image}`}
                      alt={song.songname}
                      fluid
                      style={styles.cardImage}
                     
                    />
                    <div style={styles.overlay}>
                      <Button variant="light" style={styles.playButton}>
                        ▶
                      </Button>
                    </div>
                  </div>
                  <div style={styles.cardContent}>
                    <h5 style={styles.songTitle}>{song.songname}</h5>
                    <Button
                      variant="link"
                      style={styles.favouriteButton}
                      onClick={() => handleFavourite(song)}
                    >
                      <FaHeart />
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div style={styles.noMusic}>
            <img
              src="https://i.pinimg.com/564x/ea/37/ea/ea37ea689a2f2a928dd88026cebe8615.jpg"
              alt="No music"
              style={styles.noMusicImage}
            />
            <p>No songs available yet.</p>
          </div>
        )}
      </Container>

      {/* Music Modal */}
      <MusicModal show={showModal} onHide={closeMusicModal} song={currentSong} />
    </div>
  );
}

const styles = {
  container: {backgroundColor: '#1a0006',color: '#fff',minHeight: '100vh',fontFamily: 'Arial, sans-serif',},
  hero: {textAlign: 'center',padding: '80px 20px',background: "linear-gradient(to bottom, #330000, #1a0006)",color: '#fff',},
  heroTitle: {fontSize: '3rem',fontWeight: 'bold',marginBottom: '10px',textShadow: '2px 2px 4px #000', },
  heroSubtitle: {fontSize: '1.2rem',marginBottom: '20px',textShadow: '1px 1px 2px #000', },
  searchBar: {maxWidth: '400px',margin: '0 auto',padding: '10px',borderRadius: '20px',border: 'none',boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',},
  songsContainer: {padding: '40px 20px',},
  loadingText: {textAlign: 'center',fontSize: '1.2rem',color: '#fff',},
  card: {backgroundColor: '#330000',borderRadius: '15px',overflow: 'hidden',boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',},
  cardImageContainer: {position: 'relative',overflow: 'hidden'},
  cardImage: {width: '100%',height: '200px',objectFit: 'cover',},
  overlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0, transition: 'opacity 0.3s', },
  playButton: {fontSize: '1.5rem',padding: '10px',borderRadius: '50%',backgroundColor: '#fff',color: ' #cc0000',},
  cardContent: {padding: '15px',textAlign: 'center',},
  songTitle: {fontSize: '1rem',fontWeight: 'bold',marginBottom: '5px',},
  favouriteButton: {color: ' #cc0000',fontSize: '1.5rem'},
  noMusic: {textAlign: 'center',color: '#fff',},
  noMusicImage: {width: '200px',marginBottom: '20px',},
};

export default Newsongs;
