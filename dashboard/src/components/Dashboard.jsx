import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../main";
import axios from "axios";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { isAuthenticated, user } = useContext(context);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/appointment/getAll",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
        console.log("Some error occurred while fetching appointments", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return navigate("/login");
  }
  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                obcaecati iusto veritatis, quidem id assumenda doloremque
                inventore neque?
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            {appointments && appointments.length > 0 ? (
              <h3>{appointments.length}</h3>
            ) : (
              <h3>No Appointments</h3>
            )}
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>20</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Rejected"
                              ? "value-rejected"
                              : "value-accepted"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>
                        {appointment.hasVisited ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h1>No Appointments</h1>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
