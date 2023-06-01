import Product from "@/models/Product"

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await createProduct(req, res)
            break
        case "GET":
            await getProducts(req, res)
            break
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, price, urlImg, category } = req.body
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            images: [{ url: urlImg }],
        })
        await newProduct.save()
        return res.status(200).json({
            msg: "Thêm Sản Phẩm Thành Công!",
            product: newProduct,
        })
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        return res
            .status(200)
            .json({ status: "success", result: products.length, products })
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}
