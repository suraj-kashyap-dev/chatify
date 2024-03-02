import express from "express";
import bodyParser from "body-parser";
import { login } from "../controllers/LoginController.js";
import { register } from "../controllers/RegisterController.js";
import { logout, users, updateStatus } from "../controllers/UserController.js";

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login", login);
router.post("/register", register);
router.get("/users/:id", users);
router.get("/logout/:id", logout);
router.post('/update/status/:id', updateStatus);
export default router;
