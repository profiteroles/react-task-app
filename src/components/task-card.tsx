import { Avatar, Box, Flex, Heading, HStack, useColorModeValue ,Text, Spacer, Stack, Button} from "@chakra-ui/react"
import React from "react"
import { Task } from "../models/task"
import {InfoIcon} from '@chakra-ui/icons';

interface TaskCardProps{
 task:Task 
 pinned:boolean
 onPinned: ()=>void
 onDone:(task:Task)=>void
}

export function TaskCard({
    task,
    pinned,
    onPinned,
    onDone,
    children
}:React.PropsWithChildren<TaskCardProps>) {


    function onSubmit() {
        onDone(task)
    }

    return(
        <Flex
        w='full'
        bg={useColorModeValue('white','gray.900')}
        boxShadow='md'
        rounded='md'
        p={6}
        pos='relative'
        mt={4}
        mr={4}
        m={10}
        minW='md'
        flex={1}
        flexDirection='column'
        >{pinned && (<InfoIcon
            pos='absolute'
            top='1'
            right='1'
            color='red'
            ></InfoIcon>)}
            <Box pos='absolute' top='-2'>
                <HStack>
                    <Avatar name={task.title} size='md'/>
                    <Heading fontSize={'3xl'} fontFamily={'body'} mr={'6'} mt={5}>
                        {task.title}
                    </Heading>
                </HStack>
            </Box>
            {children}
            <Spacer />
            <Stack mt={8} direction={'row'} spacing={4} justifySelf={'end'}>
                <Button flex={1} variant="secondary" rounded={'full'} onClick={onPinned}>
                    {pinned ? 'Unpin' : 'Pin'}
                </Button>
                <Button flex={1} rounded={'full'} onClick={onSubmit}>
                   {task.status ? 'Undo' : 'Completed'}
                </Button>
            </Stack>
        </Flex>
    )
}