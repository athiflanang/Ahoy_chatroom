const router = require('express').Router()
const userController = require('../controller/userController')
const categoryController = require('../controller/categoryController')
const messageController = require('../controller/messageController')
const authentication = require('../middleware/authentication')
const errorHandler = require('../middleware/errorHandlers')
const upload = require('../helper/multer')

//login
router.post('/login', userController.login)
router.post('/register', userController.register)

router.use(authentication)

//category
router.get('/category', categoryController.fetchAllCategory)

//add image
router.post('/upload', upload.single('img'), messageController.uploadImage)

router.use(errorHandler)

module.exports = router
