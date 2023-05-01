import Product from "@/models/productModel";

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProducts(req, res);
            break;
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res
            .status(200)
            .json({ status: "success", result: products.length, products });
    } catch (error) {
        return res.status(404).json({ err: error.messgage });
    }
};
