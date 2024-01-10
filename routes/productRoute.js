const express = require("express");
const { postProduct, updateProduct, deleteProduct, getAllProductById } = require("../controllers/produkControllers");

const router = express.Router();

router.post("/add", postProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/me", getAllProductById);

module.exports = router;
