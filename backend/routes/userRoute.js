import express from "express";
import { userLogin } from "../controllers/loginController.js";
import { createUser } from "../controllers/registercontroller.js";
import { refreshToken } from "../services/refreshToken.js"; 

const route = express.Router();
route.post('/login', userLogin);
route.post("/register", createUser);
route.post('/refresh-token', refreshToken);

export default route;
