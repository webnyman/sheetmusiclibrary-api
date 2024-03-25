import jwt from 'jsonwebtoken'
import createError from 'http-errors'

/**
 * Authenticates a user.
 *
 * @param {*} req - Express request object.
 * @param {*} res - Express response object.
 * @param {*} next - Express next middleware function.
 * @memberof AccountController
 */
const authenticate = async (req, res, next) => {
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

export default authenticate
