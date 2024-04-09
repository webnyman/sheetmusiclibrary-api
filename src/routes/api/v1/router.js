/**
 * API version 1 routes.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import express from 'express'
import { router as accountRouter } from './account-router.js'
import { router as mainRouter } from './main-router.js'
import { router as composerRouter } from './composer-router.js'
import { router as libraryRouter } from './library-router.js'
import { router as webhookRouter } from './webhook-router.js'

export const router = express.Router()
router.get('/', (req, res) => res.json(
  {
    message: 'Welcome to version 1 of this RESTful API! (Sheet Music Library)',
    Links: [
      {
        method: 'GET',
        path: 'https://swedishbrass.com/1dv027api/api-docs/',
        description: 'API documentation'
      }
    ]
  }
))
router.use('/', mainRouter)
router.use('/users', accountRouter)
router.use('/composers', composerRouter)
router.use('/library', libraryRouter)
router.use('/webhooks', webhookRouter)
