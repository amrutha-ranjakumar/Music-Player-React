import React, { useEffect, useState } from 'react';
import { FaHeart, FaSearch } from 'react-icons/fa';
import { Image, Button, Form, Modal } from 'react-bootstrap';
import { BASE_URL } from '../Services/baseURL';
import { oldsongAPI } from '../Services/allAPI';
import MusicModal from './MusicModal';

function Oldsongs() {
  const [showModal, setShowModal] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [allMusic, setAllMusic] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };
      const result = await oldsongAPI(reqHeader);
      setAllMusic(result.data);
    }
  };

  useEffect(() => {
    getAllMusic();
  }, []);

  const handleFavourite = (song) => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    favourites.push(song);
    localStorage.setItem('favourites', JSON.stringify(favourites));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredMusic = allMusic.filter((song) =>
    song.songname.toLowerCase().includes(searchQuery)
  );

  return (
    <div style={styles.container}>
      {/* Search & Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Rediscover the Classics</h1>
        <p style={styles.subtitle}>A curated collection of timeless tunes</p>
        <div style={styles.searchWrapper}>
          <FaSearch style={styles.searchIcon} />
          <Form.Control
            type="text"
            placeholder="Search songs..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
        </div>
      </div>

      {/* Songs Grid */}
      <div style={styles.grid}>
        {filteredMusic.length > 0 ? (
          filteredMusic.map((item) => (
            <div style={styles.card} key={item.id}>
              <div style={styles.cardImage} onClick={() => openMusicModal(item)}>
                <Image
                  src={`${BASE_URL}/uploads/${item.image}`}
                  alt={item.songname}
                  style={styles.image}
                />
              </div>
              <div style={styles.cardContent}>
                <h5 style={styles.songTitle}>{item.songname}</h5>
                <Button
                  onClick={() => handleFavourite(item)}
                  style={styles.favButton}
                >
                  <FaHeart />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.empty}>
            <Image
              src="https://i.pinimg.com/564x/ea/37/ea/ea37ea689a2f2a928dd88026cebe8615.jpg"
              alt="No songs available"
              style={styles.emptyImage}
            />
            <p>No songs found. Try searching for something else!</p>
          </div>
        )}
      </div>

    
      {/* Music Modal */}
      <MusicModal
        show={showModal}
        onHide={closeMusicModal}
        song={currentSong}
        allMusic={allMusic}
        isIntroDisabled={true}
      />


    </div>
  );
}

const styles = {
  container: {backgroundColor: '#1a0006', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: "'Poppins', sans-serif",},
  header: {textAlign: 'center', marginBottom: '40px',},
  title: {fontSize: '2.5rem',color: '#ff9966',marginBottom: '10px',},
  subtitle: {fontSize: '1.2rem',color: '#ddd',},
  searchWrapper: { marginTop: '20px',position: 'relative',maxWidth: '400px',margin: '0 auto', },
  searchIcon: { position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888',},
  searchInput: {width: '100%',padding: '10px 40px',borderRadius: '20px',border: '1px solid #ddd',outline: 'none',},
  grid: {display: 'grid',gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',gap: '20px',},
  card: { backgroundColor: '#330000', borderRadius: '15px', overflow: 'hidden',textAlign: 'center',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', },
  cardImage: {height: '200px',overflow: 'hidden',cursor: 'pointer',},
  image: {width: '100%',height: '100%',objectFit: 'cover',},cardContent: {padding: '15px',},
  songTitle: {fontSize: '1rem',color: '#fff',marginBottom: '10px',},
  favButton: { backgroundColor: 'transparent', border: 'none', color: '#ff6666', fontSize: '1.5rem',},
  empty: {textAlign: 'center',color: '#888', },
  emptyImage: {width: '200px',marginBottom: '10px',},
};

export default Oldsongs;
