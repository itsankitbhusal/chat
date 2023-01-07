import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';

const Signup = () => {
    const [show, setShow] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const Navigate = useNavigate();

    const postDetails = (pic) => {
        setLoading(true);
        if (pic === undefined) {
            // toast here
            toast({
                title: 'Image Required',
                description: "please choose an image to upload",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        if (pic.type === "image/jpeg" || pic.type === "image/png") {

            // append pic to cloudinary
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "chatApp");
            data.append("cloud_name", "drygwlkir");
            fetch("https://api.cloudinary.com/v1_1/drygwlkir/image/upload", {
                method: "post",
                body: data
            })
                .then(res => res.json())
                .then(data => {
                    setPic(data.url);
                    // console.log(data.url)
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })


        } else {
            // toast here
            toast({
                title: 'Invalid Image Type',
                description: "Please choose an image to upload",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            });
            return;
        }
    }
    const handelSubmit = async () => {
        setLoading(true);
        // check if all fields are filled
        if (name === "" || email === "" || password === "" || confirmpassword === "" || pic === undefined) {
            toast({
                title: 'All Fields Required',
                description: "Please fill all fields",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }
        // check if password and confirm password are the same
        if (password !== confirmpassword) {
            toast({
                title: 'Password Mismatch',
                description: "Please check your password",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }
        // send data to server
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            }
            const { data } = axios.post("/api/user", { name, email, password, pic }, config);
            console.log(data);
            // toast here
            toast({
                title: 'Account Created',
                description: "Your account has been created successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            // redirect to /chats
            Navigate("/chats");

        } catch (error) {
            console.log(error);
            // toast here
            toast({
                title: 'Error',
                description: "Something went wrong",
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
            setLoading(false);
        }
    }

    return (
        <VStack spacing="5px">
            <FormControl id='name' isRequired>
                <FormLabel>
                    Name
                </FormLabel>
                <Input
                    placeholder='Enter your name...'
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>
                <Input
                    placeholder='Enter your email...'
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
            <FormControl id='confirmPassword' isRequired>
                <FormLabel>
                    Confirm Password
                </FormLabel>
                <InputGroup>
                    <Input
                        placeholder='Enter your confirm password...'
                        type={show ? "password" : "text"}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
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
            <FormControl id='pic'>
                <FormLabel>Upload your picture</FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={handelSubmit}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup;