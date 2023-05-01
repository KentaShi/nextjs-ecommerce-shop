import Product from "@/models/productModel";

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res);
            break;
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.query;
        const product = await Product.findById(id);
        return res.status(200).json({ product: product });
    } catch (error) {
        return res.status(404).json({ err: error.messgage });
    }
};
