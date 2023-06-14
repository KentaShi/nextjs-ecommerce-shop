import auth from "@/middleware/auth"
import User from "@/models/User"

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await updateUser(req, res)
            break
        case "GET":
            await getUsers(req, res)
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

const getUsers = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role === "admin") {
            const users = await User.find()
            const usersWithoutAdmin = users.filter(
                (user) => user.role !== "admin"
            )
            return res.status(200).json({
                status: "success",
                result: usersWithoutAdmin.length,
                users: usersWithoutAdmin,
            })
        } else {
            return res.status(404).json({ err: "Denied." })
        }
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}
