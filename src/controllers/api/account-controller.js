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
      const user = await User.authenticate(req.body.username, req.body.password)

      const tokenData = {
        id: user.id
      }

      // Create the access token
      const createdToken = await this.generateToken(tokenData)

      res
        .status(200)
        .json({
          access_token: createdToken
        })
    } catch (error) {
      let err = error
      if (err.message === 'Invalid credentials.' || err.message === 'data and hash arguments required') {
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

      res
        .status(201)
        .json({
          id: user.id,
          links: [
            { rel: 'login', method: 'POST', href: `${baseUrl}/login` },
            { rel: 'logout', method: 'POST', href: `${baseUrl}/logout` },
            { rel: 'updatePassword', method: 'PATCH', href: `${baseUrl}/user/${user.id}/password` },
            { rel: 'updateEmail', method: 'PATCH', href: `${baseUrl}/user/${user.id}/email` }
          ]
        })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409, 'The username and/or email address is already registered.')
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400, 'The request cannot or will not be processed due to something that is perceived to be a client error (for example validation error).')
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
    const tokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
      algorithm: 'RS256'
    }
    const privateKey = Buffer.from(process.env.PRIVATE_KEY_64, 'base64')
    return jwt.sign(tokenData, privateKey, tokenOptions)
  }
}
