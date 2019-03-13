var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
   title: String,
   subject: String,
   content: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      fullName: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
   date: {type: Date, default: Date.now},
   report: Number
});

module.exports = mongoose.model("Post", postSchema);