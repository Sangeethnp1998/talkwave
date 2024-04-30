import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { VStack,Input, InputGroup, InputRightElement,Button,useToast  } from '@chakra-ui/react'
import { FormControl,FormLabel } from '@chakra-ui/form-control'
import { ViewIcon ,ViewOffIcon} from '@chakra-ui/icons'

const Login = () => {
    const [show,setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [loading,setLoading] = useState(false)
    const toast = useToast()
    const history = useHistory();


    const submitHandler = async ()=>{
            if(!email ||  !password ){
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
            try {
                const body = {
                    'email' : email,
                    'password' : password
                }

                const { data } = await axios.post('http://localhost:5000/api/user/login',body);

                toast({
                        title: "Login Successful",
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
    return (
        <VStack spacing='5px'>
                <FormControl id='email' isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                    />
                </FormControl>

                <FormControl id='password' isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input 
                            type={show ? 'text' :'password'}
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e)=>{
                                setPassword(e.target.value)
                            }}
                        />
                        <InputRightElement w='2.5rem'>
                            <Button h="1.5rem" size='xs' onClick={handleClick}>
                                {show ? <ViewOffIcon/> :<ViewIcon/>}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Button
                    colorScheme='blue'
                    width='100%'
                    style={{marginTop:15}}
                    onClick={submitHandler}
                    isLoading= {loading}
                >
                    Log In
                </Button>
                <Button
                    variant= 'solid'
                    colorScheme='red'
                    width='100%'
                    onClick={()=>{
                        setEmail("guest@example.com")
                        setPassword("123456")
                    }}
                >
                    Get Guest User Credentials
                </Button>
            </VStack>
    )
}

export default Login
