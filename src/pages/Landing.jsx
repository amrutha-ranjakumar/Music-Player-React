import React from 'react';
import Image2 from '../assets/Happy.png';
import Image1 from '../assets/headphone.png';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      {/* First Section: Image Background with Text */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '80vh', background: `url(${Image2}) no-repeat center center`, backgroundSize: 'cover', position: 'relative', padding: '20px', borderRadius: '10px', }}>
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          // Subtle dark overlay
        }}
        ></div>

        {/* Content Container */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'left', color: '#fff', padding: '10px', maxWidth: '500px', marginRight: '50px', }} >
          <h1 style={{
            fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.3', textTransform: 'uppercase', color: '#ff7e5f', // Highlighted text color
          }}
          > Listen to <span style={{ color: '#fff' }}>Your Favorites</span>
          </h1>
          <p style={{
            fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '30px', fontWeight: '400', color: '#f0f0f0',
          }}
          >
            Discover new tunes, craft your playlists, and immerse yourself in music that moves you. A world of melody awaits.
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to='/login '>
              <button style={{
                padding: '15px 30px', fontSize: '1.2rem', fontWeight: '600', color: '#fff', backgroundColor: '#ff7e5f', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.2s ease',
              }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#feb47b';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ff7e5f';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Get Started
              </button>
            </Link>

            <button style={{
              padding: '15px 30px', fontSize: '1.2rem', fontWeight: '600', color: '#ff7e5f', backgroundColor: 'transparent', border: '2px solid #ff7e5f', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ff7e5f';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ff7e5f';
              }}
            >
              Learn More
            </button>
          </div>

        </div>
      </div>

      {/* Second Section: Image and Music Player */}
      <div className='mt-5 mb-5 me-5' style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif', marginLeft: '60px' }}>
        {/* Left Section: Image */}
        <div style={{
          flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', background: `url(${Image1}) no-repeat center center`, backgroundSize: 'cover',
          borderRadius: '50px', // Added rounded corners to the image section
          backgroundColor: '#1a1a1a',
          color: '#fff',
        }}
        ></div>

        {/* Right Section: Content */}
        <div style={{
          flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '20px', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '60px',
        }}
        >
          <h1 style={{ fontSize: '3rem', fontWeight: '300', marginBottom: '20px', color: '#ff6f61' }} className='mt-5'>
            Your Personal Music Hub</h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '30px', color: '#e6e6e6', }}
          >
            Enjoy seamless music streaming. Explore trending hits, create your favorite playlists, and elevate your mood with every beat.
          </p>

          {/* Music Player Section */}
          <div
            style={{ width: '100%', maxWidth: '600px', padding: '25px', backgroundColor: '#333', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column', gap: '20px', }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#fff' }}>Now Playing</h3>
              <button style={{ backgroundColor: '#ff6f61', color: '#fff', border: 'none', borderRadius: '50%', width: '35px', height: '35px', fontSize: '1.2rem', cursor: 'pointer', }}
              >
                X
              </button>
            </div>
            <p style={{ color: '#ff6f61', fontSize: '1.2rem' }}>"Shape of You" - Ed Sheeran</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button
                style={{ backgroundColor: '#ff6f61', color: '#fff', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '2rem', cursor: 'pointer', }} >
                ▶
              </button>

              <div style={{ flex: '1', height: '6px', background: '#444', borderRadius: '5px', position: 'relative', }}
              ><div style={{ width: '55%', height: '100%', background: '#ff6f61', borderRadius: '5px', }}></div> </div><span style={{ fontSize: '1rem', color: '#ccc' }}>02:34 / 03:56</span>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section: Additional Features */}
      <div style={{ backgroundColor: '#1f1f1f', padding: '50px 0', textAlign: 'center', color: '#fff', }}
      > <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#ff7e5f', marginBottom: '20px', }} >
          More Ways to Enjoy Music
        </h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#e6e6e6', maxWidth: '800px', margin: '0 auto', }}
        >Whether you're at home, on the go, or with friends, our platform lets you stream music anytime, anywhere. Create playlists, share your favorite songs, and connect with others through music.
        </p>

        <div style={{ marginTop: '30px' }}><button style={{ padding: '15px 30px', fontSize: '1.2rem', fontWeight: '600', color: '#fff', backgroundColor: '#ff7e5f', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.2s ease', }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#feb47b';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ff7e5f';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Discover More Features
        </button>
        </div>
      </div>

    </div>
  );
}

export default Landing;
