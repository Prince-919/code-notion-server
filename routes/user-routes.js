import express from "express";
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getMyProfile,
  logout,
  removeFromPlaylist,
  resetPassword,
  signin,
  signup,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/user-controller.js";
import { authorizeAdmin, isAuthenticated } from "./../middlewares/auth.js";
import singleUpload from "./../middlewares/multer.js";

const router = express.Router();

router.route("/sign-up").post(singleUpload, signup);
router.route("/sign-in").post(signin);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/me").delete(isAuthenticated, deleteMyProfile);
router.route("/change-password").put(isAuthenticated, changePassword);
router.route("/update-profile").put(isAuthenticated, updateProfile);
router
  .route("/update-profile-picture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password/:token").put(resetPassword);
router.route("/add-to-playlist").post(isAuthenticated, addToPlaylist);
router
  .route("/remove-from-playlist")
  .delete(isAuthenticated, removeFromPlaylist);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);
router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
