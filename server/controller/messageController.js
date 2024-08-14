const { Message, User, Category } = require('../models')
const { v2: cloudinary } = require('cloudinary')

class messageController {
  static async uploadImage(req, res, next) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      })

      const { UserId } = req.loginInfo

      const file = req.file

      const base64 = file.buffer.toString("base64")

      const output = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64}`
      )

      await Message.create({ message: output.secure_url, UserId })

      res.status(200).json({
        message: `successfully add image`
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = messageController