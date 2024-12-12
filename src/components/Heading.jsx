import "../styles/heading.css";

const Heading = ({ title, subtitle }) => {
  return (
    <div className="title">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default Heading;