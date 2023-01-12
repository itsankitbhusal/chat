import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import { BiSearchAlt } from 'react-icons/bi'
import { FaBell, FaChevronDown } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"
import React, { useState } from 'react'
import { ChatState } from '../../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';


const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ladingChat, setLoadingChat] = useState();

    const Navigate = useNavigate();

    const { user } = ChatState();

    // logout
    const logoutHandler = () => {
        const logout = window.confirm("Are you sure you want to logout?");
        if (!logout) return;
        localStorage.removeItem("userInfo");
        Navigate("/");
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

                    <Button variant="ghost">
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
        </>
    )
}

export default SideDrawer