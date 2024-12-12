import HeaderCompany from "../components/HeaderCompany";
import NavbarEditCompany from "../components/NavbarEdit-Company";
import "../styles/Company-Profile.css";
import { useAuth } from "../AuthContext";

const CompanyContact = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <div className="pagecompany">
      <NavbarEditCompany />

      <div className="profile-container">
        <img className="profilcompany" src={`${user?.data?.company_profile}`} alt="" style={{ width: "" }} />
        <div className="tittle">{user?.data?.company_name}</div>
      </div>

      <HeaderCompany />

      <div className="companyd">
        <div className="containerDescContact">
          <div className="info">
            <div className="tittle">{user?.data?.company_name}</div>
            <a
              className="btnSecondary"
              href={user?.data?.website}
              target="_blank"
              style={{
                display: "inline-block",
                marginBottom: "40px",
                marginTop: "10px",
              }}
            >
              Visit Website
            </a>
            <div className="contact-item">
              <i className="bi bi-envelope"></i>
              <p>{user?.data?.email}</p>
            </div>
            <div className="contact-item">
              <i className="bi bi-telephone"></i>
              <p>{user?.data?.phone_number}</p>
            </div>
            <div className="contact-item">
              <i className="bi bi-geo-alt"></i>
              <p>{user?.data?.company_address}</p>
            </div>
          </div>
          <div className="map">
            <iframe allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={user?.data?.company_location} />
          
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default CompanyContact;
