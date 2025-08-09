const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const profileController = require("../controller/profile.controller");



const router = express.Router()

router.get("/me",
    authMiddleware,
    profileController
)

module.exports = router