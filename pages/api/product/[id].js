import Product from "@/models/Product"

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res)
            break
        case "PATCH":
            await updateProduct(req, res)
            break
        case "DELETE":
            await deleteProduct(req, res)
            break
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.query
        const product = await Product.findById(id)
        return res.status(200).json({ product: product })
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.query
        const { name, price, description, urlImg, category, sold } = req.body
        const product = await Product.findOneAndUpdate(
            { _id: id },
            {
                name: name,
                price: price,
                description: description,
                images: [{ url: urlImg }],
                category: category,
                sold: sold,
            },
            { new: true }
        )
        if (product) {
            return res.status(200).json({
                msg: "Cập nhật Sản Phẩm Thành Công!",
                product: product,
            })
        } else {
            return res.status(404).json({ err: "Resource not found" })
        }
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.query
        await Product.deleteOne({ _id: id })
        return res.status(200).json({ msg: "Đã xóa thành công!" })
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}
