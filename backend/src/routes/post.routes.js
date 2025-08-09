const express = require("express")
const {createPost , getAllPost , deletePost , updatePost , myPost ,getSinglePost} = require("../controller/post.controller")
const authMiddleware = require("../middleware/auth.middleware")


const router = express.Router()

router.get("/getAllPost", 
    authMiddleware,
    getAllPost
)


router.get("/myPost",
    authMiddleware,
    myPost
)



router.post("/createPost",
    authMiddleware,
    createPost
)


router.delete("/deletePost/:id",
    authMiddleware,
    deletePost
)


router.patch("/updatePost/:id",
    authMiddleware,
    updatePost
)

router.get("/getSinglePost/:id",
    authMiddleware,
    getSinglePost
)

module.exports = router