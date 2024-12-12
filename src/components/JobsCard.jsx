import JobCard from "./components/JobCard";
import "../../styles/job-card.css";

const jobData = [
  {
    image: "images/category/programmer.jpeg",
    title: "Programmer",
    count: 1000,
  },
  {
    image: "images/category/illustrator.png",
    title: "Illustrator",
    count: 1200,
  },
  {
    image: "images/category/webDesign.avif",
    title: "Web Design",
    count: 5555,
  },
  {
    image: "images/category/writing.png",
    title: "Writing",
    count: 8979,
  },
  {
    image: "images/category/photography.avif",
    title: "Photography",
    count: 800,
  },
  { image: "images/category/uiux.jpeg", title: "UI/UX", count: 1234 },
  {
    image: "images/category/interfaces.jpg",
    title: "Interfaces",
    count: 6767,
  },
  {
    image: "images/category/strategy.avif",
    title: "Strategy",
    count: 1200,
  },
];

const JobsCard = () => {
  return (
    <div className="job-grid-container">
      {jobData.map((job, index) => (
        <JobCard
          key={index}
          image={job.image}
          title={job.title}
          count={job.count}
        />
      ))}
    </div>
  );
};

export default JobsCard;