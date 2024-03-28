/**
 * The starting point of the application.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import { router } from './routes/router.js'
import { connectDB } from './config/mongoose.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

try {
  await connectDB()

  const app = express()

  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(helmet())

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  // Parse requests of the content type application/json.
  app.use(express.json())

  // Swagger setup
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Sheet music library API',
        version: '1.0.0',
        description: 'This is an API for a sheet music library. You can create, read, update, and delete composers and music.'
      },
      tags: [
        {
          name: 'Authentication', description: 'API for authentication in the sheet music library'
        },
        {
          name: 'Composers',
          description: 'API for composers in the sheet music library'
        },
        {
          name: 'Library',
          description: 'API for music in the sheet music library'
        },
        {
          name: 'Users',
          description: 'API for users in the sheet music library'
        },
        {
          name: 'Webhooks',
          description: 'API for webhooks in the sheet music library'
        }
      ],
      servers: [
        {
          url: 'https://swedishbrass.com/1dv027api/api/v1',
          description: 'Production server'
        }
      ]
    },
    apis: ['./src/routes/api/v1/docs/*.js'] // Adjust this path as needed
  }

  const swaggerSpecs = swaggerJsdoc(swaggerOptions)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    err.status = err.status || 500
    if (err.status === 500) {
      return res
        .status(err.status)
        .json({
          status_code: err.status,
          message: 'An unexpected condition was encountered.'
        })
    }
    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status)
        .json({
          status_code: err.status,
          message: err.message
        })
    }

    // Development only!
    // Only providing detailed error in development.
    return res
      .status(err.status)
      .json({
        status_code: err.status,
        message: err.message,
        cause: err.cause
          ? {
              status: err.cause.status,
              message: err.cause.message,
              stack: err.cause.stack
            }
          : null,
        stack: err.stack
      })
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
