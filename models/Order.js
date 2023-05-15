import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
        products: {
            type: Array,
        },
        totalQty: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: "pending",
        },
    },
    { timestamps: true }
)

export default mongoose.models.order || mongoose.model("order", orderSchema)
