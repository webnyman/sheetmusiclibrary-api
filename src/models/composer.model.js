import mongoose from 'mongoose'
import composerSchema from '../schemas/composer.schema.js'

const Composer = mongoose.model('Composer', composerSchema)

export default Composer
