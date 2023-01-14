import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useToast } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner'
import axios from 'axios';
import { useDisclosure } from "@chakra-ui/hooks"
import { BiSearchAlt } from 'react-icons/bi'
import { FaBell, FaChevronDown } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"
import React, { useState } from 'react'
import { ChatState } from '../../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const Navigate = useNavigate();

    const { user, setSelectedChat, chats, setChats } = ChatState();

    const { isOpen, onClose, onOpen } = useDisclosure();

    const toast = useToast();

    // logout
    const logoutHandler = () => {
        const logout = window.confirm("Are you sure you want to logout?");
        if (!logout) return;
        localStorage.removeItem("userInfo");
        Navigate("/");
    }
    const handelSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter a name or email",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer: ${user.token}`
                }
            }
            const { data } = await axios.get(`api/user?search=${search}`, config);
            if (data) {
                setLoading(false);
                setSearchResult(data);
            }

        } catch (error) {
            console.log(error)
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right",

            });
        }
    }

    const accessChat = async (id) => {
        // console.log("access chat: ", id)
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer: ${user.token}`
                }
            }
            // create chat with id
            const { data } = await axios.post(`/api/chat/`, { userId: id }, config);
            console.log("create chat: ", data)
            if (data) {

                if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

                setSelectedChat(data);
                setLoadingChat(false);
                onClose();
                // Navigate(`/chat/${data._id}`);
            }
        } catch (error) {
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right",

            });
        }
    }



    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip label="Search user to chat" hasArrow placement="bottom-end" >

                    <Button variant="ghost" onClick={onOpen}>
                        <BiSearchAlt />
                        <Text d={{ base: "none", md: "flex" }} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                {/* website title */}
                <Text fontSize="2xl" fontFamily="inter" text-center>
                    Live Chat
                </Text>
                <div>
                    <Menu >
                        <MenuButton p={1}>
                            <FaBell />
                        </MenuButton>

                        {/* <MenuList></MenuList> */}
                    </Menu>

                    <Menu>
                        <MenuButton as={Button} bg="transparent" rightIcon={<FaChevronDown />}>
                            <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.pic} />
                        </MenuButton>

                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem gap=".5rem">
                                    <CgProfile />
                                    My Profile
                                </MenuItem>
                            </ProfileModal>

                            <MenuDivider />
                            <MenuItem gap=".5rem" onClick={logoutHandler}>
                                <FiLogOut />
                                Logout
                            </MenuItem>
                        </MenuList>


                    </Menu>
                </div>
            </Box>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        <Text fontSize="2xl" fontFamily="inter" text-center>
                            Live Chat
                        </Text>
                    </DrawerHeader>
                    <DrawerBody>
                        <Box display="flex" pb="2">
                            <Input
                                placeholder='Search by name or email'
                                mr="2"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button
                                colorScheme="blue"
                                onClick={handelSearch}
                            >
                                Go
                            </Button>
                        </Box>
                        <Box>
                            {loading ? (
                                <ChatLoading />
                            ) : (
                                searchResult?.map((user) => {
                                    // <UserListItem />
                                    return (
                                        <UserListItem key={user._id} user={user} handleFunction={() => {
                                            // console.log("user id: ", user._id)
                                            accessChat(user._id)
                                        }} />
                                    )
                                })
                            )}
                            {loadingChat && <Spinner ml="auto" display="flex" />}
                        </Box>
                    </DrawerBody>
                </DrawerContent>

            </Drawer>
        </>
    )
}

export default SideDrawer;