import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react'

const UserListItem = ({ user, handleFunction }) => {

    // console.log("user data from userListItem", user)
    // console.log("handleFunction from userListItem", handleFunction)
    return (
        <Box
            onClick={
                () => {
                    console.log("clicked on id: ", user._id)
                    handleFunction(user);
                }
            }
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white"
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            px="3"
            py="2"
            mb="2"
            borderRadius="lg"
        >
            <Avatar
                mr="2"
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}

            />
            <Box>
                <Text>
                    {user.name}
                </Text>
                <Text fontSize="xs">
                    <b>Email: </b>
                    {user.email}
                </Text>
            </Box>

        </Box >
    )
}

export default UserListItem;