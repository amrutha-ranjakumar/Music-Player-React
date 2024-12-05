import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addprojectAPI } from '../Services/allAPI';
import { addprojectResponseContext } from '../context/ContextShare';

function AddProject() {
  const { addprojectResponse, setAddprojectResponse } = useContext(addprojectResponseContext);
  const [preView, setPreview] = useState('');
  const [token, setToken] = useState('');
  const [projectDetails, setprojectDetails] = useState({
    audio: '',
    image: '',
    songname: '',
    artistname: '',
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { audio, image, songname, artistname } = projectDetails;

    if (!audio || !image || !songname || !artistname) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const reqBody = new FormData();
      reqBody.append('audio', audio);
      reqBody.append('image', image);
      reqBody.append('songname', songname);
      reqBody.append('artistname', artistname);

      const reqHeader = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      };

      const result = await addprojectAPI(reqBody, reqHeader);

      if (result.status === 200) {
        alert('Project added successfully');
        setAddprojectResponse(result.data);
        handleCloseClear();
        handleClose();
      } else {
        alert(result.response.data || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project');
    }
  };

  const handleCloseClear = () => {
    setprojectDetails({
      audio: '',
      image: '',
      songname: '',
      artistname: '',
    });
    setPreview('');
  };

  useEffect(() => {
    if (projectDetails.image) {
      setPreview(URL.createObjectURL(projectDetails.image));
    }
  }, [projectDetails.image]);

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, []);

  return (
    <>
      <Button variant="primary px-4 py-2" onClick={handleShow}>
        Add Song
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="border-0  text-white" style={{ backgroundColor: "#cc0000" }}>
          <Modal.Title className="mx-auto">Add a New Song</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <div className="row">
            <div className="col-lg-6">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <label htmlFor="imageUpload" className="w-100">
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) =>
                        setprojectDetails({ ...projectDetails, image: e.target.files[0] })
                      }
                    />
                    <img
                      src={
                        preView ||
                        'https://via.placeholder.com/300?text=Upload+Image'
                      }
                      alt="Preview"
                      className="img-fluid rounded mb-3"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />

                  </label>
                  <Button variant="outline-primary">Upload Image</Button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Audio File</Form.Label>
                  <Form.Control
                    type="file"
                    accept="audio/*"
                    onChange={(e) =>
                      setprojectDetails({ ...projectDetails, audio: e.target.files[0] })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Song Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter song name"
                    value={projectDetails.songname}
                    onChange={(e) =>
                      setprojectDetails({ ...projectDetails, songname: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Artist Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter artist name"
                    value={projectDetails.artistname}
                    onChange={(e) =>
                      setprojectDetails({ ...projectDetails, artistname: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-light border-0">
          <Button variant="outline-secondary" onClick={handleCloseClear}>
            Clear
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add Song
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProject;
