import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faSquareInstagram,
  faYoutube,
  faMeta,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-main">
          <div class="footer-container">
            <h3 className="footer-text">
              All rights reserved &copy; Arnav Chaudhary
            </h3>
          </div>

          <div className="footer-social">
            <button className="short-btn">
              <FontAwesomeIcon icon={faSquareInstagram} size="xl" />
            </button>
            <button className="short-btn">
              <FontAwesomeIcon icon={faYoutube} size="xl" />
            </button>
            <button className="short-btn">
              <FontAwesomeIcon icon={faMeta} size="l" />
            </button>
            <button className="short-btn">
              <FontAwesomeIcon icon={faLinkedin} size="xl" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
