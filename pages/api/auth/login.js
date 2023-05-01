import User from "@/models/userModel";
import valid from "@/utils/valid";
import bcrypt from "bcrypt";

import {
    createAccessToken,
    createRefreshToken,
} from "../../../utils/generateToken";

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await login(req, res);
            break;
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ err: "This user does not exist!" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ err: "Incorrect Password" });
        }

        const access_token = createAccessToken({ id: user._id });
        const refresh_token = createRefreshToken({ id: user._id });

        return res.status(200).json({
            msg: "Sign In Successfully!",
            refresh_token,
            access_token,
            user: {
                fullName: user.fullName,
                username: user.username,
                role: user.role,
                root: user.root,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        return res.status(500).json({ err: error });
    }
};
