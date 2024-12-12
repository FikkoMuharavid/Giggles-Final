import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth-Register1.css';

function Register1() {
  return (
    <div className="register1">
      <header className="header">
        <div className="logoauth">GIGGLE'S</div>
        <div className="container">
          <div className="shape">
            <h2>First thing first,<br />Please select how you would like to register:</h2><br />
            <div className="shape2-container">
              <Link className="shape2" to="/register2?type=user">
                <h2 style={{ marginBottom: '-4%' }}>User</h2><br />
                You can create your portfolio and apply for exciting jobs
              </Link>
              <Link className="shape2" to="/register2?type=company">
                <h2 style={{ marginBottom: '-4%' }}>Company</h2><br />
                You can post jobs and hire <br /> people
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Register1;
