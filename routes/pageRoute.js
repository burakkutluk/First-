import express from "express";
import {
  getAboutPage,
  getIndexPage,
  getRegisterPage,
  getLoginPage,
  getLogout,
  getContactPage,
  sendMail,
} from "../controllers/pageController.js";

const router = express.Router(); //Create new express router

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);
router.route("/contact").get(getContactPage);
router.route("/contact").post(sendMail);
router.route("/register").get(getRegisterPage);
router.route("/login").get(getLoginPage);
router.route("/logout").get(getLogout);

export default router;
