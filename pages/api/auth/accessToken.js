import User from "@/models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import {
    createAccessToken,
    createRefreshToken,
} from "../../../utils/generateToken"

export default async (req, res) => {
    try {
        const refresh_token = req.cookies.refresh_token
        if (!refresh_token) {
            return res.status(400).json({ err: "Please login..." })
        }

        const result = jwt.verify(
            refresh_token,
            process.env.REFRESH_TOKEN_SECRET
        )
        if (!result) {
            return res
                .status(400)
                .json({ err: "Your token is invalid or expired" })
        }

        const user = await User.findById(result.id)
        if (!user) {
            return res.status(400).json({ err: "User does not exist." })
        }

        const access_token = createAccessToken({ id: user._id })
        return res.status(200).json({
            access_token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                role: user.role,
                root: user.root,
                avatar: user.avatar,
                address: user.address,
                phone: user.phone,
            },
        })
    } catch (error) {
        return res.status(400).json({ err: error.message })
    }
}
