const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const router = express.Router();

// @route  POST api/posts
// @des create post
// @access private

router.post(
  '/',
  [auth, [check('text', 'text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };
      const post = new Post(newPost);
      post.save();
      res.json({ post });
    } catch (error) {
      console.error(error.message);
      res.status(500).json('Server error');
    }
  }
);

// @route  GET api/posts
// @des get all posts
// @access private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json({ count: posts.length, posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
});

// @route  GET api/posts/:id
// @des get posts by id
// @access private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json({ msg: 'Post not found' });
    }
    res.json({ post });
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' });
    res.status(500).json('Server error');
  }
});

// @route  DELETE api/posts/:id
// @des delete post by id
// @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    let post = await Post.findOne({ _id: postId });
    console.log(post);

    //check
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    //check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    post = await Post.findOneAndDelete({ _id: postId });
    console.log(post);
    res.json({ msg: 'Delete post successfully' });
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Post is not found' });
    res.status(500).json('Server error');
  }
});

// @route  Put api/posts/like/:id
// @des like the post
// @access private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findOne({ _id: postId });
    // check if the post has already been liked

    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.json({ msg: 'Post already liked by user' });
    }
    post.likes.push({ user: req.user.id });
    await post.save();
    res.json({ like: post.likes });
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Post is not found' });
    res.status(500).json('Server error');
  }
});

// @route  Put api/posts/unlike/:id
// @des unlike the post
// @access private
router.put('/unlike/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post is not found' });
    // check if the post has already been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.json({ msg: 'Post has not yet liked by user' });
    }

    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(404).json({ msg: 'Post is not found' });
    res.status(500).json('Server error');
  }
});

// @route  put api/posts/comment/:id
// @des commenton a post
// @access private

router.put(
  '/comment/:id',
  [auth, [check('text', 'text is required').not().isEmpty()]],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.user.id);
      if (!post) return res.statsus(400).json({ msg: 'Post not found' });

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.push(newComment);
      await post.save();
      res.json({ comments: post.comments });
    } catch (error) {
      console.error(error.message);
      if (error.kind == 'ObjectId')
        return res.status(404).json({ msg: 'Post is not found' });
      res.status(500).json('Server error');
    }
  }
);
// @route  put api/posts/comment/:id
// @des commenton a post
// @access private

router.put(
  '/comment/:id',
  [auth, [check('text', 'text is required').not().isEmpty()]],
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.user.id);
      if (!post) return res.statsus(400).json({ msg: 'Post not found' });

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.push(newComment);
      await post.save();
      res.json({ comments: post.comments });
    } catch (error) {
      console.error(error.message);
      if (error.kind == 'ObjectId')
        return res.status(404).json({ msg: 'Post is not found' });
      res.status(500).json('Server error');
    }
  }
);

// @route DELETE api/posts/comment/id
// @desc delete post
// @access private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) return res.status(400).json({ msg: 'Post not found' });
    const comment = post.comments.find(
      (cmt) => cmt._id.toString() === req.params.comment_id
    );
    if (!comment)
      return res.status(404).json({ msg: 'Comment not not exists' });
    //check user authorized
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'User not authorized' });

    post.comments = post.comments.filter(
      (cmt) => cmt._id.toString() !== req.params.comment_id
    );
    await post.save();
    res.json({
      msg: 'deleted comment successfully',
      comments: post.comments,
    });
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId')
      return res.status(400).json({ msg: 'Post not found' });
    res.status(500).send('Server error');
  }
});

module.exports = router;
