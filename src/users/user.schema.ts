import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

export const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UsersSchema.pre('save', (next) => {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  if(!user.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if(err) next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err)
      user.password = hash
      next()
    })
  })
})

UsersSchema.methods.checkPassword = (attempt, callback) => {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  bcrypt.compare(attempt, user.password, (err, isMatch) => {
    if(err) return callback(err)
    callback(null, isMatch)
  })
}