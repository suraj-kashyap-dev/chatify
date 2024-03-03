import express from "express";
import bodyParser from "body-parser";
import { login } from "../controllers/LoginController.js";
import { register } from "../controllers/RegisterController.js";
import { logout, users, updateStatus, updateProfile } from "../controllers/UserController.js";
import multer from '../helpers/multer.js';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login", login);
router.post("/register", register);
router.get("/users/:id", users);
router.get("/logout/:id", logout);
router.post('/update/status/:id', updateStatus);
router.put('/update/profile/:id', multer.single('image'), updateProfile);

export default router;
