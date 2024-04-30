import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { VStack,Input, InputGroup, InputRightElement,Button, useToast  } from '@chakra-ui/react'
import { FormControl,FormLabel } from '@chakra-ui/form-control'
import { ViewIcon ,ViewOffIcon} from '@chakra-ui/icons'

const Signup = () => {
    const [showPass,setShowpass] = useState(false);
    const [showConfirm,setShowconfirm] = useState(false);
    const handleClickPass = () => setShowpass(!showPass);
    const handleClickConfirm = () => setShowconfirm(!showConfirm);
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()
    const [pic,setPic] = useState();
    const [loading,setLoading] = useState(false)
    const toast = useToast()
    const history = useHistory();

    const postDetails = async (event)=>{
        const image = event.target.files[0];
        setLoading(true);
        if(image === undefined){
            toast({
                title: "Please selet an Image.",
                status:'warning',
                duration: 5000,
                isClosable :true,
                position:'bottom'
            })
            return;
        }
        if(!isValidImageFormat(image)){
            toast({
                    title: "Please selet an Image.",
                    status:'warning',
                    duration: 5000,
                    isClosable :true,
                    position:'bottom'
                })
            setLoading(false)
            event.target.value = null
        }
        else{
            setLoading(false);
            setPic(image)
        }
    }
    const submitHandler = async ()=>{
        setLoading(true)
        if(!name || !email ||  !password || !confirmPassword){
            toast({
                    title: "Please fill all the fields.",
                    status:'warning',
                    duration: 5000,
                    isClosable :true,
                    position:'top'
                })
            setLoading(false)
            return
        }
        if(password !== confirmPassword){
            toast({
                    title: "Password and Confirm password should be same.",
                    status:'error',
                    duration: 5000,
                    isClosable :true,
                    position:'top'
                })
            setLoading(false)
            return
        }
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('pic', pic);
            
            const { data } = await axios.post('http://localhost:5000/api/user',formData);

            toast({
                    title: "Registration Successful",
                    status:'success',
                    duration: 5000,
                    isClosable :true,
                    position:'top'
                })
            localStorage.setItem('userInfo',JSON.stringify(data))
            setLoading(false);
            history.push('/chats')
        } catch (error) {
            toast({
                title: "An Error Occured",
                description:error.response.data.message,
                status:'error',
                duration: 5000,
                isClosable :true,
                position:'top'
            })
            setLoading(false);
        }
    }
    const isValidImageFormat = (file) => {
        const allowedFormats = ['image/jpeg', 'image/png']; // Define allowed formats
        return allowedFormats.includes(file.type);
    };
    return (
        <VStack spacing='5px'>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                    placeholder='Enter your name'
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                    placeholder='Enter your email'
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input 
                        type={showPass ? 'text' :'password'}
                        placeholder='Enter your password'
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                    <InputRightElement w='2.5rem'>
                        <Button h="1.5rem" size='xs' onClick={handleClickPass}>
                            {showPass ? <ViewOffIcon/> :<ViewIcon/>}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='confirm-password' isRequired>
                <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                    <Input 
                        type={showConfirm ? 'text' :'password'}
                        placeholder='Confirm your password'
                        onChange={(e)=>{
                            setConfirmPassword(e.target.value)
                        }}
                    />
                <InputRightElement w='2.5rem'>
                        <Button h="1.5rem" size='xs' onClick={handleClickConfirm}>
                            {showConfirm ? <ViewOffIcon/> :<ViewIcon/>}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

             <FormControl id='pic' isRequired >
                <FormLabel>Upload your Picture</FormLabel>
                    <Input 
                        ps={2} py={1}
                        type='file'
                        accept='image/*'
                        onChange={(e)=>{
                            postDetails(e)
                        }}
                    />
            </FormControl>

            <Button
                colorScheme='blue'
                width='100%'
                style={{marginTop:15}}
                onClick={submitHandler}
                isLoading= {loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup
