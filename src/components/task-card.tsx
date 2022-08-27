import { Avatar, Box, Flex, Heading, HStack, useColorModeValue , Spacer, Stack, Button} from "@chakra-ui/react"
import React, { useCallback,useState } from "react"
import { Task } from "../models/task"
import {CheckIcon, CloseIcon, EditIcon, InfoIcon, } from '@chakra-ui/icons';
import { render } from "react-dom";

interface TaskCardProps{
 task:Task 
 pinned:boolean
 onPinned: ()=>void
 onDone:(id: string, status: boolean) => void

}

export function TaskCard({
    task,
    pinned,
    onPinned,
    onDone,
    children
}:React.PropsWithChildren<TaskCardProps>) {

    const [loading, setLoading] = useState(false)

    const onSubmit = useCallback(()=> {
        setLoading(true)
        onDone(task.id, task.status)
        setLoading(false)
    },[onDone, task.id, task.status])

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
                <Button flex={1} rounded={'full'} onClick={onSubmit} isLoading={loading}
                leftIcon={task.status ? <EditIcon /> : <CheckIcon />}>
                   {task.status ? 'Undo' : 'Completed'}
                </Button>
            </Stack>
        </Flex>
    )
}