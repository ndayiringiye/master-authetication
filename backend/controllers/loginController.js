import { lognInService } from "../services/login.js";

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, existedUser } = await lognInService({ email, password });

        res.status(202).json({ token, existedUser, msg: "User login successful" });
    } catch (error) {
        res.status(500).json({ msg: "User login failed", error });
    }
};
