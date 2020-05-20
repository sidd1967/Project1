const express = require("express");
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require("../controllers/user.controller");
let middleware = require("../handlers/middleware");

/**
 * @swagger
 * /users/createuser:
 *   post:
 *     tags:
 *       - Auth
 *     description: Create User
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: user
 *         required: true
 *         paramType: body
 *         in: body
 *         schema:
 *            type: object
 *            properties:
 *              emailId:
 *                  type: string
 *              password:
 *                  type: string
 *              fullName:
 *                  type: string
 *     responses:
 *       200:
 *         description: User Created Successfully
 */
router.route("/createuser").post(user_controller.create_user);

/**
 * @swagger
 * /users/loginuser:
 *   post:
 *     tags:
 *       - Auth
 *     description: Login User
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: user
 *         required: true
 *         paramType: body
 *         in: body
 *         schema:
 *            type: object
 *            properties:
 *              emailId:
 *                  type: string
 *              password:
 *                  type: string
 *     responses:
 *       200:
 *         description: User LoggedIn Successfully
 */
router.route("/loginuser").post(user_controller.login_user);

/**
 * @swagger
 * /users/logoutuser:
 *   get:
 *     security:
 *      - Bearer: []
 *     tags:
 *       - Auth
 *     description: Logout User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User Loggedout Successfully
 */
router
  .route("/logoutuser")
  .get(middleware.checkToken)
  .get(user_controller.logout_user);

router.route("/verifytoken").get(middleware.checkToken);

module.exports = router;
