import Comment from '../models/comment.js'
import Post from '../models/post.js'
import User from '../models/user.js'

export const addComment = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postid });
    if (!req.body.comment)
      return res.status(500).send({
        success: false,
        message: "Cant make an empty comment",
      });
    if (!post)
      return res.status(400).send({
        success: false,
        message: "Post doesn't exist",
      });
    const comment = await Post.updateOne(
      { _id: req.params.postid },
      { $push: { comments: { user: req.user._id, comment: req.body.comment } } }
    );

    res.status(200).send({
      success: true,
      message: "Comment posted",
    });

  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }

}


export const getCommentsWithUserData = async (req, res) => {

  try {

    const posts = await Post.find({ _id: req.params.postid }).select('comments -_id');
    const populatedComments = await Post.populate(posts, {
      path: "comments",
      populate: {
        path: "postedBy",
        select: "userName profilePic"
      }
    }
    );
    await res.json(populatedComments)
    return populatedComments;
  }

  catch (err) {
    console.log(err)
  }

}