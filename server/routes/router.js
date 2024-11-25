const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/',(req,resp)=>{
    resp.send("Welcome to real-time comment system")
})

// router to login
router.post('/login',(req,resp)=>{
    const {username} = req.body;
    const sessioId = Date.now();
    resp.json({username,sessioId});
})

//router to post comment 
router.post('/comments',(req,resp)=>{
    const { username, comment } = req.body;
    const q = "INSERT INTO comments(username,comments) VALUES (?,?)"
    const values = [username,comment];
   
    db.query(q,values,(err)=>{
        if(err) return resp.status(500).json({error:"Error posting comment"})
        const io = req.io;//req.io ensures that every request has access to io
        io.emit('new_comment',{username,comment,timestamp:new Date})
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