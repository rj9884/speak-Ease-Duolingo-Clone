import User from '../models/User.js';
import Progress from '../models/Progress.js';

// @desc    Get global leaderboard
// @route   GET /api/users/leaderboard
// @access  Private
export const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Progress.find({})
            .populate('userId', 'name email')
            .sort({ quizScore: -1, streakDays: -1 })
            .limit(20);

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get friends leaderboard
// @route   GET /api/users/leaderboard/friends
// @access  Private
export const getFriendsLeaderboard = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const friends = user.following;
        
        // Include self in friends leaderboard
        const filterIds = [...friends, req.user._id];

        const leaderboard = await Progress.find({ userId: { $in: filterIds } })
            .populate('userId', 'name email')
            .sort({ quizScore: -1, streakDays: -1 })
            .limit(20);

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Follow a user
// @route   POST /api/users/follow/:id
// @access  Private
export const followUser = async (req, res) => {
    try {
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (currentUser.following.includes(req.params.id)) {
            return res.status(400).json({ message: 'Already following this user' });
        }

        currentUser.following.push(req.params.id);
        userToFollow.followers.push(req.user._id);

        await currentUser.save();
        await userToFollow.save();

        res.json({ message: 'Followed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Unfollow a user
// @route   POST /api/users/unfollow/:id
// @access  Private
export const unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user._id);

        if (!userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        currentUser.following = currentUser.following.filter(
            (id) => id.toString() !== req.params.id
        );
        userToUnfollow.followers = userToUnfollow.followers.filter(
            (id) => id.toString() !== req.user._id.toString()
        );

        await currentUser.save();
        await userToUnfollow.save();

        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user search (to find people to follow)
// @route   GET /api/users/search
// @access  Private
export const searchUsers = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                  $or: [
                      { name: { $regex: req.query.keyword, $options: 'i' } },
                      { email: { $regex: req.query.keyword, $options: 'i' } },
                  ],
              }
            : {};

        const users = await User.find({ ...keyword, _id: { $ne: req.user._id } }).select('name email');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
