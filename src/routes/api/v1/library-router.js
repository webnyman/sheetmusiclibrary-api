/**
 * Library routes.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import express from 'express'
import { LibraryController } from '../../../controllers/api/library-controller.js'
import authenticate from '../../../middleware/authMiddleware.js'

export const router = express.Router()

const controller = new LibraryController()

// Map HTTP verbs and route paths to controller actions.

// Get full music library
router.get('/', (req, res, next) => controller.getLibrary(req, res, next))

// Get one library post
router.get('/:id', (req, res, next) => controller.getMusic(req, res, next))

// Get all music by composer
router.get('/composer/:id', (req, res, next) => controller.getMusicByComposer(req, res, next))

// Create library post
router.post('/', authenticate, (req, res, next) => controller.addMusic(req, res, next))

// Update library post
router.put('/:id', authenticate, (req, res, next) => controller.updateMusic(req, res, next))

// Delete music post
router.delete('/:id', authenticate, (req, res, next) => controller.deleteMusic(req, res, next))
