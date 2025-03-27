import express from "express";
import { userLogin } from "../controllers/loginController.js";
import { createUser } from "../controllers/registercontroller.js";

const route = express.Router();
route.post('/login', userLogin);
route.post("/register", createUser)

export default route;
