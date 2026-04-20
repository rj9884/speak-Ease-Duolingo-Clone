import express from 'express';
import {
    getLeaderboard,
    getFriendsLeaderboard,
    followUser,
    unfollowUser,
    searchUsers,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/leaderboard', protect, getLeaderboard);
router.get('/leaderboard/friends', protect, getFriendsLeaderboard);
router.get('/search', protect, searchUsers);
router.post('/follow/:id', protect, followUser);
router.post('/unfollow/:id', protect, unfollowUser);

export default router;
