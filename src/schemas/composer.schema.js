import mongoose from 'mongoose'

const composerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    maxLength: 256
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    maxLength: 256
  },
  birthYear: {
    type: Number,
    required: false
  },
  deathYear: {
    type: Number,
    required: false
  }
}, {
  timestamps: true
})

composerSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})

export const Composer = mongoose.model('Composer', composerSchema)
