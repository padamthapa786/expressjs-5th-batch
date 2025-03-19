
const express = require('express')
const usercreate = require('../controller/usercontroller')
const router = express.Router()

router.post('/getalluser', usercreate)

module.exports = router