import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([])

    const Navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);

        if (!userInfo) {
            Navigate("/");
        }

    }, [Navigate])


    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }} >
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;