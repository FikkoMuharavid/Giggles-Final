import NavbarEditCompany from "../components/NavbarEdit-Company";
import HeaderCompany from "../components/HeaderCompany";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const CompanyJobList = () => {
  const { user } = useAuth();
  const [job, setJob] = useState([]);
  const navigate = useNavigate();

  const getJobData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/company/job`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJob(response.data.data);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnClick = (id) => {
    navigate("/jobs/" + id);
  };

  useEffect(() => {
    getJobData();
  }, []);

  return (
    <div className="pagecompany">
      <NavbarEditCompany />

      <div className="profile-container">
        <img className="profilcompany"
         src={`${user?.data?.company_profile}`} alt="" style={{ width: "100px" }} />
        <div className="tittle">{user?.data?.company_name}</div>
      </div>

      <HeaderCompany />

      <div className="companyd">
        <div className="containerDescJobList">
          <NavLink to="/company-edit-postjob">
            <button className="btnSecondary">Post New Job</button>
          </NavLink>
          <div className="card-containerz">
            {job.map((job) => (
              <div key={job.id} className="cardz">
                <img alt="Microsoft logo" height="60" src={`${job.company_profile}`} width="60" />
                <div className="card-content">
                  <p>{job.company_name}</p>
                  <h3>{job.position}</h3>
                  <p style={{ paddingTop: "5px" }}>{job.description}</p>
                </div>
                <button className="learn-more-btn" onClick={() => handleOnClick(job.id)}>
                  Learn More
                  <i className="bi bi-arrow-right"> </i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default CompanyJobList;
