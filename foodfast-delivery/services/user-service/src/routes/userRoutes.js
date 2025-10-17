const express = require('express');
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticate, userController.getMe.bind(userController));

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID
 * @access  Private (Admin only)
 */
router.get('/:id', authenticate, authorize('ADMIN'), userController.getUserById.bind(userController));

/**
 * @route   PUT /api/v1/users/:id
 * @desc    Update user profile
 * @access  Private (Own profile or Admin)
 */
router.put('/:id', authenticate, userController.updateUser.bind(userController));

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete user
 * @access  Private (Own account or Admin)
 */
router.delete('/:id', authenticate, userController.deleteUser.bind(userController));

module.exports = router;