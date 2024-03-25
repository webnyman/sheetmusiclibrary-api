/**
 * Composer routes.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import express from 'express'
import { ComposerController } from '../../../controllers/api/composer-controller.js'
import authenticate from '../../../middleware/authMiddleware.js'

export const router = express.Router()

const controller = new ComposerController()

// Map HTTP verbs and route paths to controller actions.

// Get all composers
router.get('/', (req, res, next) => controller.getAllComposers(req, res, next))

// Get one composer
router.get('/:id', (req, res, next) => controller.getComposer(req, res, next))

// Create composer
router.post('/', authenticate, (req, res, next) => controller.addComposer(req, res, next))

// Update composer
router.put('/:id', authenticate, (req, res, next) => controller.updateComposer(req, res, next))

// Delete composer
router.delete('/:id', authenticate, (req, res, next) => controller.deleteComposer(req, res, next))
