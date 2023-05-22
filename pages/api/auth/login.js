import User from "@/models/User"
import valid from "@/utils/valid"
import bcrypt from "bcrypt"

import {
    createAccessToken,
    createRefreshToken,
} from "../../../utils/generateToken"

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res)
            break
    }
}

const login = async (req, res) => {
    try {
        const { phone, password } = req.body

        const user = await User.findOne({ phone })
        if (!user) {
            return res.status(400).json({ err: "Tài Khoản Không Tồn Tại!" })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ err: "Mật Khẩu Không Đúng!" })
        }

        const access_token = createAccessToken({ id: user._id })
        const refresh_token = createRefreshToken({ id: user._id })

        return res.status(200).json({
            msg: "Đăng Nhập Thành Công!",
            refresh_token,
            access_token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                role: user.role,
                root: user.root,
                avatar: user.avatar,
                address: user.address,
                phone: user.phone,
            },
        })
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}
