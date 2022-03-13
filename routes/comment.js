const router = require('express').Router();
const Comment = require('../models/Comments');


router.get('/', async(req, res, next) => {
    try{
        const comment = await Comment.find()
        return res.status(200).json({
            data: comment
        });
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

router.post('/create', async (req, res, next) => {
    try{
        const { username, artId, title, body, userId } = req.body;
        const comment = await Comment.create(req.body);
        return res.status(200).json(comment)
    } catch (err) {
        return res.status(500).json(err)
    }
});

router.put('/:id', async(req, res, next) => {
    try {
        const { username, artId, title, body, userId } = req.body;
        const comment = await Comment.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body
        }, 
        {
            new: true,
        }
    )

    const editedComment = comment.save();
    return res.status(200).json(editedComment);
    } catch (err) {
        return res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res, next) => {
    try{
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).json(err)
        return res.status(200).json(comment)
    } catch (err) {
        return res.status(500).json(err)
    }
});

module.exports = router;
