
const express = require('express')
const {postcreate} = require('../controller/postcontroller')
const upload = require("../middleware/upload")
const router = express.Router()

// http method with router 
router.post('/', upload.single("image"), postcreate )

module.exports = router



//midleware 

