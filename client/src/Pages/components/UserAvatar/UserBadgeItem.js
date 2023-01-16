import { Box } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <Box
            bg="green.600"
            rounded="full"
            textStyle="bold"
            textColor="white"
            display="flex"
            alignItems="center"
            gap="1"
            px={3}
            py={1}
            m={1}
            mb={2}
            variant="solid"
            fontSize={12}
            cursor="pointer"
            onClick={handleFunction}
        >
            {user.name}
            <AiOutlineClose />
        </Box>
    )
}

export default UserBadgeItem