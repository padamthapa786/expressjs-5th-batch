
const express = require('express')

const {signUp,login, userFetch} = require('../controller/usercontroller')
const checkAuth = require('../middleware/checkauth')

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', checkAuth, login)
router.get("/user",checkAuth,  userFetch)


module.exports = router