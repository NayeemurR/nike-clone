const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://nayeemur:lqY7A1LlHa3nbnoL@cluster0.p7uljmv.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const database = client.db("test");
const products = database.collection("products");
const orders = database.collection("orders");

module.exports = { products, orders };
