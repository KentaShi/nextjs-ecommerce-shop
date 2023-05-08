import connectDB from "@/utils/connectDB"
import User from "@/models/User"
import valid from "@/utils/valid"
import bcrypt from "bcrypt"

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break
    }
}

const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword } = req.body

        const errMsg = valid(fullName, username, password, confirmPassword)
        if (errMsg) {
            return res.status(400).json({ err: errMsg })
        }

        const user = await User.findOne({ username })
        if (user) {
            return res
                .status(400)
                .json({ err: "This username has already exists!" })
        }

        const passwordHash = await bcrypt.hash(password, 12)
        const newUser = new User({
            fullName,
            username,
            password: passwordHash,
        })

        await newUser.save()
        return res.status(200).json({ msg: "Register Successfully!" })
    } catch (error) {
        return res.status(500).json({ err: error })
    }
}
