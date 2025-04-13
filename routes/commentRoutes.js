const express = require('express');
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  upvoteComment,
  downvoteComment,
} = require('../controllers/commentController');

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router
  .route('/')
  .get(getComments)
  .post(protect, addComment);

router
  .route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

router.put('/:id/upvote', protect, upvoteComment);
router.put('/:id/downvote', protect, downvoteComment);

module.exports = router;