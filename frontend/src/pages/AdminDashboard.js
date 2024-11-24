import React, { useState } from "react";
import Layout from "../components/Layout";
import "./AdminDashboard.css";
import { CreateAuth } from "../context/Authcontext";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState(""); // Keeps track of the active section
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [auth] = CreateAuth();
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ]);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    console.log("New Category:", category);
    setCategory("");
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    console.log("New Product:", productName, "Price:", productPrice);
    setProductName("");
    setProductPrice("");
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard_sidebar">
          <h3 className="sidebar_heading">Admin Menu</h3>
          <button
            className="sidebar_btn"
            onClick={() => handleViewChange("createCategory")}
          >
            Create Category
          </button>
          <button
            className="sidebar_btn"
            onClick={() => handleViewChange("createProduct")}
          >
            Create Product
          </button>
          <button
            className="sidebar_btn"
            onClick={() => handleViewChange("showUsers")}
          >
            Show Users
          </button>
        </div>

        <div className="dashboard_main">
          {currentView === "createCategory" && (
            <div className="main_section">
              <h2 className="section_heading">Create Category</h2>
              <form className="category_form" onSubmit={handleCategorySubmit}>
                <label className="form_label">Category Name:</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form_input"
                />
                <button type="submit" className="form_submit_btn">
                  Add Category
                </button>
              </form>
            </div>
          )}

          {currentView === "createProduct" && (
            <div className="main_section">
              <h2 className="section_heading">Create Product</h2>
              <form className="product_form" onSubmit={handleProductSubmit}>
                <label className="form_label">Product Name:</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="form_input"
                />
                <label className="form_label">Product Price:</label>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  className="form_input"
                />
                <button type="submit" className="form_submit_btn">
                  Add Product
                </button>
              </form>
            </div>
          )}

          {currentView === "showUsers" && (
            <div className="main_section">
              <h2 className="section_heading">User List</h2>
              <ul className="user_list">
                <li key={auth.user.id} className="user_list_item">
                  {auth.user.name}
                </li>
                <li key={auth.user.id} className="user_list_item">
                  {auth.user.email}
                </li>

                {console.log(auth.user)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
