'use client'
import { useState } from "react";
import { useRouter } from "next/compat/router";
import {Box, Button,TextField,Typography,Alert,Snackbar} from '@mui/material'
import api from "../utils/api";



function Login() {
  const router = useRouter();
  const [username,setUsername] = useState('');
  // const [response,setResponse] = useState(null)
  const [severity, setSeverity] = useState("success"); // "success", "error", "warning", "info"
  const [responseMessage, setResponseMessage] = useState("");
  const [open, setOpen] = useState(false);

  // router


  //Handling login function 
  const handleLogin = async()=>{
    // if (!router) return; // Ensure router is initializedcketsocket
    try{
      // Post request
      const res = await api.post('/login',{username});
      const data = res.data

      // setting the username in local storage
      localStorage.setItem('username',data.username);

      // setting alert message
      setResponseMessage(`Login successful`)
      setSeverity("success")
      setOpen(true)
      router.push('/comments');


    }catch(err){
      // setting alert message
      console.log(err)
      setResponseMessage("Login failed")
      setSeverity("error")
      setOpen(true)
    }
      
          
  }

  // handle open and close of alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          width: "400px",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#11111",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: "1rem", color: "darkviolet" }}
        >
          Comment System
        </Typography>
        <Box component="form">
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            onChange={(e)=>{setUsername(e.target.value)}}
            InputLabelProps={{ style: { color: "violet" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "violet",
                },
                "&:hover fieldset": {
                  borderColor: "violet",
                },
              },
            }}
          />
          <Button
            fullWidth
            onClick={handleLogin}
            variant="contained"
            sx={{
              marginTop: "1rem",
              backgroundColor: "gray",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            Login
          </Button>


        </Box>
      </Box>

       {/* Snackbar for displaying the alert */}
       <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </Box>

  )
}

export default Login

