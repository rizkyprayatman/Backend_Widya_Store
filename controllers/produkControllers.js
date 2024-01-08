const { User, ProfileUser, Products } = require("../models/");
const { getToken } = require("../utils/getToken");

const postProduct = async (req, res, next) => {
    const checkToken = getToken(req.headers["authorization"]);

    const { nama_product, deskripsi, price } = req.body;
    try {
        const isUser = await User.findOne({
            where: { id: checkToken.id },
        });

        if (isUser == null) {
            res.status(401).json({ message: "User not found. Please register!" });
            return;
        }

        const storeProduct = {
            nama_product: nama_product,
            deskripsi: deskripsi,
            price: price,
            userId: checkToken.id
        };

        await Products.create(storeProduct);

        res.status(201).json({
            message: "Success Store Product"
        });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    const checkToken = getToken(req.headers["authorization"]);

    const { nama_product, deskripsi, price } = req.body;

    const productCheck = await Products.findOne({ where: { id: req.params.id } });

    try {
        if (productCheck.userId !== checkToken.id) {
            res.status(401).json({ message: "Unauthorized access: User does not have permission to access this product." });
            return;
        }

        await Products.update({
            nama_product: nama_product,
            deskripsi: deskripsi,
            price: price,
            userId: checkToken.id
        }, { where: { id: req.params.id } });

        res.status(200).json({
            message: "Success Update Product"
        });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    const checkToken = getToken(req.headers["authorization"]);

    const productCheck = await Products.findOne({ where: { id: req.params.id } });

    try {
        if (!productCheck) {
            res.status(404).json({ message: "Product Not Found" });
            return;
          }

        if (productCheck.userId !== checkToken.id) {
            res.status(401).json({ message: "Unauthorized access: User does not have permission to access this product." });
            return;
        }
      
          
          await productCheck.destroy();

        res.status(200).json({
            message: "Success Delete Product"
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postProduct,
    updateProduct,
    deleteProduct
};