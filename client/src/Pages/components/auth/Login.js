import React, { useState } from 'react'
import axios from 'axios';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const Navigate = useNavigate();
    const toast = useToast();
    const [show, setShow] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const handelSubmit = async () => {
        // code
        setLoading(true)
        // check if email and password id provided
        if (email === "" || password === "") {
            // warning toast
            toast({
                title: 'Email and Password Required',
                description: "Please enter your email and password",
                status: 'warning',
                duration: 9000,
                isClosable: true,

            });
            setLoading(false);
            return;
        }
        // make a post request to the server
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post(
                "api/user/login",
                { email, password },
                config
            );
            console.log("data: ", data);
            // if success
            toast({
                title: 'Login Successful',
                description: "You are now logged in",
                status: 'success',
                duration: 9000,
                isClosable: true,

            });
            // save the token in local storage
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            Navigate("/chats");



        } catch (error) {
            // toast
            toast({
                title: 'Login Failed',
                description: "Please check your email and password",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            setLoading(false);

        }


    }
    return (
        <VStack spacing="5px">

            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>
                <Input
                    placeholder='Enter your email...'
                    value={email}
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input
                        placeholder='Enter your password...'
                        type={show ? "password" : "text"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={
                            () => { setShow(!show) }
                        }>
                            {show ? "Show" : "hide"}
                        </Button>
                    </InputRightElement>

                </InputGroup>
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={handelSubmit}
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("123456");
                }}
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login