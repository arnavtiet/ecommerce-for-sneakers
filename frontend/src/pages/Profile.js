// Profile.js
import React, { useState } from "react";
import Layout from "../components/Layout";
import { CreateAuth } from "../context/Authcontext";
import "./profile.css";
import profilepic from "../images/11073076.jpg";

const Profile = () => {
  const [auth] = CreateAuth();
  const [name, Setname] = useState(auth.user.name);
  const [email, Setemail] = useState(auth.user.email);
  const [phone, Setphone] = useState(auth.user.phone);
  const [addr, Setaddr] = useState(auth.user.address);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle form submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="reg-profile-container">
        <div className="reg-profile-user-info">
          <h1 className="reg-profile-name">{auth.user.name}</h1>
          <h2 className="reg-profile-phone">{auth.user.phone}</h2>
          <h2 className="reg-profile-email">{auth.user.email}</h2>
        </div>
        <div className="reg-profile-edit-form-container">
          <img src={profilepic} alt="profile" className="reg-profile-pic" />
          <form className="reg-profile-edit-form">
            <table className="reg-profile-edit-form-table">
              <tbody>
                <tr>
                  <th>
                    <input
                      className="reg-profile-edit-form-name"
                      value={name}
                      onChange={(e) => Setname(e.target.value)}
                    />
                  </th>
                </tr>
                <tr>
                  <th className="reg-profile-sec-row">
                    <input
                      type="email"
                      value={email}
                      className="reg-profile-edit-form-email"
                      onChange={(e) => Setemail(e.target.value)}
                    />
                    <input
                      value={phone}
                      type="text"
                      className="reg-profile-edit-form-phone"
                      onChange={(e) => Setphone(e.target.value)}
                    />
                  </th>
                </tr>
                <tr>
                  <th>
                    <input
                      value={addr}
                      className="reg-profile-edit-form-addr"
                      onChange={(e) => Setaddr(e.target.value)}
                    />
                  </th>
                </tr>
                <tr>
                  <th className="reg-profile-edit-form-submit-row">
                    <button
                      className="reg-profile-edit-form-submit"
                      onClick={handleSubmit}
                    >
                      Edit
                    </button>
                  </th>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
