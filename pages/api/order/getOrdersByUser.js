import Order from "@/models/Order"

export default async (req, res) => {
    if (req.method === "GET") {
        try {
            const { userID } = req.query
            if (userID) {
                const orders = await Order.find({ userID })
                return res
                    .status(200)
                    .json({ status: "success", result: orders.length, orders })
            } else {
                return res.status(404).json({ err: "UserID is required" })
            }
        } catch (error) {
            return res.status(404).json({ err: error.messgage })
        }
    } else {
        return res.status(501).json({ err: "Wrong Method." })
    }
}
