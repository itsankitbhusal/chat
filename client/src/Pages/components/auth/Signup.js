import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState();

    const postDetails = (pic) => {

    }
    const handelSubmit = () => {

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
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup;