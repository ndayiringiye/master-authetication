import { lognInService } from "../services/login.js";


export const userLogin = async (req, res) => {
    try {
        await lognInService(req, res); 
    } catch (error) {
        res.status(500).json({ msg: "User login failed", error: error.message });
    }
};

