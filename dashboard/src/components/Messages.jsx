import React, { useContext, useEffect, useState } from "react";
import { context } from "../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/");
    }
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/message/getAll",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log("Error occurred while fetching messages", error);
      }
    };
    fetchMessages();
  }, []);

  return (
    <section className="page messages">
      <h1>Messages</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((elem, idx) => {
            return (
              <div className="card" key={idx}>
                <div className="details">
                  <p>
                    First Name : <span>{elem.firstName}</span>
                  </p>
                  <p>
                    Last Name : <span>{elem.lastName}</span>
                  </p>
                  <p>
                    Email : <span>{elem.email}</span>
                  </p>
                  <p>
                    Phone : <span>{elem.phone}</span>
                  </p>
                  <p>
                    Message : <span>{elem.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
