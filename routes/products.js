var express = require("express");
var router = express.Router();
var fs = require("fs");
const filename = "products.csv";

function getProductObj(productString) {
  const productArr = productString.split(",");
  const productObj = {
    id: productArr[0],
    name: productArr[1],
    discription: productArr[2],
    price: productArr[3],
    stock: productArr[4],
    category: productArr[5],
    thumbnail: productArr[6],
  };

  return productObj;
}
router.get("/", async function (req, res, next) {
  try {
    const fileData = await fs.readFileSync(filename, {
      encoding: "utf8",
      flag: "r",
    });
    if (fileData === "") {
      res.send("No products found");
    } else {
      const products = fileData.split("\n");
      const productsArray = [];
      products.splice(products.length - 1, 1);
      products.forEach((product) => {
        const productObj = getProductObj(product);
        productsArray.push(productObj);
      });
      res.send(productsArray);
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/product", async function (req, res, next) {
  try {
    const data = await fs.readFileSync(filename, {
      encoding: "utf8",
      flag: "r",
    });
    let id = 0;
    if (data === "") {
      id = 1;
    } else {
      const products = data.split("\n");
      const lastElement = products[products.length - 2];
      const lastElementArray = lastElement.split(",");
      id = +lastElementArray[0] + 1;
    }
    const fileString = `${id},${req.body.name},${req.body.discription},${req.body.price},${req.body.stock},${req.body.category},${req.body.thumbnail}\n`;
    fs.appendFileSync(filename, fileString, "utf8", function (err) {
      if (err) {
        console.log(
          "Some error occured - file either not saved or corrupted file saved."
        );
      } else {
        console.log("It's saved!");
      }
    });
    res.send(`products ${req.body.name} is saved.`);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.delete("/product/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("Please provide valid product id");
    }
    const data = await fs.readFileSync(filename, {
      encoding: "utf8",
      flag: "r",
    });
    const products = data.split("\n");
    let productIndex = -1;
    const product = products.find((product, index) => {
      const productDetails = product.split(",");
      if (id === productDetails[0]) {
        productIndex = index;
        return true;
      }
    });
    if (product) {
      products.splice(productIndex, 1);
      fs.writeFileSync(filename, "", "utf8");
      products.forEach((product, index) => {
        if (product) {
          fs.appendFileSync(filename, `${product}\n`, "utf8");
        }
      });

      res.send("success");
    } else {
      res.status(403).send("Unauthorized");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.get("/product/:id", async function (req, res, next) {
  try {
    const id = +req.params.id;
    const products = await fs.readFileSync(filename, {
      encoding: "utf8",
      flag: "r",
    });
    const productsArray = products.split("\n");
    let productOff = productsArray.find((product) => {
        if(product != ''){
            const productDetails = product.split(",");
            const productId = +productDetails[0];
            console.log(productId, id)
            if(id === productId){
                return true;
            }
        }
    });
    console.log(productOff);
    const product = getProductObj(productOff)
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
