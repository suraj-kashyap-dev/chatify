import express from "express";
import bodyParser from 'body-parser';
import { login } from "../controllers/LoginController.js";
import { register } from "../controllers/RegisterController.js";

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post("/login", login);
router.post("/register", register);

export default router;
