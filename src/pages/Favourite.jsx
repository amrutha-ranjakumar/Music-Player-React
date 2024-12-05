import React, { useState, useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { FaTrash, FaDownload } from 'react-icons/fa';
import { BASE_URL } from '../Services/baseURL';
import { saveAs } from 'file-saver'; // Importing the file-saver package
import { useLocation } from 'react-router-dom'; // For accessing passed state

function Favourite() {
  const [favourites, setFavourites] = useState([]);
  const location = useLocation(); // Access the location state
  const isPaid = location.state?.isPaid || false; // Check if the payment was successful

  // Fetch favourites from localStorage on component mount
  useEffect(() => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(storedFavourites);
  }, []);

  // Another approach to delete a favourite song by id
  const handleRemoveFavourite = (songId) => {
    const updatedFavourites = [...favourites];
    const indexToRemove = updatedFavourites.findIndex(song => song.id === songId);

    if (indexToRemove !== -1) {
      updatedFavourites.splice(indexToRemove, 1);
    }

    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  // Download audio function using FileSaver.js
  const handleDownload = (audioFileName) => {
    const audioUrl = `${BASE_URL}/uploads/${audioFileName}`;

    // Use FileSaver.js to save the audio file
    saveAs(audioUrl, audioFileName); // Triggers the download
  };

  return (
    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: '#1a0006', color: '#fff', minHeight: '60vh' }} >
      <Container fluid className="py-5">
        <h1 className="text-center mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>
          Your Favourites
        </h1>

        <div className="table-wrapper" style={{ overflowX: 'auto', backgroundColor: '#1a0006', borderRadius: '10px', padding: '20px', boxShadow: '#ffd699' }}>
          <Table responsive className="table-modern text-center table table-borderless table-striped table-hover" style={{ margin: 0 }}>

            <tbody>
              {favourites.length > 0 ? (
                favourites.map((song, index) => (
                  <tr key={song.id} style={{ backgroundColor: index % 2 === 0 ? '#ffd699' : '#ffd699', color: '#ffd699' }}>
                    <td style={{ backgroundColor: '#1a0006', color: '#fff' }} className="align-middle">{index + 1}</td>
                    <td style={{ backgroundColor: '#1a0006', color: '#fff' }} className="align-middle">
                      <img
                        src={`${BASE_URL}/uploads/${song.image}`}
                        width="60"
                        alt={song.songname}
                        style={{ borderRadius: '8px', border: '2px solid #ffd699' }}
                      />
                    </td>
                    <td className="align-middle" style={{ fontWeight: '500', backgroundColor: '#1a0006', color: '#fff' }}>
                      {song.songname}
                    </td>
                    <td style={{ backgroundColor: '#1a0006', color: '#fff' }} className="align-middle">
                      <audio controls>
                        <source
                          src={`${BASE_URL}/uploads/${song.audio}`}
                          type="audio/mp3"
                        />
                      </audio>
                    </td>
                    <td style={{ backgroundColor: '#1a0006', color: '#fff' }} className="align-middle">
                      <Button
                        variant="outline-danger"
                        className="mx-1"
                        onClick={() => handleRemoveFavourite(song.id)}  // Call remove function on click
                      >
                        <FaTrash />
                      </Button>
                      {/* Download button is only visible if payment is successful */}
                      {isPaid && (
                        <Button
                          variant="outline-success"
                          className="mx-1"
                          onClick={() => handleDownload(song.audio)}  // Call download function on click
                        >
                          <FaDownload />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ backgroundColor: '#1a0006', color: '#ffd699', fontStyle: 'italic' }}>
                    No songs in your favourites
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default Favourite;
