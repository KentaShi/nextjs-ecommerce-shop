import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        inStock: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

let Product =
    mongoose.models.product || mongoose.model("product", ProductSchema);

export default Product;
