/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: user's ID.
 *         firstName:
 *           type: string
 *           description: user's first name.
 *         lastName:
 *           type: string
 *           description: user's last name.
 *         email:
 *           type: string
 *           description: user's email.
 *         password:
 *           type: string
 *           description: user's password.
 *         phone:
 *           type: string
 *           description: user's phone.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: creation date.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: last update date.
 *         role:
 *           type: string
 *           enum: [CUSTOMER, SELLER]
 *         language:
 *           type: string
 *           enum: [BR, EN]
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - type
 *         - category
 *         - creatorId
 *       properties:
 *         firstName:
 *           type: string
 *           description: user's first name.
 *         lastName:
 *           type: string
 *           description: user's last name.
 *         email:
 *           type: string
 *           description: user's email.
 *         password:
 *           type: string
 *           description: user's password.
 *         phone:
 *           type: string
 *           description: user's phone.
 *         role:
 *           type: string
 *           enum: [CUSTOMER, SELLER]
 *         language:
 *           type: string
 *           enum: [BR, EN]
 *         street:
 *           type: string
 *           description: user's street.
 *         neighborhood:
 *           type: string
 *           description: user's neighborhood.
 *         latitude:
 *           type: number
 *           format: float
 *           description: user's address latitude.
 *         longitude:
 *           type: number
 *           format: float
 *           description: user's address longitude.
 *     UpdateUserInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: user's first name.
 *         lastName:
 *           type: string
 *           description: user's last name.
 *         email:
 *           type: string
 *           description: user's email.
 *         password:
 *           type: string
 *           description: user's password.
 *         phone:
 *           type: string
 *           description: user's phone.
 *         role:
 *           type: string
 *           enum: [CUSTOMER, SELLER]
 *         language:
 *           type: string
 *           enum: [BR, EN]
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation failed.
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Return a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Fetch a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user's ID
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Failed to find user. The database did not return record.
 */

/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserInput'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Failed to find user. The database did not return record.
 *       400:
 *         description: Validation failed.
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user's ID
 *     responses:
 *       204:
 *         description: User deleted successfully.
 *       404:
 *         description: Failed to find user. The database did not return record.
 */