const express = require("express");
const router = express.Router();
const { getAllProducts, getProduct } = require("../database/products");

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  console.log(products);
  res.send({ status: "ok", data: products });
});

router.get("/:productId", async (req, res) => {
  console.log("Query product with id:", req.params.productId);
  try {
    const product = await getProduct(req.params.productId);

    if (!product) {
      res.status(404).send({ status: "FAILED", error: "Product not found" });
      return;
    }

    res.send({ status: "ok", data: product });
  } catch (error) {
    res.status(401).send({ status: "FAILED", error: error.message });
  }
});

module.exports = router;
