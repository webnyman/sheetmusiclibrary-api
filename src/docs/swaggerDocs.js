/**
 * @swagger
 * components:
 *   schemas:
 *     Composer:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the composer
 *         name:
 *           type: string
 *           description: The name of the composer
 *         birthYear:
 *           type: integer
 *           description: The birth year of the composer
 *         deathYear:
 *           type: integer
 *           description: The death year of the composer, if applicable
 *       example:
 *         name: Johann Sebastian Bach
 *         birthYear: 1685
 *         deathYear: 1750
 */
