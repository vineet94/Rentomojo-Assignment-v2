require('../models/CommentThread');
const mongoose = require('mongoose');
const Comment = mongoose.model('comments');
const authenticate = require('../middlewares/authenticate');

module.exports = (app) => {
    app.post('/api/comments', authenticate, async (req, res) => {
        let comment = new Comment({
            ...req.body
        });
        try {
            if (!comment.parent) {
                await comment.save();
            } else {
                const parentComment = await Comment.findById(comment.parent);
                parentComment.replies.push(comment);
                await parentComment.save();
                await comment.save();
            }
            comment = await comment.populate('user', 'name').execPopulate();
            res.send(comment);
        } catch (e) {
            res.status(400).send(e);
        }
    });

    app.patch('/api/comments', authenticate, async (req, res) => {
        let comment = new Comment({
            ...req.body
        });
        try {
            const updateComment = await Comment.findOne({_id: comment._id, user: comment.user});
            updateComment.comment = comment.comment;
            await updateComment.save();
            comment = await comment.populate('user', 'name').execPopulate();
            res.send(comment);
        } catch (e) {
            res.status(400).send(e);
        }
    });

    app.get('/api/comments/blog/:blogId', async (req, res) => {
        const blogId = req.params.blogId;
        try {
            const comments = await Comment.find({blog: blogId, parent: null})
                .populate('user', 'name')
                .exec();
            if (!comments) {
                return res.status(404).send();
            }
            return res.send(comments);
        } catch (e) {
            return res.status(500).send(e);
        }
    });

    app.get('/api/comments/replies/:replyIds', async (req, res) => {
        console.log(req.params);
        const replyIds = req.params.replyIds.split(',');
        try {
            const comments = await Comment.find({_id: replyIds})
                .populate('user', 'name')
                .exec();
            if (!comments) {
                return res.status(404).send();
            }
            return res.send(comments);
        }catch (e) {
            return res.status(500).send(e);
        }
    })
};