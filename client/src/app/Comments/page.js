"use client"

import {useEffect, useState} from 'react'
import { Box,Button,FormControl,OutlinedInput} from '@mui/material';
import api from '../../utils/api'
import socket from '../../socket'
import { formatDistanceToNow } from "date-fns";

const Comments = ()=>{
    
    // making states
    const [comments,setComments] = useState(null);
    const [newComment,setNewComment] =useState('')

    useEffect(()=>{
      // function to fetch comments from server
      const getComments = async () => {
        const response = await api.get('/comments');
        setComments(response.data);
        
      };
      getComments() //function call

      socket.on('newComment',(newComment)=>{
       
        setComments((prev)=>[newComment,...prev]);
      })

      return () => socket.off('newComment')
      


    },[])


    // handling new post comments
    const handlePost = async ()=>{ 

      const username = localStorage.getItem('username');
      if(newComment.trim() && username){

        const resp = await api.post('/comments',{username,comments:newComment});
        setNewComment('');
         
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
        flexDirection:"column",
        width:{
          xs:"100%",
          sm:"200%",
          md:800

        },
        margin:"0 auto"
      }}>
        <h1 style={{color:"orange"}} >REAL-TIME COMMENT SYSTEM</h1>
        {/* comment screen */}
        <Box 
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "start",
              height: "90vh",
              width:"100%",
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
              <div key={index} style={{backgroundColor:"#b8c0ff",opacity:"0.8",borderRadius:"10px",padding:"20px",margin:"0 10px",boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"}}> 
                <div style={{display:"flex", justifyContent:"flex-start",gap:"5px"}}>
                  <div style={{width:"20px",height:"20px",background:"black", borderRadius:"50%"}}></div>
                  <h4 style={{color:"black",fontSize:"16px"}}>{item.username}</h4>
                  
                  <div style={{color:"#22577a",fontSize:"14px"}} >{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</div>

                </div>
                <p style={{color:"#2b2d42",marginLeft:"25px",fontSize:"14px"}}>{item.comments}</p>
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
            onChange={(e)=>{setNewComment(e.target.value)}}
            sx = {{
              backgroundColor:"white",
              width:"80%",
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