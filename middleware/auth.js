import jwt from "jsonwebtoken"
import User from "@/models/User"

const auth = async (req, res) => {
    const token = req.headers.authorization
    if (!token) return res.status(400).json({ err: "Invalid Authorization" })

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    if (!decoded) return res.status(400).json({ err: "Invalid Authorization" })

    const user = await User.findOne({ _id: decoded.id })

    return res
        .status(200)
        .json({ id: user._id, role: user.role, root: user.root })
}

export default auth
