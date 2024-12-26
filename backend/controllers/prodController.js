const { default: slugify } = require("slugify");
const prodModel = require("../models/product");
const fs = require("fs");
const categoryModel = require("../models/category");

const createProdController = async (req, res) => {
  try {
    const { name, description, slug, qty, shipped, category, price } =
      req.fields;
    const { image } = req.files;
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !qty:
        return res.status(400).send({ error: "Quantity is required" });
      case !shipped:
        return res.status(400).send({ error: "Shipped is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !image && image.size > 1000000:
        return res
          .status(400)
          .send({ error: "Image is required and should be less than 1MB" });
    }
    const product = new prodModel({ ...req.fields, slug: slugify(name) });
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();
    res
      .status(201)
      .send({ success: true, message: "product created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "unable to create ", success: false });
  }
};
const getProdController = async (req, res) => {
  try {
    const products = await prodModel
      .find({})
      .populate("category")
      .select("-image")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
const getSingleProductController = async (req, res) => {
  try {
    const product = await prodModel
      .findOne({ slug: req.params.slug })
      .select("-image")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// get photo
const productPhotoController = async (req, res) => {
  try {
    const product = await prodModel.findById(req.params.pid).select("image");
    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      return res.status(200).send(product.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
const deleteProductController = async (req, res) => {
  try {
    await prodModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
// const updateProductController = async (req, res) => {
//   try {
//     const { name, description, price, category, qty, shipped } = req.fields;
//     const { image } = req.files;
//     //alidation
//     switch (true) {
//       case !name:
//         return res.status(500).send({ error: "Name is Required" });
//       case !description:
//         return res.status(500).send({ error: "Description is Required" });
//       case !price:
//         return res.status(500).send({ error: "Price is Required" });
//       case !category:
//         return res.status(500).send({ error: "Category is Required" });
//       case !qty:
//         return res.status(500).send({ error: "Quantity is Required" });
//       case image && image.size > 1000000:
//         return res
//           .status(500)
//           .send({ error: "photo is Required and should be less then 1mb" });
//     }

//     const products = await prodModel.findByIdAndUpdate(
//       req.params.pid,
//       { ...req.fields, slug: slugify(name) },
//       { new: true }
//     );
//     if (image) {
//       products.image.data = fs.readFileSync(image.path);
//       products.image.contentType = image.type;
//     }
//     await products.save();
//     res.status(201).send({
//       success: true,
//       message: "Product Updated Successfully",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       error,
//       message: "Error in Update product",
//     });
//   }
// };

//update product 2.0
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, qty, shipped } = req.fields;
    const { image } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is Required" });
      case !description:
        return res.status(400).send({ error: "Description is Required" });
      case !price:
        return res.status(400).send({ error: "Price is Required" });
      case !category:
        return res.status(400).send({ error: "Category is Required" });
      case !qty:
        return res.status(400).send({ error: "Quantity is Required" });
      case image && image.size > 1000000:
        return res.status(400).send({ error: "Image should be less than 1MB" });
    }

    // Check if product exists
    const product = await prodModel.findById(req.params.pid);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Update product fields
    const updatedProduct = await prodModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    // Update image if provided
    if (image) {
      try {
        updatedProduct.image.data = fs.readFileSync(image.path);
        updatedProduct.image.contentType = image.type;
      } catch (err) {
        return res.status(500).send({ error: "Error processing image file" });
      }
    }

    await updatedProduct.save();

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("Server Error:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in updating product",
    });
  }
};

module.exports = {
  createProdController,
  productPhotoController,
  getProdController,
  updateProductController,
  getSingleProductController,
  deleteProductController,
};
