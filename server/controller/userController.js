const { compare } = require('../helper/bcrypt')
const { User } = require('../models')
const { signToken, verfiedToken } = require("../helper/jwt")

class userController {
  static async register(req, res, next) {
    try {
      const { username, password } = req.body
      const registrationUser = await User.create({ username, password })

      const newVerifiedUser = [registrationUser.username]
      res.status(201).json({
        newVerifiedUser
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body

      if (!username || !password) throw { name: `InvalidLogin` }

      const loginUser = await User.findOne({
        where: {
          username
        }
      })

      if (!compare(password, loginUser.password)) throw { name: `LoginError` }

      const payload = {
        id: loginUser.id,
        email: loginUser.email,
      }

      const access_token = signToken(payload)
      res.status(200).json({
        access_token
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController