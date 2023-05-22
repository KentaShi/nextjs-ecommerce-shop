import auth from "@/middleware/auth"
import Order from "@/models/Order"

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await createOrder(req, res)
            break
        case "GET":
            await getOrders(req, res)
            break
    }
}

const createOrder = async (req, res) => {
    try {
        const user = await auth(req, res)
        const { products, totalQty, totalPrice, address, phone } = req.body

        const newOrder = new Order({
            userID: user._id,
            products,
            totalQty,
            totalPrice,
            address,
            phone,
        })
        await newOrder.save()

        return res.status(200).json({
            msg: "Đặt Hàng Thành Công!",
            order: newOrder,
        })
    } catch (error) {
        return res.status(500).json({ err: error.message })
    }
}

const getOrders = async (req, res) => {
    try {
        let orders = await Order.find()
        return res
            .status(200)
            .json({ status: "success", result: orders.length, orders })
    } catch (error) {
        return res.status(500).json({ err: error.message })
    }
}
