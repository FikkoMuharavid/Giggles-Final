import Navbar from "../components/Navbar";

function Hero({ title, subtitle, children }) {
  return (
    <header>
      <Navbar />
      <div className="containerHeader">
        <h2>{title}</h2>
        <p style={{ padding: "0 10%" }}>{subtitle}</p>

        {children}
      </div>
    </header>
  );
}

export default Hero;
