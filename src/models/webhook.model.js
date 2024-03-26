import mongoose from 'mongoose'
import crypto from 'crypto'

const webhookSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    secretToken: {
      type: String,
      required: true,
    },
    // You can add more fields as needed
  });
  
  // Pre-save hook to generate a secret token
  webhookSchema.pre('save', function(next) {
    // Check if the document is new or the secretToken is not set
    if (this.isNew || !this.secretToken) {
      this.secretToken = crypto.randomBytes(32).toString('hex'); // Generate a 32-byte hex token
    }
    next()
  })
  
  export const Webhook = mongoose.model('Webhook', webhookSchema)
  