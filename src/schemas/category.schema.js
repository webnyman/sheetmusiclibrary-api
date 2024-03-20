import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required.'],
    trim: true,
    unique: true,
    maxLength: 256
  },
  description: {
    type: String,
    required: false,
    trim: true
  }
}, {
  timestamps: true
})

export const Category = mongoose.model('Category', categorySchema)
