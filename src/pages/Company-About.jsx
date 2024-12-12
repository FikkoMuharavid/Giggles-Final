import NavbarEditCompany from "../components/NavbarEdit-Company";
import "../styles/Company-Profile.css";
import HeaderCompany from "../components/HeaderCompany";
import { useAuth } from "../AuthContext";
// import "../styles/Company-EditProfile.css";

function CompanyAbout() {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="pagecompany">
      <NavbarEditCompany />
      <div className="profile-container">
        <img className="profilcompany" src={`${user?.data?.company_profile}`} alt="" />
        <div className="tittle">{user?.data?.company_name}</div>
      </div>

      <HeaderCompany />

      <div className="companyd">
        <div className="containerDesc">
          <center>
            <div className="tittle">Description</div>
          </center>
          <br />
          <p style={{ textAlign: "justify" }}>
            {user?.data?.about_headline}
            <br />
            {user?.data?.about_body}
          </p>
          <div className="row">
            <div className="column">
              <h2>Visi</h2>
              <p style={{ textAlign: "justify" }}>{user?.data?.about_visi}</p>
            </div>
            <div className="column">
              <h2>Misi</h2>
              <p style={{ textAlign: "justify" }}>{user?.data?.about_misi}</p>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default CompanyAbout;
