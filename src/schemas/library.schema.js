import mongoose from 'mongoose'
import Composer from '../models/composer.model.js'

const library = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true,
    maxLength: 256
  },
  composer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Composer',
    required: [true, 'Composer is required.']
  },
  year: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret.__v
    }
  }
})

library.virtual('id').get(function () {
  return this._id.toHexString()
})

library.pre('save', async function (next) {
  const validationErrors = []

  if (this.composer && mongoose.Types.ObjectId.isValid(this.composer)) {
    const composerExists = await Composer.countDocuments({ _id: this.composer }) > 0
    if (!composerExists) {
      validationErrors.push('Referenced composer does not exist.')
    }
  } else {
    validationErrors.push('Invalid composer reference.')
  }
  if (validationErrors.length > 0) {
    next(new Error(validationErrors.join(' ')))
  } else {
    next()
  }
})
/**
 * Updates a post in library .
 * @param {object} music - The composer object to update.
 */
library.methods.updateMusic = async function (music) {
  Object.keys(music).forEach(key => {
    this[key] = music[key]
  })
  try {
    await this.save()
    return this
  } catch (error) {
    throw new Error('Error updating composer.')
  }
}

export default library
