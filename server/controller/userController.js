const { compare } = require('../helper/bcrypt')
const { User } = require('../models')
const { signToken, verfiedToken } = require("../helper/jwt")
const { OAuth2Client } = require('google-auth-library');
const { where } = require('sequelize');

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

  static async googleAuth(req, res, next) {
    try {
      const { token } = req.headers
      const client = new OAuth2Client()

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_LOGIN_KEY
      })

      const payload = ticket.getPayload()
      console.log(payload);

      const [user, created] = await User.findOrCreate({
        where: {
          username: payload.email
        },
        defaults: {
          username: payload.email,
          password: 'password_google'
        },
        hooks: false
      })

      const access_token = signToken({
        id: user.id,
        username: user.username
      })

      res.status(200).json({ access_token })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = userController