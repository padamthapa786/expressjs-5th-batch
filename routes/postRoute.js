
const express = require('express')
const {postcreate, postGet} = require('../controller/postcontroller')
const upload = require("../middleware/upload")
const checkAuth = require('../middleware/checkauth')
const router = express.Router()

// http method with router 
router.post('/',checkAuth, upload.array("images",10), postcreate )
router.get("/", postGet  )


module.exports = router



//midleware 

