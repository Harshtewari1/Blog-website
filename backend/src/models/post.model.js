const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdAt: { type: Date, default: Date.now }
})

const postModel = mongoose.model("post", postSchema)


module.exports = postModel