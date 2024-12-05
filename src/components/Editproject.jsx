import React, { useContext, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../Services/baseURL';
import { editUserProjectAPI } from '../Services/allAPI';
import { editprojectResponseContext } from '../context/ContextShare';

function EditProject({ project }) {
  const { editprojectResponse, seteditprojectResponse } = useContext(editprojectResponseContext);
  const [preview, setPreview] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    audio: project.audio,
    image: project.image,
    songname: project.songname,
    artistname: project.artistname,
  });

  // Update the preview when the image changes
  useEffect(() => {
    if (projectDetails.image && typeof projectDetails.image !== "string") {
      setPreview(URL.createObjectURL(projectDetails.image));
    } else {
      setPreview("");
    }
  }, [projectDetails.image]);

  const handleReset = () => {
    setProjectDetails({
      id: project._id,
      audio: project.audio,
      image: project.image,
      songname: project.songname,
      artistname: project.artistname,
    });
    setPreview("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { audio, image, songname, artistname, id } = projectDetails;

    if (!audio || !songname || !artistname || !id) {
      alert("Please fill all the required fields!");
      return;
    }

    const reqBody = new FormData();
    reqBody.append("audio", typeof audio === "string" ? audio : audio);
    reqBody.append("songname", songname);
    reqBody.append("artistname", artistname);

    // Add image only if updated or a new preview is set
    if (preview) {
      reqBody.append("image", image);
    }

    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": preview ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${token}`,
    };

    const result = await editUserProjectAPI(id, reqBody, reqHeader);
    if (result.status === 200) {
      seteditprojectResponse(result);
      alert("Project updated successfully!");
      handleClose();
    } else {
      alert(result.response?.data || "Failed to update the project.");
    }
  };

  return (
    <>
      <button className="btn bold" onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square text-info"></i>
      </button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-success">Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="projectImageUpload" className="w-100">
                <input
                  id="projectImageUpload"
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => setProjectDetails({ ...projectDetails, image: e.target.files[0] })}
                />
                <img
                  src={preview || `${BASE_URL}/uploads/${project.image}`}
                  alt="Project"
                  className="img-fluid border rounded"
                  style={{ height: "300px", objectFit: "cover", width: "100%" }}
                />
              </label>
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <div className="mb-3">
                <input
                  type="file"
                  accept="audio/*"
                  className="form-control border-success"
                  onChange={(e) => setProjectDetails({ ...projectDetails, audio: e.target.files[0] })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control border-success"
                  placeholder="Song Name"
                  value={projectDetails.songname}
                  onChange={(e) => setProjectDetails({ ...projectDetails, songname: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control border-success"
                  placeholder="Artist Name"
                  value={projectDetails.artistname}
                  onChange={(e) => setProjectDetails({ ...projectDetails, artistname: e.target.value })}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProject;
