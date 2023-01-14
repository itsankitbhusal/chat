import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../../context/ChatProvider'
import ChatLoading from '../ChatLoading';
import { getSender } from '../../../config/chatLogics';

const MyChats = () => {
    const [loggedUser, setLoggedUser] = useState(null);
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    console.log(chats)

    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                // header for authorization
                headers: {
                    Authorization: `Bearer: ${user.token}`
                }
            }

            const { data } = await axios.get("/api/chat", config);
            console.log("data: ", data)
            if (data) {
                setChats(data);
            }

        } catch (error) {
            console.log(error)
            toast({
                title: "Error fetching chats",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right",
            });
        }
    }
    useEffect(() => {

        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();

    }, []);

    return (
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            // alignItems="center"
            justifyContent="space-between"
            gap="1rem"
            p="3"
            minH="85vh"
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box px={3}
                pb={3}
                fontSize={{ base: "sm", md: "md" }}
                display="flex"
                gap="1rem"
                justifyContent="space-between"
                alignItems="center"
            >
                My Chats
                <Button
                    fontSize={{ base: "sm", md: "md" }}
                    rightIcon={<IoMdAdd />}
                >Group Chat</Button>
            </Box>
            <Box
                display="flex"
                flexDir="column"
                p={3}
                w="100%"
                h="100%"
                borderRadius="lg"
                // overflowY="hidden"
                bg="#f8f8f8"
            >
                {
                    chats ? (
                        <Stack
                            spacing={3}
                            overflowY="scroll"
                        >
                            {chats.map((chat) => (
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    key={chat._id}
                                    cursor="pointer"
                                    bg={selectedChat === chat ? "#38B2AC" : "#e8e8e8"}
                                    color={selectedChat === chat ? "white" : "black"}
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                >
                                    <Text>
                                        {!chat.isGroupChat ? (
                                            getSender(loggedUser, chat.users)
                                        ) :
                                            chat.chatName
                                        }
                                    </Text>
                                </Box>
                            ))}
                        </Stack>
                    ) : <ChatLoading />
                }
            </Box>

        </Box >
    )
}

export default MyChats