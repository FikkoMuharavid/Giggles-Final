import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Carousel from "../components/Carousel";
import "../styles/gallery-detail.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GalleryDetail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const [galeries, setGaleries] = useState([]);
  const [items, setItems] = useState([]);
  const [rating, setRating] = useState([]);

  //RATING
  const [showOverlay, setShowOverlay] = useState(false); // Menampilkan overlay
  const [star, setStar] = useState(0); // Menyimpan rating pengguna
  const [review, setReview] = useState(""); // Menyimpan ulasan pengguna

  const handleShare = () => {
    const currentUrl = window.location.href; // Mendapatkan URL saat ini
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Link Copied!",
          text: "The link has been copied to your clipboard. Share it with your friends!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy the link: ", err);
        Swal.fire({
          icon: "error",
          title: "Failed to Copy",
          text: "Could not copy the link. Please try again.",
        });
      });
  };

  const handleRatingClick = (index) => {
    setStar(index); // Set rating berdasarkan klik
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/gallery/rate/${id}`,
        {
          rate: star,
          description: review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowOverlay(false); // Menutup overlay
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error uploading post:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upload post",
      });
    }
  };

  const getGalleryData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/gallery/${id}`
      );
      const responseOther = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/gallery/?user_id=${
          response.data.data.account_id
        }`
      );
      const responseRating = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/gallery/rate/${
          response.data.data.id
        }`
      );

      const formattedItems = responseOther.data.data.map((item) => ({
        text: item.title,
        image: item.image_post,
      }));

      setGaleries(response.data.data);
      setRating(responseRating.data.data);
      setItems(formattedItems);

      console.log(response.data.data);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/user/gallery/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });

      navigate("/gallery");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCollection = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/gallery/collection/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add collection",
      });
    }
  };

  useEffect(() => {
    getGalleryData();
  }, []);

  if (loading) {
    return <div>Loading . . .</div>;
  }

  return (
    <section>
      <Navbar />
      <div className="gallery-detail">
        <div className="gallery-profile">
          <div className="profile-header">
            <img
              alt="profile"
              className="profile-picture"
              src={
                galeries.user_profile
                  ? `${galeries.user_profile}`
                  : "/images/basicprofile.png"
              }
              style={{ width: "130px", height: "130px", objectFit: "cover" }}
            />
            <h3 className="profile-name">{galeries.user_name}</h3>
            <a
              href={`https://wa.me/${galeries.phone_number}`}
              target="_blank"
              className="collaborate-button"
            >
              Let&apos;s Collaborate
            </a>
          </div>

          <div className="gallery-main-image">
            <img
              alt="main"
              className="main-image"
              src={`${galeries.image_post}`}
              style={{
                width: "60vw",
                height: "50%",
                maxHeight: "600px",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="gallery-header">
            <h2 className="gallery-title">{galeries.title}</h2>
            <div className="gallery-icons">
              <img
                src="/images/category/Collection.png"
                className="gallery-icon"
                alt="share"
                onClick={handleAddCollection}
              />
              {/* Change This To Star Icon */}
              <img
                src="/images/stars.png"
                className="gallery-icon"
                alt="share"
                onClick={() => setShowOverlay(true)}
              />
              {/* Overlay */}
              {showOverlay && (
                <div className="overlay-rating">
                  <div className="rating-container">
                    <h3>Rate This Post</h3>

                    {/* Rating Bintang */}
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <span
                          key={index}
                          className={`star ${star >= index ? "selected" : ""}`}
                          onClick={() => handleRatingClick(index)}
                        >
                          ★
                        </span>
                      ))}
                    </div>

                    {/* Input Ulasan */}
                    <textarea
                      placeholder="Tulis ulasan Anda di sini..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="review-textarea"
                    ></textarea>

                    {/* Tombol Aksi */}
                    <div className="action-buttons">
                      <button
                        className="btnrate cancel"
                        onClick={() => setShowOverlay(false)}
                      >
                        Batal
                      </button>
                      <button className="btnrate submit" onClick={handleSubmit}>
                        Kirim
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <img
                src="/images/category/Share.png"
                className="gallery-icon"
                alt="share"
                onClick={handleShare}
              />

              {user?.data?.id === galeries.account_id && (
                <>
                  <img
                    src="/images/category/Edite.png"
                    className="gallery-icon"
                    alt="share"
                    onClick={() => {
                      const options = document.querySelector(".options");
                      options.style.display =
                        options.style.display === "none" ? "block" : "none";
                    }}
                  />
                  <div
                    className="options"
                    style={{
                      position: "absolute",
                      display: "none",
                      marginLeft: "50px",
                    }}
                  >
                    <button
                      className="overlay"
                      onClick={() => navigate(`/editpostcreation/${id}`)}
                    >
                      Edit
                    </button>
                    <br />
                    <button className="overlay" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="gallery-description">{galeries.description}</p>
        </div>
      </div>

      <div className="reviews-section">
        {rating.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-content">
              <img
                alt="profile"
                className="review-profile-picture"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  marginLeft: "20px",
                }}
                src={
                  review.user_profile
                    ? `${review.user_profile}`
                    : "/images/basicprofile.png"
                }
              />
              <div className="review-details">
                <h4 className="reviewer-name">{review.user_name}</h4>
                {Array.from({ length: review.rate }, (_, i) => (
                  <FaStar key={i} className="review-star" />
                ))}
                <p className="review-text">{review.rating_description}</p>
              </div>
              <p className="review-date">
                {new Date(review.rating_time).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="more-designs-section">
        <h1 className="more-designs-title" style={{ textDecoration: "none" }}>
          See more design by {galeries.user_name}
        </h1>
      </div>

      <div className="carousel-section">
        <Carousel items={items} />
      </div>

      <Footer />
    </section>
  );
};

export default GalleryDetail;
