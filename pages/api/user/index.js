import auth from "@/middleware/auth"
import User from "@/models/User"

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await updateUser(req, res)
            break
    }
}

const updateUser = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { fullName, address, phone } = req.body

        const userUpdated = await User.findOneAndUpdate(
            { _id: result._id },
            { fullName: fullName, address: address, phone: phone }
        ).select("-password")
        return res.status(200).json({
            msg: "Update Success",
            user: {
                fullName,
                address,
                phone,
                role: userUpdated.role,
                avatar: userUpdated.avatar,
            },
        })
    } catch (error) {
        return res.status(500).json({ err: error.message })
    }
}
