import Library from '../../models/library.model.js'
import createError from 'http-errors'

/**
 * ComposerController
 */
export class LibraryController {
  /**
   * Add a new composer to the database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the login operation is complete.
   */
  async addMusic (req, res, next) {
    try {
      const music = new Library({ ...req.body })
      await music.save()
      res.status(201).json(
        {
          music,
          links: this.#generateHATEOASLinks(music._id)
        }
      )
    } catch (error) {
      next(createError(400, 'Invalid composer data.'))
    }
  }

  /**
   * Get all music from the library database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the login operation is complete.
   */
  async getLibrary (req, res, next) {
    try {
      const library = await Library.find({})
      res.status(200).json(library)
    } catch (error) {
      next(createError(500, 'Server error retrieving composers.'))
    }
  }

  /**
   * Get one music post from library.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the login operation is complete.
   */
  async getMusic (req, res, next) {
    try {
      const music = await Library.findById(req.params.id)
      if (!music) {
        return next(createError(404, 'Music not found.'))
      }
      res.status(200).json({
        music,
        links: this.#generateHATEOASLinks(music._id)
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
  updateMusic = async (req, res, next) => {
    const musicId = req.params.id
    const updateData = req.body
    try {
      const music = await Library.findById(musicId)
      if (!music) {
        return next(createError(404, 'Music not found.'))
      }
      const updatedMusic = await music.updateMusic(updateData)
      return res.status(200).json({
        message: 'Music updated successfully.',
        music: updatedMusic,
        links: this.#generateHATEOASLinks(musicId)
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Generates HATEOAS links for a composer resource.
   * @param {string} musicId - The composer's ID.
   * @returns {Array} - An array of link objects related to the composer.
   */
  #generateHATEOASLinks (musicId) {
    const baseUrl = process.env.BASE_URL // Ensure your BASE_URL is correctly set in your environment
    return [
      {
        rel: 'self',
        method: 'GET',
        href: `${baseUrl}/library/${musicId}`
      },
      {
        rel: 'update',
        method: 'PUT',
        href: `${baseUrl}/library/${musicId}`
      },
      {
        rel: 'delete',
        method: 'DELETE',
        href: `${baseUrl}/library/${musicId}`
      }
      // Add other relevant links as needed
    ]
  }
}
