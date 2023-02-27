const Products = require("../model/product");

module.exports = {
  addProduct: async (req, res) => {
    try {
      const { image, name, category, seller, price } = req.body;
      if (!image || !name || !category || !seller || !price) {
        throw { status: 400, message: "required field cannot be empty" };
      }
      //   const productFound = await Products.findOne({
      //     where: {
      //       url: url,
      //     },
      //   });
      //   if (productFound) {
      //     throw { status: 409, message: "Product already exists." };
      //   }
      const product = await Products.create({
        image,
        name,
        category,
        seller,
        price,
      });
      res.status(201).send(product);
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).send(err.message || "Something went wrong!");
    }
  },
  getProducts: async (req, res) => {
    try {
      const products = await Products.find();
      res.status(200).send(products);
    } catch (error) {
      console.log(err);
      return res.status(err.status || 500).send(err.message || "Something went wrong");
    }
  },
  getSingleProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Products.findById(id);
      res.send({ code: 200, message: "fetch by id success", data });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).send(err.message || "Something went wrong!");
    }
  },
  editProduct: async (req, res) => {
    try {
      const { image, name, category, seller, price, id } = req.body;
      const updateProduct = await Products.findOneAndUpdate(
        {
          _id: id,
        },
        {
          image: image,
          name: name,
          category: category,
          seller: seller,
          price: price,
        },
        { new: true } // show updated user
      );
      res.send({ code: 200, message: "edit success", updateProduct });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).send(err.message || "Something went wrong");
    }
  },
  deleteProducts: async (req, res) => {
    try {
      console.log("dafasfasas");
      const ids = req.body;
      console.log(ids);
      await Products.deleteMany({ _id: { $in: ids } });
      res.send({ code: 200, message: "deleted success" });
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).send(err.message || "Something went wrong");
    }
  },
  deleteAllProducts: async (req, res) => {
    try {
      await Products.deleteMany();
      res.status(200).json("All Products has been deleted");
    } catch (err) {
      console.log(err);
      return res.status(err.status || 500).send(err.message || "Something went wrong");
    }
  },
};
