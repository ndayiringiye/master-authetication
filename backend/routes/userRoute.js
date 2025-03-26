import express from "express";
import { userLogin } from "../controllers/loginController.js";

const route = express.Router();
route.post('/login', userLogin);

export default route;
