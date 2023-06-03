import Order from "@/models/Order"

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getOrder(req, res)
            break
        case "PUT":
            await updateOrder(req, res)
            break
        case "DELETE":
            await deleteOrder(req, res)
            break
    }
}

const getOrder = async (req, res) => {
    try {
        const { id } = req.query
        const order = await Order.findById(id)
        return res.status(200).json({ order: order })
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.query
        const data = req.body
        const updatedOrder = await Order.findOneAndUpdate({ _id: id }, data, {
            new: true,
        })
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
