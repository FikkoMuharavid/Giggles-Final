import "../styles/job-card.css";

const JobCard = ({ item }) => {
  if (!item) {
    return null;
  }
  const { image, name: title, jobCount: count } = item;

  return (
    <div className="job-card">
      <img src={image} alt={`${title} Icon`} />
      <div className="job-details">
        <div className="job-title">{title}</div>
        <div className="job-count">{count} Jobs</div>
      </div>
    </div>
  );
};

export default JobCard;
