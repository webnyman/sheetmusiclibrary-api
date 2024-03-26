import { Webhook } from '../../models/webhook.model.js';
import crypto from 'crypto';
import createError from 'http-errors';

/**
 * WebhookController
 */
export class WebhookController {
  // Register a new webhook
  async register(req, res, next) {
    try {
      const { url } = req.body;
      const userId = req.params.id; // Assuming user ID is available from authentication middleware
      const secretToken = crypto.randomBytes(32).toString('hex');

      const webhook = await Webhook.create({ userId, url, secretToken });

      res.status(201).json({
        message: 'Webhook registered successfully.',
        data: {
          id: webhook._id,
          url: webhook.url,
          secretToken, // Send the secretToken back as confirmation
        },
      });
    } catch (error) {
      next(createError(500, 'Internal Server Error'));
    }
  }
}
