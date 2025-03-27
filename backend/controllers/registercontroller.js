import { registerService } from "../services/register.js";

export const createUser = async (req, res) => {
    try {
        const user = await registerService(req, res);
        res.status(201).json({ msg: "User created successfully", data: user });
    } catch (error) {
        res.status(500).json({ msg: "User creation failed", error: error.message });
    }
};
