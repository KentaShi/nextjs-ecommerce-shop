import Order from "@/models/Order"

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res)
            break
    }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.query
        const order = await Order.findById(id)
        return res.status(200).json({ order: order })
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}
