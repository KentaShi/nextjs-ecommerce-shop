import Order from "@/models/Order"

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res)
            break
        case "PATCH":
            await updateStatus(req, res)
            break
        case "DELETE":
            await deleteOrder(req, res)
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

const updateStatus = async (req, res) => {
    try {
        const { id } = req.query
        const {
            status: { name, time },
        } = req.body
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: id },
            { $push: { status: { statusName: name, statusTime: time } } },
            { new: true }
        )
        //console.log("updatedOrder", updatedOrder)
        return res
            .status(200)
            .json({ msg: "Cập nhật thành công!", order: updatedOrder })
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.query
        await Order.deleteOne({ _id: id })
        return res.status(200).json({ msg: "Đã xóa đơn hàng thành công!" })
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}
