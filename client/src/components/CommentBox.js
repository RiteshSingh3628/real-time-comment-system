import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import api from '../../utils/api';

export default function CommentBox({ onNewComment }) {
  const [comment, setComment] = useState('');

  const handlePost = async () => {
    const username = localStorage.getItem('username');
    if (comment.trim() && username) {
      const response = await api.post('/comments', { username, comment });
      setComment('');
      onNewComment(response.data);
    }
  };

  return (
    <Box display="flex" mt={2}>
      <TextField
        label="Write a comment..."
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handlePost} sx={{ ml: 2 }}>
        Post
      </Button>
    </Box>
  );
}