import mongoose from 'mongoose'
import library from '../schemas/library.schema.js'

const Library = mongoose.model('Library', library)

export default Library
