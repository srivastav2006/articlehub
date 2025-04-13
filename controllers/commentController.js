const Comment = require('../models/Comment');
const Article = require('../models/Article');

// @desc    Get comments for an article
// @route   GET /api/articles/:articleId/comments
// @access  Public
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId })
      .populate({
        path: 'user',
        select: 'name profilePicture',
      });

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to article
// @route   POST /api/articles/:articleId/comments
// @access  Private
exports.addComment = async (req, res, next) => {
  try {
    req.body.article = req.params.articleId;
    req.body.user = req.user.id;

    const article = await Article.findById(req.params.articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'No article found with that id',
      });
    }

    const comment = await Comment.create(req.body);

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'No comment found with that id',
      });
    }

    // Make sure user is comment owner
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this comment',
      });
    }

    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'No comment found with that id',
      });
    }

    // Make sure user is comment owner
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this comment',
      });
    }

    await comment.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upvote a comment
// @route   PUT /api/comments/:id/upvote
// @access  Private
exports.upvoteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'No comment found with that id',
      });
    }

    comment.upvotes += 1;
    await comment.save();

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Downvote a comment
// @route   PUT /api/comments/:id/downvote
// @access  Private
exports.downvoteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'No comment found with that id',
      });
    }

    comment.downvotes += 1;
    await comment.save();

    res.status(200).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};