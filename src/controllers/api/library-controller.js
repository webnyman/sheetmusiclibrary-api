import Library from '../../models/library.model.js'
import { Webhook } from '../../models/webhook.model.js'
import createError from 'http-errors'
import axios from 'axios'

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
      const activeWebhooks = await Webhook.find({ active: true })
      if (!activeWebhooks.length) {
        return res.status(201).json({
          message: 'Music added successfully.',
          music,
          links: this.#generateHATEOASLinks(music._id)
        })
      }
      let musicWithExtraInfo = {
        event: 'sheetMusicAdded',
        timestamp: new Date().toISOString(),
        music
      };
      const notificationPromises = activeWebhooks.map(webhook => 
        axios.post(webhook.url, musicWithExtraInfo, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${webhook.secretToken}`, // Use if your webhooks use a secret for validation
          },
        }).catch(error => {
          console.log(`Failed to notify webhook at ${webhook.url}:`, error.message)
          // Optionally log this error to a database or error logging service
        })
      )
      // Wait for all notifications to be attempted
      await Promise.allSettled(notificationPromises)
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
   * Get all music by composer from library database.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the login operation is complete.
   */
  async getMusicByComposer (req, res, next) {
    const composerId = req.params.id
    try {
      const music = await Library.find({ composer: composerId })
      res.status(200).json(music)
    } catch (error) {
      next(createError(500, 'Server error retrieving music.'))
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
  async deleteMusic (req, res, next) {
    try {
      const composer = await Library.findByIdAndDelete(req.params.id)
      if (!composer) {
        return next(createError(404, 'Music not found.'))
      }
      return res.status(200).json({
        message: 'Music deleted successfully.',
        links: [
          {
            rel: 'all-library',
            method: 'GET',
            href: `${process.env.BASE_URL}/library/`
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
   * Query the database for music by a search term.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the search operation is complete.
   * @memberof LibraryController
   * 
  */
  async searchMusic (req, res, next) {
    const title = req.query.title
    try {
      // Validate input
      if (!title) {
        return res.status(400).json({ message: 'Title query parameter is required.' })
      }
      // Perform a case-insensitive search for sheet music by title
      const results = await Library.find({
        title: new RegExp(title, 'i'), // Case-insensitive matching
      })
      res.status(200).json(results)
    } catch (error) {
      next(createError(500, 'Server error retrieving music.'))
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
