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

router.get('/find/:commentID', async(req, res, next) => {
    try{
        console.log(req.params.commentID)
        const comment = await Comment.findById(req.params.commentID)
        console.log(comment)

        return res.status(200).json(comment)
    } catch(err) {
        return res.status(500).json(err)
    }
})

router.get('/:artId', async(req, res, next) => {
    try {
        console.log(req.params.artId)
        const comments = await Comment.find({artId: req.params.artId})
        console.log(comments)
        return res.status(200).json(comments)
    } catch(err) {
        return res.status(500).json(err)
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

router.put('/update/:id', async(req, res, next) => {
    try {
    const { title, body } = req.body;
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body)

    // const editedComment = comment.save();
    return res.status(200).json(comment);
    } catch (err) {
        return res.status(500).json(err)
    }
});

router.delete('/delete/:commentID', async (req, res, next) => {
    try{

        const comment = await Comment.findByIdAndDelete(req.params.commentID);
        console.log("this is happening! " + comment)
        if (!comment) return res.status(404).json(err)
        return res.status(200).json(comment)
    } catch (err) {
        return res.status(500).json(err)
    }
});

module.exports = router;
