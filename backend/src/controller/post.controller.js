const postModel = require("../models/post.model")
const userModel = require("../models/user.model")



async function createPost(req, res){
    const { title, content } = req.body
    if (!req.userId) {
        return res.status(400).json({ message: "User ID not found in request" });
    }
    try {
        const newPost = new postModel({
            title,
            content,
            userId: req.userId,
        });
        await newPost.save();
        res.status(201).json({ message: "Post created successfully" });
    } catch (err) {
        res.status(500).json({
            message: "error creating post",
            error: err.message
        })
    }
}

async function getSinglePost(req, res) {
    try {
        const postId = req.params.id;

        // Post ko DB se fetch karo
        const post = await postModel.findById(postId).populate("userId", "email name");

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching post",
            error: error.message
        });
    }
}


async function getAllPost(req, res) {
    try {
        const posts = await postModel.find().populate("userId", "email").sort({ createdAt: -1 })


        res.status(200).json({
            posts
        })
    } catch (error) { 
        res.status(500).json({message:"error fetching posts", error})
    }
}

async function deletePost(req, res) {
   try {
       const postId = req.params.id;
       console.log("postid: ", postId);
       
      

       const post = await postModel.findById(postId)
       console.log("Fetched Post:", post);

       if (!post.userId) {
           return res.status(400).json({ message: "Post has no userId (invalid post data)" });
       }

       if (!post) {
           return res.status(404).json({ message: "Post not found" });
       }        

       if (post.userId.toString() !== req.user._id.toString()) {
           return res.status(403).json({ message: "Unauthorized delete" });
       }

       await postModel.findByIdAndDelete(postId);
       res.status(200).json({ message: "Post deleted successfully" });  

   } catch (err) {
       res.status(500).json({ message: "Error deleting post", error: err.message });
   }


}

async function updatePost(req,res) {
    try {
        const postId = req.params.id
        const { title, content } = req.body;
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this post" });
        }

        if (title) post.title = title;
        if (content) post.content = content;

        await post.save();

        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        res.status(500).json({ message: "Error updating post", error: err.message });
    }
}

async function myPost(req, res) {
    try {
        // req.userId middleware se aa raha hoga (JWT auth ya session se)
        if (!req.userId) {
            return res.status(400).json({ message: "User ID not found in request" });
        }

        // Sirf current user ki posts fetch karna
        const posts = await postModel
            .find({ userId: req.userId })
            .populate("userId", "email name") // optional, agar author ka naam/email bhi dikhana hai
            .sort({ createdAt: -1 });

        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching your posts",
            error: error.message
        });
    }
}




module.exports = {
    createPost,
    getAllPost,
    deletePost,
    updatePost,
    myPost,
    getSinglePost
}
