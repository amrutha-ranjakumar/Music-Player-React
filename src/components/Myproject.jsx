import React, { useContext, useEffect, useState } from 'react';
import Addproject from './Addproject';
import Editproject from './Editproject';
import { addprojectResponseContext, editprojectResponseContext } from '../context/ContextShare';
import { deleteprojectAPI, userprojectAPI } from '../Services/allAPI';
import { BASE_URL } from '../Services/baseURL';

function Myproject() {
  const { addprojectResponse, setAddprojectResponse } = useContext(addprojectResponseContext);
  const { editprojectResponse, seteditprojectResponse } = useContext(editprojectResponseContext);

  const [userproject, setuserproject] = useState([]);

  const getUserproject = async () => {
    const token = sessionStorage.getItem('token');
    const reqHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const result = await userprojectAPI(reqHeader);
    setuserproject(result.data);
  };

  useEffect(() => {
    getUserproject();
  }, [addprojectResponse, editprojectResponse]);

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };
    const result = await deleteprojectAPI(id, reqHeader);
    if (result.status === 200) {
      alert("Project deleted successfully");
      getUserproject();
    }
  };

  return (
    <div className="container mt-5 mb-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <h3 className="text-white">My songs</h3>
        <Addproject />
      </div>

      {/* Table Section with Background Color */}
      <div className="table-responsive ms-5">
        <table className="table table-borderless table-striped table-hover" >

          <tbody>
            {userproject?.length > 0 ? (
              userproject.map((item) => (
                <tr
                  key={item.id}
                  className="align-middle animate__animated animate__fadeInUp"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <td style={{ backgroundColor: '#1a0006', color: '#fff' }}>{item.songname}</td>
                  <td style={{ backgroundColor: '#1a0006', color: '#fff' }}>{item.artistname}</td>
                  <td style={{ backgroundColor: '#1a0006', color: '#fff' }} >
                    {item.audio && (
                      <audio controls>
                        <source
                          src={`${BASE_URL}/uploads/${item.audio}`}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </td>
                  <td style={{ backgroundColor: '#1a0006', color: '#fff' }}>
                    <div >
                      <Editproject project={item} />


                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ backgroundColor: '#1a0006', color: '#fff' }} colSpan="4" className="text-center text-danger">
                  No music uploaded yet!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Myproject;
