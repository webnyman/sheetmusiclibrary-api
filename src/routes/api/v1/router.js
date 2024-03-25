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

export const router = express.Router()
router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API! (Sheet Music Library)' }))
router.use('/', mainRouter)
router.use('/user', accountRouter)
router.use('/composers', composerRouter)
router.use('/library', libraryRouter)
