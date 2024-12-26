const express = require('express');
const {getUser, updateUser, deleteUser} = require('../controllers/userController')
const auth = require('../middleware/auth')

//express router
const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     description: Retrieve the current user's profile
 *     security:
 *       - BearerAuth: []  # Using Bearer authentication for this route
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's unique identifier
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *       401:
 *         description: Unauthorized, if no valid token is provided
 */
//get user profile
router.get('/', auth, getUser);

/**
 * @swagger
 * /api/v1/users:
 *   put:
 *     description: Update the current user's profile information
 *     security:
 *       - BearerAuth: []  # Using Bearer authentication for this route
 *     tags:
 *       - Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's updated name
 *               email:
 *                 type: string
 *                 description: The user's updated email address
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User profile updated successfully"
 *       400:
 *         description: Bad request if the data is invalid
 *       401:
 *         description: Unauthorized, if no valid token is provided
 *       404:
 *         description: Not found, if the user doesn't exist
 */
//update user profile data
router.put('/', auth, updateUser);

/**
 * @swagger
 * /api/v1/users:
 *   delete:
 *     description: Delete the current user's profile
 *     security:
 *       - BearerAuth: []  # Using Bearer authentication for this route
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: Successfully deleted user profile
 *       401:
 *         description: Unauthorized, if no valid token is provided
 *       404:
 *         description: Not found, if the user doesn't exist
 */
//delete user profile
router.delete('/', auth, deleteUser);

module.exports = router;
