import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handelSubmit = () => {
        // code
    }
    return (
        <VStack spacing="5px">

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

            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={handelSubmit}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
            >
                Get Guest User Credentials
            </Button>
        </VStack>
    )
}

export default Login