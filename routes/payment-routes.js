import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  buySubscription,
  cancelSubscription,
  getRazorPayKey,
  paymentVerification,
} from "../controllers/payment-controller.js";

const router = express.Router();

router.route("/subscribe").get(isAuthenticated, buySubscription);
router
  .route("/payment-verification")
  .post(isAuthenticated, paymentVerification);
router.route("/razorpay-key").get(getRazorPayKey);
router.route("/subscribe/cancel").delete(isAuthenticated, cancelSubscription);

export default router;
