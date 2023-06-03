import Order from "@/models/Order"

export default async (req, res) => {
    if (req.method === "PATCH") {
        try {
            const {
                id,
                status: { name, time },
            } = req.body
            const updatedOrder = await Order.findOneAndUpdate(
                { _id: id },
                { $push: { status: { statusName: name, statusTime: time } } },
                { new: true }
            )
            return res.status(200).json({
                msg: "Cập nhật trạng thái thành công!",
                order: updatedOrder,
            })
        } catch (error) {
            return res.status(404).json({ err: error.messgage })
        }
    } else {
        return res.status(501).json({ err: "Wrong Method." })
    }
}
