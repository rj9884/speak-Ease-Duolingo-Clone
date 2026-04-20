import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import jwt from 'jsonwebtoken';

let mongoServer;

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect(); // Disconnect from real DB if connected
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
});

beforeEach(async () => {
    await User.deleteMany({});
    await Progress.deleteMany({});
});

describe('User Leaderboard and Follow Logic', () => {
    it('should fetch an empty leaderboard', async () => {
        const user = await User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        });
        const token = generateToken(user._id);

        const res = await request(app)
            .get('/api/users/leaderboard')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

    it('should fetch users in sorted order by XP', async () => {
        const user1 = await User.create({ name: 'User 1', email: 'u1@ex.com', password: 'p' });
        const user2 = await User.create({ name: 'User 2', email: 'u2@ex.com', password: 'p' });
        
        await Progress.create({ userId: user1._id, quizScore: 100, streakDays: 2 });
        await Progress.create({ userId: user2._id, quizScore: 200, streakDays: 5 });

        const token = generateToken(user1._id);
        const res = await request(app)
            .get('/api/users/leaderboard')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
        expect(res.body[0].userId.name).toEqual('User 2');
        expect(res.body[1].userId.name).toEqual('User 1');
    });

    it('should follow and unfollow a user', async () => {
        const user1 = await User.create({ name: 'User 1', email: 'u1@ex.com', password: 'p' });
        const user2 = await User.create({ name: 'User 2', email: 'u2@ex.com', password: 'p' });
        
        const token = generateToken(user1._id);

        // Follow
        const followRes = await request(app)
            .post(`/api/users/follow/${user2._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(followRes.statusCode).toEqual(200);
        
        const updatedUser1 = await User.findById(user1._id);
        expect(updatedUser1.following).toContainEqual(user2._id);

        // Unfollow
        const unfollowRes = await request(app)
            .post(`/api/users/unfollow/${user2._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(unfollowRes.statusCode).toEqual(200);
        
        const finalUser1 = await User.findById(user1._id);
        expect(finalUser1.following).not.toContainEqual(user2._id);
    });

    it('should fetch friends-only leaderboard', async () => {
        const me = await User.create({ name: 'Me', email: 'me@ex.com', password: 'p' });
        const friend = await User.create({ name: 'Friend', email: 'f@ex.com', password: 'p' });
        const stranger = await User.create({ name: 'Stranger', email: 's@ex.com', password: 'p' });
        
        await Progress.create({ userId: me._id, quizScore: 50 });
        await Progress.create({ userId: friend._id, quizScore: 100 });
        await Progress.create({ userId: stranger._id, quizScore: 200 });

        me.following.push(friend._id);
        await me.save();

        const token = generateToken(me._id);
        const res = await request(app)
            .get('/api/users/leaderboard/friends')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2); // Me and Friend
        expect(res.body.map(p => p.userId.name)).toContain('Me');
        expect(res.body.map(p => p.userId.name)).toContain('Friend');
        expect(res.body.map(p => p.userId.name)).not.toContain('Stranger');
    });
});
