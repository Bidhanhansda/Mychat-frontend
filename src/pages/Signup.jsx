import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { robot } from "../assets";
import { UilPlusCircle } from '@iconscout/react-unicons';
import {useSignupUserMutation} from "../services/appApi"
import { Link, useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";


function Signup() {

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [signupUser, {isLoading, error}] = useSignupUserMutation();

  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const name = input.name;
  const email = input.email;
  const password = input.password;
  

  function validateImg(e) {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage(){
    const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Mychat");
        try{
          setUploadingImg(true);
          let res = await fetch("https://api.cloudinary.com/v1_1/bidcode/image/upload ",{
            method: "post",
            body: data
    
        })
        const urlData = await res.json();
        setUploadingImg(false);
        return urlData.url
        }catch(error){
          setUploadingImg(false);
          console.log(error);
        }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
   if(!image) return alert("Please upload your profile picture");
   const url = await uploadImage(image);
   console.log(url);
   
   signupUser({ name , email, password, picture:url}).then(({data}) =>{
    if(data) {
    
      navigate("/messeges");
    }
   })
   
  }

  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };

  return (
    <div className='xl:max-w-[1920px] w-full h-full fixed md:flex-row flex-col flex   md:pt-12 p-0 justify-center items-center bg-appBackground  '>
      <div className='flex  justify-center items-center w-[70%] mx-3 collapse  '>
        <img src="https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt='signup-image'
          className='  mt-4 md:h-[full]  w-full bg-center bg-cover bg-no-repeat overflow-hidden   '
        />

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


      <div className='flex justify-center   items-center p-3 mx-3 shadow-xl rounded-2xl h-[70vh]  bg-appBackground shadow-purple-700'>

        <form onSubmit={handleSubmit} >
          <Box display="flex"
            flexDirection={"column"}
            maxWidth={500}
            alignItems="center"
            justifyContent={"center"}

          >
            <Typography sx={{ margin: 2 }}>Create account</Typography>
            <div className=' w-[100px] h-[100px] mx-0 my-auto relative'>
              <img src={imagePreview || robot} alt='robo-Img' className='w-[100px] h-[100px] rounded-full border-gray-500  border-2 object-cover' />

              <label htmlFor='image-upload' className='image-upload-label'><UilPlusCircle className="absolute rounded-full bg-green-500 cursor-pointer z-[99] bottom-0 right-2" /></label>

              <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
            </div>
            <TextField
              onChange={handleChange}
              name="name"
              value={input.name}
              label="Username"
              type={"text"}
              fullWidth
              sx={{ margin: 1 }}
            />
            <TextField
              onChange={handleChange}
              name="email"
              value={input.email}
              label="Email"
              type={"email"}
              fullWidth
              sx={{ margin: 1 }}
              helperText="We'll never share your email with anyone else."
            />
            <TextField
              onChange={handleChange}
              name='password'
              value={input.password}
              label="Password"
              type={"password"}
              fullWidth
              sx={{ margin: 1 }}
            />
            <div className='flex justify-center items-center'>
              <Button type='submit' variant="contained" >{uploadingImg ? "Signing you up" : "Signup"}</Button>


            </div>
            <Typography sx={{ margin: 2 }}>Already have an account ? <Button variant='text'><Link to="/login" >Login.</Link></Button></Typography>
          </Box>

        </form>



      </div>
    </div>
  )
}

export default Signup;