import Composer from '../../models/composer.model'
import createError from 'http-errors'

/**
 * ComposerController
 */
export class ComposerController {
  /**
   * Add a new composer to the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the login operation is complete.
   */
  async addComposer (req, res, next) {
    try {
      const composer = new Composer({ ...req.body })
      await composer.save()
      res.status(201).json(composer)
    } catch (error) {
      next(createError(400, 'Invalid composer data.'))
    }
  }

  /**
   * Get all composers from the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the login operation is complete.
   */
  async getAllComposers (req, res, next) {
    try {
      const composers = await Composer.find({})
      res.status(200).json(composers)
    } catch (error) {
      next(createError(500, 'Server error retrieving composers.'))
    }
  }

  /**
   * Get a composer by ID from the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the login operation is complete.
   */
  async getComposer (req, res, next) {
    try {
      const composer = await Composer.findById(req.params.id)
      if (!composer) {
        return next(createError(404, 'Composer not found.'))
      }
      res.status(200).json(composer)
    } catch (error) {
      next(createError(500, 'Server error retrieving composer.'))
    }
  }

  /**
   * Generates HATEOAS links for a composer resource.
   * @param {string} composerId - The composer's ID.
   * @returns {Array} - An array of link objects related to the composer.
   */
  #generateHATEOASLinks (composerId) {
    const baseUrl = process.env.BASE_URL // Ensure your BASE_URL is correctly set in your environment
    return [
      {
        rel: 'self',
        method: 'GET',
        href: `${baseUrl}/composers/${composerId}`
      },
      {
        rel: 'update',
        method: 'PATCH',
        href: `${baseUrl}/composers/${composerId}/update`
      },
      {
        rel: 'delete',
        method: 'DELETE',
        href: `${baseUrl}/composers/${composerId}`
      },
      {
        rel: 'listSheetMusic',
        method: 'GET',
        href: `${baseUrl}/sheetMusic?composerId=${composerId}`
      }
      // Add other relevant links as needed
    ]
  }
}
