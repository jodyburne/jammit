const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    _creator: { type: Schema.Types.ObjectId, ref: "User" },
    _post: { type: Schema.Types.ObjectId, ref: "Advert" },
    content: String,
    postedBy: String,
    userEmail: String,
    creatorImg: String
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;