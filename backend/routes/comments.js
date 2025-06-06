const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/:postId', auth, commentController.createComment);
router.get('/:postId', commentController.getComments);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;
