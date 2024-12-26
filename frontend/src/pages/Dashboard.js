import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Buycard from "../components/Buycard";
import "./dashboard.css";

const Dashboard = () => {
  const [products, SetProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const getproducts = async (e) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      SetProducts(data.data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getcategory = async (e) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getcategory`
      );
      setCategories(data.data.data);
      console.log(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getproducts();
    getcategory();
    console.log(products);
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Layout>
        <div className="container  mt-5 mb-4 ">
          <div className="row g-4">
            {" "}
            {products.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <Buycard product={product} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
