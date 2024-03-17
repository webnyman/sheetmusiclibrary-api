/**
 * Module for the AccountController.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { User } from '../../models/user.js'

const baseUrl = process.env.BASE_URL
/**
 * Encapsulates a controller.
 */
/**
 * Controller for handling user account operations.
 */
export class AccountController {
  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the login operation is complete.
   */
  async login (req, res, next) {
    try {
      const user = await User.authenticate(
        req.body.username,
        req.body.password
      )

      const tokenData = {
        id: user.id,
        username: user.username
      }

      // Create the access token
      const createdToken = await this.generateToken(tokenData)

      res.status(200).json({
        access_token: createdToken,
        links: this.#generateHATEOASLinks(user.id, 'loggedIn')
      })
    } catch (error) {
      let err = error
      if (
        err.message === 'Invalid credentials.' ||
        err.message === 'data and hash arguments required'
      ) {
        err = createError(401, 'Credentials invalid or not provided.')
      } else {
        console.log(error)
        err = createError(500, 'An unexpected condition was encountered.')
      }
      err.cause = error

      next(err)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {Promise<void>} - A Promise that resolves when the registration operation is complete.
   */
  async register (req, res, next) {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })

      await user.save()

      res.status(201).json({
        id: user.id,
        links: this.#generateHATEOASLinks(user.id, 'registered')
      })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(
          409,
          'The username and/or email address is already registered.'
        )
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(
          400,
          'The request cannot or will not be processed due to something that is perceived to be a client error (for example validation error).'
        )
      } else {
        // Other error(s)
        err = createError(500, 'An unexpected condition was encountered.')
      }
      err.cause = error
      next(err)
    }
  }

  /**
   * Generates an access token for the given token data.
   *
   * @param {object} tokenData - The data to be included in the access token.
   * @returns {Promise<string>} - A Promise that resolves with the generated access token.
   */
  async generateToken (tokenData) {
    try {
      const tokenOptions = {
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
        algorithm: 'RS256'
      }
      const privateKey = Buffer.from(process.env.PRIVATE_KEY_64, 'base64').toString('utf-8')
      return jwt.sign(tokenData, privateKey, tokenOptions)
    } catch (error) {
      console.error(error)
      console.log(process.env.PRIVATE_KEY_64)
      throw error
    }
  }

  /**
   * Generates HATEOAS links based on the user's authentication state.
   * @param {object} userId - The user's ID.
   * @returns {Array} - An array of link objects.
   * @param {string} authState - The user's authentication state.
   */
  #generateHATEOASLinks (userId, authState) {
    let links = []

    if (authState === 'registered') {
      links = [
        { rel: 'login', method: 'POST', href: `${baseUrl}/login` },
        {
          rel: 'updatePassword',
          method: 'PATCH',
          href: `${baseUrl}/user/${userId}/password`
        },
        {
          rel: 'updateEmail',
          method: 'PATCH',
          href: `${baseUrl}/user/${userId}/email`
        }
      ]
    } else if (authState === 'loggedIn') {
      links = [
        {
          rel: 'viewProfile',
          method: 'GET',
          href: `${baseUrl}/user/${userId}/profile`
        },
        {
          rel: 'updatePassword',
          method: 'PATCH',
          href: `${baseUrl}/user/${userId}/password`
        },
        {
          rel: 'updateEmail',
          method: 'PATCH',
          href: `${baseUrl}/user/${userId}/email`
        },
        { rel: 'logout', method: 'POST', href: `${baseUrl}/logout` }
      ]
    }

    return links
  }

  /**
   * Authenticates a user.
   *
   * @param {*} req - Express request object.
   * @param {*} res - Express response object.
   * @param {*} next - Express next middleware function.
   * @memberof AccountController
   */
  authenticate = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const privateKey = Buffer.from(process.env.PRIVATE_KEY_64, 'base64').toString('utf-8')
      const decoded = jwt.verify(token, privateKey)
      req.user = {
        id: decoded.id,
        username: decoded.username
      }
      next()
    } catch (error) {
      console.error(error)
      next(createError(401, 'Unauthorized'))
    }
  }

  /**
   * Gets the user's profile.
   *
   * @param {*} req - Express request object.
   * @param {*} res - Express response object.
   * @param {*} next - Express next middleware function.
   * @memberof AccountController
   */
  viewProfile = async (req, res, next) => {
    try {
      req.user = await User.findById(req.params.id)
      console.log(req.user)
      res.status(200).json({
        user: req.user,
        links: this.#generateHATEOASLinks(req.params.id, 'loggedIn')
      })
    } catch (error) {
      next(createError(500, 'An unexpected condition was encountered.'))
    }
  }

  /**
   * Updates the user's password.
   *
   * @param {*} req - Express request object.
   * @param {*} res - Express response object.
   * @param {*} next - Express next middleware function.
   * @memberof AccountController
   */
  updatePassword = async (req, res, next) => {
    try {
      const userId = req.params.id
      const username = req.user.username
      const { currentPassword, newPassword } = req.body
      const user = await User.findOne({ username })
      console.log(user, currentPassword, newPassword)
      if (!user || !(await user.comparePassword(currentPassword))) {
        return res.status(401).json({
          message: 'Current password is incorrect.',
          links: this.#generateHATEOASLinks(userId, 'loggedIn')
        })
      }
      await user.updatePassword(newPassword)
      return res.status(200).json({
        message: 'Password updated successfully.',
        links: this.#generateHATEOASLinks(userId, 'loggedIn')
      })
    } catch (error) {
      next(error)
    }
  }
}
