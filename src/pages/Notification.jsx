import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Notification.css";
import axios from "axios";
import { formatDistanceToNow, parseISO } from "date-fns";
import Swal from "sweetalert2";

function Notification() {
  const [notif, setNotif] = useState([]);

  const handleMarkReadNotif = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/notification/mark-read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to mark as read",
      });
    }
  };

  const getNotifData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/notification`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotif(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNotifData();
  }, []);

  function TimeAgo(timestamp) {
    if (!timestamp) return null;

    const timeAgo = formatDistanceToNow(parseISO(timestamp), { addSuffix: true });

    return timeAgo;
  }

  return (
    <div className="notifpage">
      <Navbar />
      <div className="container">
        <h2>Notification</h2>
        <br />
        <div className="containerAction">
          <button onClick={handleMarkReadNotif} style={{ color: "#ffffffbb" }}>
            <i className="bi bi-check2-all" style={{ fontSize: "24px" }}></i> Mark as read
          </button>
          <a href="" style={{ marginLeft: "3%" }}>
            Clear all
          </a>
        </div>
        <h3>Today</h3>

        {notif.map((notifData) => (
          <div key={notifData.id} className="notification">
            <div className="imgProfile">
            <img alt="Profile picture of Aufa Sarifatun" height="60px" src="/images/basicprofile.png" width="60px" />
              {/* <img alt="Profile picture of Aufa Sarifatun" height="60px" src={`/${notifData.user_profile}`} width="60px" /> */}
            </div>

            <div className="content">
              <h4>{notifData.title}</h4>
              <p>{notifData.message}</p>
              <span className="time">{TimeAgo(notifData.time)}</span>
            </div>
            <div className="gambar">
              <img className="imgNotif" alt="Thumbnail of the post commented on" src={`${notifData.image_post}`} />
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Notification;
