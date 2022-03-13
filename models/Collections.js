const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema(
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
        description: {
            type: String,
            required: true,
            maxlength: 1000,
        },
        artwork: [{
            type: String
        }]
    },
    { timestamps: true }
);

module.exports = User = mongoose.model('Comments', CollectionSchema);