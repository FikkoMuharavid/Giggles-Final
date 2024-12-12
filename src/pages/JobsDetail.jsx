// "use client";
import { useParams } from "react-router-dom";
import "../styles/job-detail.css";
import Spinner from "../components/Spiner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useAuth } from "../AuthContext";
// import Swal from "sweetalert2";

function JobsDetail() {
  // const { user } = useAuth();
  const params = useParams();
  const id = params.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const getJobData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/job/${id}`);
      setJob(response.data.data);
      console.log(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getJobData();
  }, []);

  // const handleApplyJob = async () => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/api/user/job/apply/${id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setLoading(false);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Success",
  //       text: response.data.message,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     setLoading(false);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Failed to apply job",
  //     });
  //   }
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <section>
      <Navbar />
      <div className="bg-background">
        <h1 className="text-header text-header-left">Job Detail</h1>
        <div className="flex-row">
          <div className="left-column">
            <h1 className="text-title">Open Position for {job?.position}</h1>
            <p className="text-subtitle">About {job?.company_name}:</p>
            <p className="text-body">{job?.about_body}</p>

            <p className="text-subtitle">Requirements:</p>
            <p className="text-body">{job?.description}</p><br /><br /><br /><br />
            <a href={job?.website} target="_blank" className="apply-now-button" style={{ padding: "20px 30px" }}>
          Apply Now
        </a>
          </div>

          <div className="right-column">
            <div className="company">
              <img id="image-company" className="company-img" src={`${job?.company_profile}`} alt={job?.company_name} style={{ width: "130px", height: "130px", borderRadius: "50%", objectFit: "cover" }} />
              <div className="company-info">
                <h2 className="company-name">{job?.company_name}</h2>
                <a href={job?.website} target="_blank" className="button-visit" style={{ padding: "20px 30px" }}>
                  Visit Company
                </a>
              </div>
            </div>
            <div className="mt-[65px] w-full">
              <img src={`${job?.image_job}`} className="image-company" alt={job?.title} style={{ width: "30vw", height: "30vw", objectFit: "cover" }} />
            </div>
          </div>
        </div>
        {/* {user?.data && ( */}
        
        {/* )} */}
      </div>
      <Footer />
    </section>
  );
}

export default JobsDetail;
