/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: product's ID.
 *         title:
 *           type: string
 *           description: product's title.
 *         price:
 *           type: number
 *           format: float
 *           description: product's price.
 *         salePercentage:
 *           type: number
 *           nullable: true
 *           description: sales discount percentage (1-100).
 *         purchaseCount:
 *           type: number
 *           nullable: true
 *           description: purchase counter.
 *         onSpotlight:
 *           type: boolean
 *           description: If product is on spotlight.
 *         stars:
 *           type: number
 *           nullable: true
 *           description: rating based on stars.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: creation date.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: last update date.
 *         type:
 *           type: string
 *           enum: [PHYSICAL, DIGITAL]
 *         category:
 *           type: string
 *           enum: [GAME, ASSET, COURSE, AUDIO, TEMPLATE, SOFTWARE, "E-BOOK", VIDEO]
 *         creatorId:
 *           type: string
 *           description: product creator's ID (must be a valid Cuid2).
 *     CreateProductInput:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - type
 *         - category
 *         - creatorId
 *       properties:
 *         title:
 *           type: string
 *           description: product's title.
 *         price:
 *           type: number
 *           format: float
 *           description: product's price.
 *         salePercentage:
 *           type: number
 *           nullable: true
 *           description: sales discount percentage (1-100).
 *         type:
 *           type: string
 *           enum: [PHYSICAL, DIGITAL]
 *         category:
 *           type: string
 *           enum: [GAME, ASSET, COURSE, AUDIO, TEMPLATE, SOFTWARE, "E-BOOK", VIDEO]
 *         creatorId:
 *           type: string
 *           description: product creator's ID (must be a valid Cuid2).
 *     UpdateProductInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: product's title.
 *         price:
 *           type: number
 *           format: float
 *           description: product's price.
 *         salePercentage:
 *           type: number
 *           nullable: true
 *           description: sales discount percentage (1-100).
 *         onSpotlight:
 *           type: boolean
 *           description: If product is on spotlight.
 *         type:
 *           type: string
 *           enum: [PHYSICAL, DIGITAL]
 *         category:
 *           type: string
 *           enum: [GAME, ASSET, COURSE, AUDIO, TEMPLATE, SOFTWARE, "E-BOOK", VIDEO]
 */

/**
 * @swagger
 * /api/product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductInput'
 *     responses:
 *       201:
 *         description: Product created successfully..
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation failed.
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Return a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Fetch a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: product's ID
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Failed to find product. The database did not return record.
 */

/**
 * @swagger
 * /api/product/{id}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: product's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductInput'
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Failed to find product. The database did not return record.
 *       400:
 *         description: Validation failed.
 */

/**
 * @swagger
 * /api/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: product's ID
 *     responses:
 *       204:
 *         description: Product deleted successfully.
 *       404:
 *         description: Failed to find product. The database did not return record.
 */