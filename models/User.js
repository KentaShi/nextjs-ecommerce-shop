import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            default: "user",
        },
        root: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/ddggtsujq/image/upload/v1682505174/avatar/user_nyxjsm.png",
        },
    },
    { timestamps: true }
)

let User = mongoose.models.user || mongoose.model("user", UserSchema)

export default User
