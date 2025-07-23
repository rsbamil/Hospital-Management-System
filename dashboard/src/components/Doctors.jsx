import React, { useContext, useEffect, useState } from "react";
import { context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Doctors = () => {
  const { isAuthenticated } = useContext(context);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/user/doctors",
          { withCredentials: true }
        );
        console.log(data);
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return navigate("/login");
  }
  return (
    <>
      <section className="page doctors">
        <h1>Doctors</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((doc, idx) => {
              return (
                <div key={idx} className="card">
                  <img
                    src={doc.docAvatar && doc.docAvatar.url}
                    alt="doc-avatar"
                  />
                  <h4>{`${doc.firstName} ${doc.lastName}`}</h4>
                  <div className="details">
                    <p>
                      Email : <span>{doc.email}</span>
                    </p>
                    <p>
                      Phone : <span>{doc.phone}</span>
                    </p>
                    <p>
                      DOB : <span>{doc.dob.substring(0, 10)}</span>
                    </p>
                    <p>
                      Department : <span>{doc.doctorDepartment}</span>
                    </p>
                    <p>
                      NIC : <span>{doc.nic}</span>
                    </p>
                    <p>
                      Gender : <span>{doc.gender}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Registered Doctor Found</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
