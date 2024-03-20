import mongoose from 'mongoose'
import { Composer } from './composer.model.js'
import { Category } from './category.model.js'

const sheetMusicSchema = new mongoose.Schema({
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required.']
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

sheetMusicSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

sheetMusicSchema.pre('save', async function (next) {
  const validationErrors = []

  if (this.composer && mongoose.Types.ObjectId.isValid(this.composer)) {
    const composerExists = await Composer.countDocuments({ _id: this.composer }) > 0
    if (!composerExists) {
      validationErrors.push('Referenced composer does not exist.')
    }
  } else {
    validationErrors.push('Invalid composer reference.')
  }

  if (this.category && mongoose.Types.ObjectId.isValid(this.category)) {
    const categoryExists = await Category.countDocuments({ _id: this.category }) > 0
    if (!categoryExists) {
      validationErrors.push('Referenced category does not exist.')
    }
  } else {
    validationErrors.push('Invalid category reference.')
  }

  if (validationErrors.length > 0) {
    next(new Error(validationErrors.join(' ')))
  } else {
    next()
  }
})

export const SheetMusic = mongoose.model('SheetMusic', sheetMusicSchema)
