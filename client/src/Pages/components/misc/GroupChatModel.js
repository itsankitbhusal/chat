import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../../context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import UserListItem from '../UserAvatar/UserListItem';

const GroupChatModel = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { user, chats, setChats } = ChatState();

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

    const handelSubmit = async () => {
        if (!groupChatName || !selectedUser) {
            toast({
                title: "Please enter chat name and select users",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }
        try {
            const config = {
                // header for authorization
                headers: {
                    Authorization: `Bearer: ${user.token}`
                }
            }
            const { data } = await axios.post("/api/chat/group", {
                name: groupChatName,
                users: JSON.stringify(selectedUser.map(u => u._id)),
            }, config);

            if (data) {
                toast({
                    title: "Group chat created",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right",
                });
                setChats([data, ...chats]);
                onClose();
            }
        } catch (error) {
            toast({
                title: "Error creating group chat",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right",
            });
            console.log(error)
        }
    }
    const handleGroup = (userToAdd) => {
        if (selectedUser.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }
        setSelectedUser([...selectedUser, userToAdd]);
    }

    const handelDelete = (userToDelete) => {
        setSelectedUser(selectedUser.filter((sel) => sel._id !== userToDelete._id));
    }

    return (
        <>

            <span onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        display="flex"
                        justifyContent="center">
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input placeholder='Chat Name' mb="3"
                                onChange={(e) => { setGroupChatName(e.target.value) }}
                            />
                        </FormControl>
                        <FormControl>
                            <Input placeholder='Add users eg: ankit, john' mb="1"
                                onChange={(e) => { handelSearch(e.target.value) }}
                            />
                        </FormControl>

                        {/* selected users */}
                        <Box display="flex" w="100%" justifyContent="flex-start" >

                            {selectedUser?.map(u => (
                                <UserBadgeItem key={u._id} user={u} handleFunction={() => handelDelete(u)} />
                            ))}
                        </Box>

                        {/* render search users */}
                        {
                            loading ? <p>Loading...</p> :
                                searchResult?.slice(0, 5).map((user) => (<UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />)
                                )
                        }

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={handelSubmit}>
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModel