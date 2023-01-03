import React, { useEffect, useState } from 'react'
import { BASE_URL } from "../constants/constant"
import axios from "axios"

const Chat = () => {

    // states
    const [chats, setChats] = useState([]);

    // fetch chat
    const fetchChats = async () => {
        const { data } = await axios.get(`${BASE_URL}/api/chat`);
        // setting value
        setChats(data);
    }

    // use effect to fetch chat
    useEffect(() => {
        fetchChats();
    }, [])
    return (
        <>
            {
                chats && chats.map((chat) => {
                    return (
                        <div key={chat._id}>{chat.chatName}</div>
                    )
                })
            }
        </>
    )
}

export default Chat