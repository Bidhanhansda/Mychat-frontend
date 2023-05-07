import React, { useContext, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { useLoginUserMutation } from '../services/appApi';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from "../context/appContext";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function Login() {
  
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [loginUser, {isLoading, error}] =useLoginUserMutation();
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }

    ))
  }
const email = input.email;
const password = input.password;


  const handleSubmit = (e) => {
    e.preventDefault();
    
    loginUser({email, password}).then(({data}) => {
      if(data) {
        //socket
        socket.emit("new-user");
        //navigate to messeges
        navigate("/messeges");
      }
    })
  }

  const particlesInit = async (main) => {
    console.log(main);

    await loadFull(main);
  };

  return (
    <div className='xl:max-w-[1920px] w-full h-full fixed md:flex-row flex-col flex bg-appBackground pt-12 justify-center items-center'>

      <div className='flex justify-center text-center  items-center p-3 mx-3 shadow-xl rounded-2xl bg-appBackground shadow-purple-700'>

        <form onSubmit={handleSubmit} >
          <Box display="flex"
            flexDirection={"column"}
            maxWidth={500}
            alignItems="center"
            justifyContent={"center"}
            
          >
            <Typography>Login</Typography>
            {error && <p className="alert alert-danger w-full">Invalid Email or Password</p>}
            <TextField
              name='email'
              value={input.email}
              onChange={handleChange}
              type={'email'}
              label="Email"
              fullWidth
              
              sx={{ margin: 2 }}
              helperText="We'll never share your email with anyone else."
            />
            <TextField
              name='password'
              value={input.password}
              onChange={handleChange}
              label="Password"
              type={"password"}
              fullWidth
              sx={{ margin: 2 }}
            />
            <div className='flex justify-center items-center'>
              <Button type='submit' variant="contained" >Login</Button>


            </div>
            <Typography sx={{ margin: 2 }}>Don't have an account ? <Button variant='text'><Link to="/signup" >signup.</Link></Button></Typography>
          </Box>

        </form>



      </div>


      <Particles id="particles-here" init={particlesInit} 
      options={{
        "fullScreen": {
            "enable": true,
            "zIndex": -1
        },
        "particles": {
            "number": {
                "value": 10,
                "density": {
                    "enable": false,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#fff"
            },
            "shape": {
                "type": "star",
                "options": {
                    "sides": 5
                }
            },
            "opacity": {
                "value": 0.8,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 8,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "rotate": {
                "value": 0,
                "random": true,
                "direction": "clockwise",
                "animation": {
                    "enable": true,
                    "speed": 5,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 600,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 2
            },
            "move": {
                "enable": true,
                "speed": 8,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": ["grab"]
                },
                "onclick": {
                    "enable": false,
                    "mode": "bubble"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 4,
                    "opacity": 8,
                    "speed": 5
                },
                "repulse": {
                    "distance": 200
                },
                "push": {
                    "particles_nb": 10
                },
                "remove": {
                    "particles_nb": 6
                }
            }
        },
        "retina_detect": true,
        "background": {
            "color": " transparent",
            "image": "",
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover"
        }
    }} />


      <div className='flex justify-center items-center  m-3 md:w-[70%] w-[90%]  rounded-xl shadow-xl shadow-purple-700 collapse '>
        <img src="https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt='signup-image'
          className='   bg-center bg-cover bg-no-repeat overflow-hidden rounded-xl  '
        />

      </div>
    </div>
  )
}

export default Login;