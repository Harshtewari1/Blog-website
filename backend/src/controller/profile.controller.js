const User = require("../models/user.model")


async function profileController(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password"); // password hide
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}


module.exports = profileController