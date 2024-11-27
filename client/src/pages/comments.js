'use client'
import React from 'react'
import { useState,useEffect} from 'react'
import api from '../utils/api'
import socket from '../socket'
function comments() {
    const [comments,setComments] = useState([]);
    useEffect(()=>{
        console.log("We are reading comments")
        const fetchComments = async()=>{
            const res = await api.get('/comments');
            setComments(res.data)
            console.log(res.data)
        }

        fetchComments();
    },[])
  return (
    <div>
      {
        !comments?<h6>No comments</h6>
        : comments.map((comment)=>{
            <div>user: {comment.username}</div>
        })
      }
    </div>
  )
}

export default comments
