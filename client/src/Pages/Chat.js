import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ChatState } from '../context/ChatProvider'
import { Box, HStack, VStack } from '@chakra-ui/react';
import SideDrawer from './components/misc/SideDrawer';
import MyChats from './components/misc/MyChats';
import { ChatBox } from './components/misc/ChatBox';

const Chat = () => {

    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <>
            <div style={{ width: "100%" }}>
                {user && <SideDrawer />}
                <HStack
                    d="flex"
                    justifyContent="space-between"
                    w="100%"
                    minH="90vh"
                    p='10px'
                >
                    {user && <MyChats fetchAgain={fetchAgain} />}
                    {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                </HStack>
            </div>

        </>
    )
}

export default Chat