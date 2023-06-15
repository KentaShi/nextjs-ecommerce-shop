import User from "@/models/User"

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getUser(req, res)
            break
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.query
        const user = await User.findById(id).select("-password")
        return res.status(200).json({ user: user })
    } catch (error) {
        return res.status(404).json({ err: error.messgage })
    }
}
