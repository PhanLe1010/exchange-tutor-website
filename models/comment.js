var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    content: String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        fullName: String
    },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", commentSchema);