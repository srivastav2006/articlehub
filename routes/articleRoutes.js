const express = require('express');
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  upvoteArticle,
  downvoteArticle,
} = require('../controllers/articleController');

// Include other resource routers
const commentRouter = require('./commentRoutes');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:articleId/comments', commentRouter);

router
  .route('/')
  .get(getArticles)
  .post(protect, createArticle);

router
  .route('/:id')
  .get(getArticle)
  .put(protect, updateArticle)
  .delete(protect, deleteArticle);

router.put('/:id/upvote', protect, upvoteArticle);
router.put('/:id/downvote', protect, downvoteArticle);

module.exports = router;