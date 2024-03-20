import mongoose from 'mongoose'
import composerSchema from '../schemas/composer.schema.js'

const Composer = mongoose.model('Category', composerSchema)

export default Composer
