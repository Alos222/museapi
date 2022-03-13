const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        artId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = User = mongoose.model('Comment', CommentSchema);