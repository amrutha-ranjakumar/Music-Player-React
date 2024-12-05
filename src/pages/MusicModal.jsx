import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaVolumeUp } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import { BASE_URL } from '../Services/baseURL';
import introAudio from '../assets/premium.mp3'; // Replace with the intro audio path
import introImage from '../assets/advertisment.jpg'; // Replace with the intro image path

function MusicModal({ show, onHide, song }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isIntroPlaying, setIsIntroPlaying] = useState(true); // Track if the intro is playing
  const audioRef = useRef(null);
  const introAudioRef = useRef(null);

  useEffect(() => {
    if (show && song) {
      // Handle intro audio playback
      const introAudioElement = introAudioRef.current;
      const mainAudioElement = audioRef.current;

      if (introAudioElement) {
        // Reset states
        setIsPlaying(false);
        setIsIntroPlaying(true);

        // Play intro audio
        introAudioElement.volume = volume / 100;
        introAudioElement.play().catch((err) => console.error('Intro audio play error:', err));

        // When intro finishes, switch to the main audio
        introAudioElement.onended = () => {
          setIsIntroPlaying(false); // Switch to main content
          if (mainAudioElement) {
            mainAudioElement.src = `${BASE_URL}/uploads/${song.audio}`;
            mainAudioElement.load();
            mainAudioElement.play().catch((err) =>
              console.error('Main audio play error:', err)
            );
            setIsPlaying(true); // Start playing main audio
          }
        };
      }
    }
  }, [show, song]);

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = e.target.value / 100;
    }
    if (introAudioRef.current) {
      introAudioRef.current.volume = e.target.value / 100;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Body
        style={{ backgroundColor: '#101010', color: '#fff', padding: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '20px', boxShadow: '0 15px 30px rgba(0, 0, 0, 0.8)', }}>
        {/* Left Section - Album Artwork */}
        <div style={{ width: '100%', maxWidth: '300px', height: '300px', borderRadius: '10px' }}>
          <Image
            src={isIntroPlaying ? introImage : `${BASE_URL}/uploads/${song?.image}`}
            fluid
            className="album-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px', }} />
        </div>

        {/* Right Section - Song Info and Controls */}
        <div style={{ flex: 1, paddingLeft: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', }}>
            <h4 style={{ fontSize: '1.7em', fontWeight: '600', textTransform: 'uppercase', margin: 0, }} >
              {isIntroPlaying ? 'Intro Playing' : 'Now Playing'}
            </h4>
            <Button onClick={onHide} variant="outline-light" style={{ borderRadius: '50%', padding: '12px', width: '45px', height: '45px', fontSize: '1.4em', }} > &times; </Button>
          </div>
          <h5 style={{ fontSize: '1.5em', fontWeight: '500', marginBottom: '30px' }}>
            {isIntroPlaying ? 'Intro Music' : song?.songname || 'Unknown Song'}
          </h5>

          {/* Volume Control */}
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
            <FaVolumeUp size={25} style={{ color: 'white' }} />
            <input
              type="range"
              value={volume}
              onChange={handleVolumeChange}
              min="0"
              max="100"
              style={{ width: '100%', marginLeft: '10px', backgroundColor: '#555', borderRadius: '12px', }} />
          </div>
        </div>
      </Modal.Body>

      {/* Intro and Main Audio Elements */}
      <audio ref={introAudioRef} src={introAudio} />
      <audio ref={audioRef} />
    </Modal>
  );
}

export default MusicModal;
