/**
 * Webhook routes.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import express from 'express'
import { WebhookController } from '../../../controllers/api/webhook-controller.js'
import authenticate from '../../../middleware/authMiddleware.js'

export const router = express.Router()

const controller = new WebhookController()

// Map HTTP verbs and route paths to controller actions.

// View profile
router.post('/register/:id', authenticate, (req, res, next) => controller.register(req, res, next))
