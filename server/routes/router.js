const express = require('express')
const db = require('../db')

const router = express.Router()



// router to login
router.post('/login',(req,resp)=>{
    const {username} = req.body;
    console.log(username)
    const sessioId = Date.now();
    resp.json({username,sessioId});
})

//router to post comment 
router.post('/comments',(req,resp)=>{
    const {username,comments} = req.body;
    const q = "INSERT INTO comments(username,comments) VALUES (?,?)"
    const values = [username,comments];
   
    db.query(q,values,(err)=>{
        if(err) return resp.status(500).json({error:"Error posting comment"})
        const io = req.io;//req.io ensures that every request has access to io
        io.emit('newComment',{username,comments,timestamp:new Date})
        return resp.status(200).json("comment added")

    })
})

// router to get all comments
router.get('/comments', (req, res) => {
    const q = 'SELECT * FROM comments'
    db.query(q, (err, results) => {
        if (err) return res.status(500).send('Error retrieving comments');
        res.status(200).json(results);
    });
});


module.exports = router;