import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/job-item-card.css";

function JobsItemCard({ item }) {
  const navigate = useNavigate();
  const params = useParams();
  const category = params.category;

  const handleDetail = () => {
    navigate(`/jobs/${item.id}`);
  };

  return (
    <div className="job-item-card">
      <div className="job-item-content" data-aos="fade-up">
        <img src={`${item.image_job}`} alt={item.image_job} className="job-item-image" />
        
        <div className="job-item-text">
          <h3 className="company-name">{item.company_name}</h3>
          <h3 className="job-title">
            {item.position} - {item.company_name}
          </h3>
          <p className="job-description">{item.description}</p>
        </div>
        <div className="job-item-button-container">
          <button onClick={handleDetail} className="job-item-button">
            <div className="button-content">
              <span className="button-text">Learn More</span>
              <FaArrowRight color="white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobsItemCard;
