const express = require("express");
const { postProduct, updateProduct, deleteProduct } = require("../controllers/produkControllers");

const router = express.Router();

router.post("/store", postProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
