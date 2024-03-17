/**
 * Account routes.
 *
 * @author Björn Nyman
 * @version 1.0.0
 */

import express from 'express'
import { AccountController } from '../../../controllers/api/account-controller.js'

export const router = express.Router()

const controller = new AccountController()

// Map HTTP verbs and route paths to controller actions.

// Log in
router.post('/login', (req, res, next) => controller.login(req, res, next))

// Register
router.post('/register', (req, res, next) => controller.register(req, res, next))

// View profile
router.get('/user/:id/profile', controller.authenticate, (req, res, next) => controller.viewProfile(req, res, next))

// Update password
router.put('/user/:id/password', controller.authenticate, (req, res, next) => controller.updatePassword(req, res, next))

// Update email
router.put('/user/:id/email', controller.authenticate, (req, res, next) => controller.updateEmail(req, res, next))
