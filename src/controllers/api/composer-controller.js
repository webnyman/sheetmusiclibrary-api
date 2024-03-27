import Composer from '../../models/composer.model.js'
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
      res.status(201).json(
        {
          message: 'Composer added successfully.',
          composer,
          links: this.#generateHATEOASLinks(composer._id)
        }
      )
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
      res.status(200).json({
        composer,
        links: this.#generateHATEOASLinks(composer._id)
      })
    } catch (error) {
      next(createError(500, 'Server error retrieving composer.'))
    }
  }

  /**
   * Delete a composer by ID from the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the login operation is complete.
   */
  async deleteComposer (req, res, next) {
    try {
      const composer = await Composer.findByIdAndDelete(req.params.id)
      if (!composer) {
        return next(createError(404, 'Composer not found.'))
      }
      return res.status(200).json({
        message: 'Composer deleted successfully.',
        links: [
          {
            rel: 'all-composers',
            method: 'GET',
            href: `${process.env.BASE_URL}/composers/`
          }
        ]
      })
    } catch (error) {
      next(createError(500, 'Server error deleting composer.'))
    }
  }

  /**
   * Updates the composer's information in the database.
   *
   * @param {*} req - Express request object.
   * @param {*} res - Express response object.
   * @param {*} next - Express next middleware function.
   * @memberof AccountController
   */
  updateComposer = async (req, res, next) => {
    const composerId = req.params.id
    const updateData = req.body
    try {
      const composer = await Composer.findById(composerId)
      if (!composer) {
        return next(createError(404, 'Composer not found.'))
      }
      const updatedComposer = await composer.updateComposer(updateData)
      return res.status(200).json({
        message: 'Composer updated successfully.',
        composer: updatedComposer,
        links: this.#generateHATEOASLinks(composerId)
      })
    } catch (error) {
      next(error)
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
        method: 'PUT',
        href: `${baseUrl}/composers/${composerId}`
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
