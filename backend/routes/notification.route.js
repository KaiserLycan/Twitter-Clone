import express  from "express";
import {protectRoute} from "../middleware/protectRoute.js";
import {deleteNotification, deleteNotifications, getNotifactions} from "../controllers/notifications.controller.js";

const router = express.Router();


router.get("/", protectRoute, getNotifactions);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:id", protectRoute, deleteNotification);

export default router;


