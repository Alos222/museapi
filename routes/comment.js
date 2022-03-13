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


module.exports = router;
