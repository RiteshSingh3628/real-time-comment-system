"use client"

import {useEffect, useState} from 'react'
import { Box,Button,FormControl,OutlinedInput} from '@mui/material';
import api from '../../utils/api'
import socket from '../../socket'

const Comments = ()=>{

    // making states
    const [comments,setComments] = useState(null);
    const [newComment,setNewComment] =useState('')

    useEffect(()=>{
      // function to fetch comments from server
      const getComments = async () => {
        const response = await api.get('/comments');
        setComments(response.data);
        console.log(response.data);
      };
      getComments() //function call

      socket.on('newComment',(newComment)=>{
        console.log(newComment)
        setComments((prev)=>[newComment,...prev]);
      })

      return () => socket.off('newComment')
      


    },[])


    // handling new post comments
    const handlePost = async ()=>{ 

      const username = localStorage.getItem('username');
      if(newComment.trim() && username){
        console.log("New comment is ",newComment);
        const resp = await api.post('/comments',{username,comments:newComment});
        setNewComment('');
        console.log(resp.data)
         
      }
    }
    
    


    return(
        <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ffffff",
        flexDirection:"column"
      }}>
        {/* comment screen */}
        <Box 
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "start",
              height: "90vh",
              width:"80%",
              backgroundColor: "rgb(244,244,244)",
              overflowY:"scroll",
              marginTop:"10px",
              flexDirection:"column",
              gap:"2rem",
            }}
        >

          {/* render all comments */}
          {
            
            !comments? <div style={{color:"black"}}>No comments</div>
            :
            comments.map((item,index)=>(
              <div key={index} style={{backgroundColor:"lightgreen",borderRadius:"10px",padding:"20px",margin:"0 10px"}}>
                <h4 style={{color:"black"}}>{item.username}</h4>
                <hr/>
                <p style={{color:"black"}}>{item.comments}</p>
              </div>
            ))
          }

        </Box>
        {/* input field conatiner*/}
        <Box 
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh",
              width:"80%",
              // backgroundColor: "black",
              borderRadius:"20px"
              
            }}
        >
        <FormControl fullWidth sx={{ m: 1 }}>
          <OutlinedInput
            id="outlined-adornment-amount"
            label="Enter a new comment..."
            onChange={(e)=>{setNewComment(e.target.value)}}
            sx = {{
              backgroundColor:"white",
              width:"80%"
            }}
          />
        </FormControl>
        <Button varient="contained" 
         onClick={handlePost}
         sx={{backgroundColor:"green",color:"white",width:"20%"}}
        >Submit</Button>



        </Box>
      
      </Box>
    )

}

export default Comments;