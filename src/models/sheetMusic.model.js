import mongoose from 'mongoose'
import sheetMusicSchema from '../schemas/sheetMusic.schema.js'

const sheetMusic = mongoose.model('Category', sheetMusicSchema)

export default sheetMusic
