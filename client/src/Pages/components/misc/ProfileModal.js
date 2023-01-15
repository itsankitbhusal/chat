import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { GrView } from "react-icons/gr"
import React from 'react'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {children ?
                <span onClick={onOpen}>{children}</span>

                : <IconButton
                    display={{ base: "flex" }}
                    icon={<GrView />}
                    onClick={onOpen}
                />
            }
            <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent h="70vh">
                    <ModalHeader
                        fontSize="40px"
                        display="flex"
                        justifyContent="center"
                    >{user?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="center"
                        gap="2rem"

                    >
                        <Image
                            borderRadius="full"
                            boxSize="150px"
                            src={user?.pic}
                            alt={user?.name}
                        />

                        <Text
                            fontSize={{ base: "20px", md: "30px" }}
                        >
                            Email: {user?.email}
                        </Text>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileModal