import express from "express";
import playersRoutes from "./players.js";
import notificationsRoutes from "./notifications.js";

const router = express.Router();

router.use("/players", playersRoutes);
router.use("/notifications", notificationsRoutes);

export default router;
