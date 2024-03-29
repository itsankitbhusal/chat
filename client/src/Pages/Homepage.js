import React, { useEffect } from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"

import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import { useNavigate } from 'react-router-dom'

const Homepage = () => {


    const Navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));

        if (user) {
            Navigate("/chats");
        }

    }, [Navigate])

    return (
        <Container maxW='xl' centerContent textAlign="center">

            <Box d="flex" justifyContent="center" p="3" bg="white" w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
                <Text fontSize="4xl" fontFamily="inter" text-center>
                    Live Chat
                </Text>
            </Box>
            <Box bg="white" w="100%" p="4" borderRadius="lg" borderWidth="1px">
                <Tabs variant='soft-rounded' >
                    <TabList mb="1em">
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Signup</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>

        </Container>
    )
}

export default Homepage