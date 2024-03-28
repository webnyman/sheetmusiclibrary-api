/* eslint-disable */
/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Authentication]
 *     summary: Log in
 *     description: Authenticates a user and returns a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: pass123
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Authentication failed
 */
/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Users]
 *     summary: Register a new user
 *     description: Registers a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - email
 *               - firstName
 *               - lastName
 *             properties:
 *               username:
 *                 type: string
 *                 example: newuser123
 *               password:
 *                 type: string
 *                 format: password
 *                 example: newpass123
 *               email:
 *                 type: string
 *                 example: name@example.com
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                type: string
 *                example: Doe
 *     responses:
 *       201:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User successfully registered
 *                 id:
 *                   type: string
 *                   example: 1234567890
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       409:
 *        description: Conflict (e.g., username or email already exists)
 *       
 */

/**
 * @swagger
 * /users/{id}/profile:
 *   get:
 *     tags: [Users]
 *     summary: View Profile
 *     description: Retrieves the profile of the specified user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                 id:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}/password:
 *   put:
 *     tags: [Users]
 *     summary: Update Password
 *     description: Updates the password for the specified user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: oldpass123
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: newpass123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Bad request (e.g., password doesn't meet criteria)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}/email:
 *   put:
 *     tags: [Users]
 *     summary: Update Email
 *     description: Updates the email for the specified user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newEmail
 *             properties:
 *               newEmail:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Email updated successfully
 *       400:
 *         description: Bad request (e.g., email is already in use)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /composers:
 *   get:
 *     tags: [Composers]
 *     summary: Get all composers
 *     description: Retrieves a list of all composers
 *     responses:
 *       200:
 *         description: A list of composers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   birthYear:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                   updatedAt:  
 *                      type: string  
 */

/**
 * @swagger
 * /composers/{id}:
 *   get:
 *     tags: [Composers]
 *     summary: Get one composer
 *     description: Retrieves information about a specific composer by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the composer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Composer information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 birthYear:
 *                   type: number
 *                 createdAt:
 *                   type: string
 *                 updatedAt:  
 *                   type: string  
 *       404:
 *         description: Composer not found
 */

/**
 * @swagger
 * /composers:
 *   post:
 *     tags: [Composers]
 *     summary: Create composer
 *     description: Adds a new composer to the database
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Johann Sebastian
 *               lastName:
 *                 type: string
 *                 example: Bach
 *               birthYear:
 *                 type: number
 *                 example: 1685
 *               deathYear:
 *                 type: number
 *                 example: 1750
 *     responses:
 *       201:
 *         description: Composer created successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 */

/**
 * @swagger
 * /composers/{id}:
 *   put:
 *     tags: [Composers]
 *     summary: Update composer
 *     description: Updates the details of an existing composer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the composer
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Johann Sebastian
 *               lastName:
 *                 type: string
 *                 example: Bach
 *               birthYear:
 *                 type: number
 *                 example: 1685
 *               deathYear:
 *                 type: number
 *                 example: 1750
 *     responses:
 *       200:
 *         description: Composer updated successfully
 *       400:
 *         description: Bad request (e.g., invalid input data)
 *       404:
 *         description: Composer not found
 */

/**
 * @swagger
 * /composers/{id}:
 *   delete:
 *     tags: [Composers]
 *     summary: Delete composer
 *     description: Removes a composer from the database
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the composer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Composer deleted successfully
 *       404:
 *         description: Composer not found
 */

/**
 * @swagger
 * /library:
 *   get:
 *     tags: [Library]
 *     summary: Get full music library
 *     description: Retrieves a list of all music posts in the library
 *     responses:
 *       200:
 *         description: A list of music posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   composer:
 *                     type: string
 *                   year:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 */

/**
 * @swagger
 * /library/{id}:
 *   get:
 *     tags: [Library]
 *     summary: Get one library post
 *     description: Retrieves a single music post from the library by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the music post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Music post information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   composer:
 *                     type: string
 *                   year:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       404:
 *         description: Music post not found
 */

/**
 * @swagger
 * /library/composer/{id}:
 *   get:
 *     tags: [Library]
 *     summary: Get all music by composer
 *     description: Retrieves all music posts associated with a specific composer by the composer's ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the composer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of music by the specified composer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   composer:
 *                     type: string
 *                   year:
 *                     type: integer
 *                   description:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       404:
 *         description: Composer not found
 */

/**
 * @swagger
 * /library:
 *   post:
 *     tags: [Library]
 *     summary: Create library post
 *     description: Adds a new music post to the library
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - composer
 *               - year
 *             properties:
 *               title:
 *                 type: string
 *               composer:
 *                 type: string
 *               year:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Library post created successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 */

/**
 * @swagger
 * /library/{id}:
 *   put:
 *     tags: [Library]
 *     summary: Update library post
 *     description: Updates the details of an existing music post in the library
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the music post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               composer:
 *                 type: string
 *               year:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Library post updated successfully
 *       400:
 *         description: Bad request (e.g., invalid input data)
 *       404:
 *         description: Music post not found
 */

/**
 * @swagger
 * /library/{id}:
 *   delete:
 *     tags: [Library]
 *     summary: Delete music post
 *     description: Removes a music post from the library by its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the music post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Music post deleted successfully
 *       401:
 *         description: Unauthorized (e.g., user not authenticated or not authorized to delete the post)
 *       404:
 *         description: Music post not found
 */

/**
 * @swagger
 * /library/search:
 *   get:
 *     tags: [Library]
 *     summary: Search Music Library
 *     description: Searches the music library for titles matching the query.
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The title to search for in the music library.
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier of the music piece.
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   title:
 *                     type: string
 *                     description: Title of the music piece.
 *                     example: "Fur Elise"
 *                   composer:
 *                     type: string
 *                     description: Composer of the music piece.
 *                     example: "Ludwig van Beethoven"
 *                   year:
 *                     type: integer
 *                     description: Year the piece was composed.
 *                     example: 1810
 *       400:
 *         description: Bad request (e.g., missing or invalid title query parameter).
 *       404:
 *         description: No search results found.
 */

/**
 * @swagger
 * /webhooks/register/{id}:
 *   post:
 *     tags: [Webhooks]
 *     summary: Register Webhook
 *     description: Allows users to register a webhook URL for when music is added to the library.
 *     security:
 *       - bearerAuth: access_token # Assumes authentication is required
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user for which the webhook is being registered.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *                 description: The webhook URL to be registered.
 *                 example: https://example.com/webhook
 *     responses:
 *       200:
 *         description: Webhook registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Webhook registered successfully.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6602f890ab9096b4f130eeb8
 *                     url:
 *                       type: string
 *                       format: uri
 *                       example: https://webhook.site/1e3d0ff6-f6ee-4b35-93c8-7f3da5b31d84
 *                     secretToken:
 *                       type: string
 *                       example: 0a13400548b02cd3455829fa29eced68e714e2555eb5b56d2d99e5aac6d02950
 *       400:
 *         description: Bad request (e.g., malformed request, missing URL).
 *       401:
 *         description: Unauthorized (e.g., invalid or missing authentication token).
 *       404:
 *         description: Resource not found (e.g., invalid ID).
 */
