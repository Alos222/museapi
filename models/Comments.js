const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            minlength: 8,
        },
        body: {
            type: String,
            required: true,
            maxlength: 1000,
        }
    },
    { timestamps: true }
);

module.exports = User = mongoose.model('Comment', CommentSchema);