var express = require("express");
var router = express.Router();
const authenticateToken = require("../autheticateToken");
const ProductModel = require("../modals/Product");

router.get("/", authenticateToken, async function (req, res, next) {
  try {
    let products = await ProductModel.find({});
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", authenticateToken, async function (req, res, next) {
  try {
    const SaveProduct = new ProductModel(req.body)
    const product = await SaveProduct.save();
    res.send(`products ${req.body.productName} is saved.`);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.delete(
  "/:id",
  authenticateToken,
  async function (req, res, next) {
    try {
      const id = req.params.id;
      if(id){
        let product = await ProductModel.findByIdAndDelete(id);
        res.send(`${id} deleted successfully`);
      }else{
        res.status(400).send("Please send valid id");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

router.get("/:id", authenticateToken, async function (req, res, next) {
  try {
    const id = req.params.id;
    let product = await ProductModel.findById(id);
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
