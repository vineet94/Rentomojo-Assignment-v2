const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
        type: String,
        minLength: 10,
        maxLength: 100,
        required: true,
        trim: true
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'blog'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'comments',
        default: null
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'replies'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
}, {
    timestamps: true
});

mongoose.model('comments', commentSchema);