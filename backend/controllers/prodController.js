const { default: slugify } = require("slugify");
const prodModel = require("../models/product");

const createProdController = async (req, res) => {
  try {
    const { name, description, slug, qty, shipped, category } = req.fields;
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

module.exports = { createProdController };
