 var express = require("express");
var router = express.Router();
const authenticateToken = require("../autheticateToken");
const ProductCategoryModel = require("../modals/ProductCategory");

router.get("/", authenticateToken, async function (req, res, next) {
  try {
    let productCategory = await ProductCategoryModel.find({});
    res.send(productCategory);
  } catch (error) {
    console.log(error);
  }
});
router.post("/", authenticateToken, async function (req, res, next) {
  try {
    const productCategoryInput = {
        "productCategoryName": req.body.productCategoryName,
        "productCategoryOwner": req.user.id
    }
    const productCategory = new ProductCategoryModel(productCategoryInput)
    const productCat = await productCategory.save();
    res.send(`productCategory ${req.body.productCategoryName} is saved.`);
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
        let productCategory = await ProductCategoryModel.findByIdAndDelete(id);
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
    let productCategory = await ProductCategoryModel.findById(id);
    res.send(productCategory);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
