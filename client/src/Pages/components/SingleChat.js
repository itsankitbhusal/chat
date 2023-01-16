import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { IoArrowBack } from 'react-icons/io5';
import { getSender, getSenderFull } from '../../config/chatLogics';
import ProfileModal from './misc/ProfileModal';
import UpdateGroupChatModal from './misc/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();

    console.log("selectedChat", selectedChat)

    return (
        <>
            {selectedChat ?
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<IoArrowBack />}
                            onClick={() => setSelectedChat(null)}
                        />
                        {
                            !selectedChat.isGroupChat ? <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </> : selectedChat.chatName
                        }
                        {
                            // if selected chat is a group chat, show update group chat modal
                            selectedChat.isGroupChat && <UpdateGroupChatModal
                                fetchAgain={fetchAgain}
                                setFetchAgain={setFetchAgain}
                            />
                        }
                    </Text>
                    {/* simple input box */}
                    <Box
                        w="100%"
                        h="74vh"
                        bg="gray.200"
                        overflowY="hidden"
                        borderRadius="lg"
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="flex-end"
                        px={3}
                    >
                        {/* <ChatMessages /> */}
                    </Box>

                </>
                :
                <Box
                    display="grid"
                    placeItems="center"
                    fontSize="2rem"
                    w="100%" h="85vh"
                >
                    No Chat Selected
                </Box>
            }
        </>
    )
}

export default SingleChat