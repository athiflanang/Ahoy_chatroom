const { Category } = require('../models')

class categoryController {
  static async fetchAllCategory(req, res, next) {
    try {
      const fetchAllCategory = await Category.findAll()

      res.status(201).json({
        fetchAllCategory
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = categoryController