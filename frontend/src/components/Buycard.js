import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import testimage from "../images/testproduct.jpg";
import { faCartShopping, faTruck } from "@fortawesome/free-solid-svg-icons";
import "./buycard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Buycard = ({ product }) => {
  const [showTitle, setShowTitle] = useState(false);
  const [isWobbling, setIsWobbling] = useState(false);
  const handleClick = () => {
    setIsWobbling(true);
    setTimeout(() => {
      setIsWobbling(false);
    }, 800);
  };
  return (
    <Card
      className="buycard"
      style={{
        width: "18rem",

        border: "3px solid black",
        boxShadow: "5px 5px 1px black",
        minHeight: "35rem",
        maxHeight: "max-content",
      }}
    >
      <Card.Img
        variant="top"
        src={`${process.env.REACT_APP_API}/api/v1/product/prod-photo/${product._id}`}
        className="buycard-img"
      />
      <Card.Body>
        <Card.Title className="text-center custom-font fs-1 ">
          {product.name}
        </Card.Title>
        <Card.Text className="text-center  custom-font-light fs-5 ">
          {product.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Text className="text-RIGHT  custom-font-medium fs-4 ">
            Rs.{product.price}
          </Card.Text>

          <button
            type="button"
            className={`buy-btn ${
              isWobbling ? "animate__animated animate__wobble " : ""
            }`}
            onMouseEnter={() => setShowTitle(true)}
            onMouseLeave={() => setShowTitle(false)}
            onClick={handleClick}
          >
            {showTitle && (
              <FontAwesomeIcon
                style={{
                  opacity: showTitle ? 1 : 0,
                }}
                className="add-to-cart"
                icon={faTruck}
              />
            )}
            <FontAwesomeIcon
              icon={faCartShopping}
              className="cart-icon "
              style={{
                opacity: showTitle ? 0 : 1,
              }}
            />
            {/* <FontAwesomeIcon icon="fa-regular fa-cart-shopping" /> */}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Buycard;
