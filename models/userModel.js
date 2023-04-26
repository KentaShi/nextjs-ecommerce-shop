import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
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
                "https://asset.cloudinary.com/ddggtsujq/ddb8e8db12d30893735b20bf4ae4ce2c",
        },
    },
    { timestamps: true }
);

export default mongoose.model("user", UserSchema);
