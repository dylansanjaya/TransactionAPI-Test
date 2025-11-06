import express from "express";

// Import each route
import membershipRoutes from "./membership.routes.js";
import informationRoutes from "./information.routes.js";
import transactionRoutes from "./transaction.routes.js";


const router = express.Router();

// Membership
router.use("/", membershipRoutes);

// Information
router.use("/", informationRoutes);

// Transaction
router.use("/", transactionRoutes);

export default router;
  