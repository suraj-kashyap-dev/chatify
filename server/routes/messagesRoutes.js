import { addMessage, getMessages } from '../controllers/MessageController.js';
import express from 'express';
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post("/add-message/", addMessage);
router.post("/get-messages/", getMessages);

export default router;
