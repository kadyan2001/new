const express = require('express')
const { validateSigninRequest,validateSignupRequest, isRequestValidated } = require('../middlewares')
const { signin, signup } = require('../auth')
const router = express.Router()

router.post('/signin',validateSigninRequest,isRequestValidated,signin)
router.post('/signup',validateSignupRequest,isRequestValidated,signup)

module.exports = router