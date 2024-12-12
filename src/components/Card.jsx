import { useNavigate } from "react-router-dom";
import "../styles/card.css";

const Card = ({ image, name, id }) => {
  const navigate = useNavigate();

  const handleCLick = () => {
    navigate("/gallery/" + id);
  };

  return (
    // <div data-aos="fade-up" onClick={handleCLick} className="card-container">
    <div onClick={handleCLick} className="card-container">
      <img src={image} alt={name} className="card-image" />
      <p className="card-name">{name}</p>
    </div>
  );
};

export default Card;
