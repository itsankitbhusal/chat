import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';
import { GrView } from "react-icons/gr"
import { ChatState } from '../../../context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState();
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();

    const { selectedChat, setSelectedChat, user } = ChatState();

    const handelRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast({
                title: "Only admin can remove someone",
                status: "error",
                duration: "2000",
                isClosable: true,
                position: "bottom"
            })
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.put("/api/chat/groupremove", {
                chatId: selectedChat._id,
                userId: user._id
            }, config);

            if (data) {

                user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
                setFetchAgain(!fetchAgain)
            }
            setLoading(false);

        } catch (error) {

            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                isClosable: true,
                duration: "2000",
                position: 'bottom'
            });
            setLoading(false);

        }
    }

    const handelRename = async () => {
        if (!groupChatName) return;

        try {
            setRenameLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.put("/api/chat/rename", {
                chatId: selectedChat._id,
                chatName: groupChatName
            }, config);

            if (data) {
                toast({
                    title: "Chat Renamed",
                    description: "Chat has been renamed",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                setSelectedChat(data);
                setFetchAgain(!fetchAgain);
                setRenameLoading(false);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            setRenameLoading(false);
        }
        setGroupChatName("");
    }

    const handelAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User Already in group!",
                status: "error",
                duration: "2000",
                isClosable: true,
                position: "bottom"
            })
            return;
        }
        // check if selected user is admin
        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only admin can add someone!",
                status: "error",
                duration: "2000",
                isClosable: true,
                position: 'bottom'
            })
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put("/api/chat/groupadd", {
                chatId: selectedChat._id,
                userId: user1._id
            }, config);

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {

            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                isClosable: true,
                duration: "2000",
                position: 'bottom'
            });
            setLoading(false);
        }
        setGroupChatName("")
    }

    const handelSearch = async (query) => {
        setSearch(query);
        if (!query) return;
        try {
            setLoading(true);
            const config = {
                // header for authorization
                headers: {
                    Authorization: `Bearer: ${user.token}`
                }
            }

            const { data } = await axios.get(`/api/user?search=${query}`, config);

            console.log(data)
            if (data) {
                setSearchResult(data);
                setLoading(false);
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
    return (
        <>
            <IconButton display={{ base: "flex" }} onClick={onOpen} icon={<GrView />} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        display="flex"
                        justifyContent="center"
                    >{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display="flex">
                            {selectedChat.users.map(user => {
                                return (
                                    <UserBadgeItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handelRemove(user._id)}
                                    >

                                    </UserBadgeItem>
                                )
                            })}
                        </Box>
                        <FormControl display="flex">
                            <Input
                                placeholder='Chat Name'
                                mb={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                ml="1"
                                isLoading={renameLoading}
                                onClick={handelRename}
                            >
                                Rename
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder='Add User to Group Chat'
                                mb={1}
                                onChange={(e) => handelSearch(e.target.value)}
                            />
                        </FormControl>
                        {
                            loading ? <Spinner size="lg" /> : (
                                searchResult?.slice(1, 5)?.map(user => {
                                    return (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            handelFunction={() => handelAddUser(user)}
                                        />
                                    )
                                })
                            )
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' onClick={() => handelRemove(user)}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal