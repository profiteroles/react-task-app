import { Avatar, Box, Flex, Heading, HStack, useColorModeValue , Spacer, Stack, Button} from "@chakra-ui/react"
import React, { useCallback,useState } from "react"
import { Task } from "../models/task"
import {CheckIcon,  DeleteIcon,  EditIcon,  StarIcon,  ViewIcon, ViewOffIcon, } from '@chakra-ui/icons';

interface TaskCardProps{
 task:Task 
 isWatched:boolean
 onWatch: (id:string)=>void
 onDone:(id: string, status: boolean) => void
onDelete:(id:string)=> void
}

export function TaskCard({
    task,
    isWatched,
    onDone,
    onWatch,
    onDelete,
    children
}:React.PropsWithChildren<TaskCardProps>) {

    const [loading, setLoading] = useState(false)

    const onSubmit = useCallback(()=> {
        setLoading(true)
        onDone(task.id, task.status)
        setLoading(false)
    },[onDone, task.id, task.status])

    const watchTask = useCallback(()=> onWatch(task.id), [onWatch, task.id])

    const delelteTask=  useCallback(
      () => {
       setLoading(true)
       onDelete(task.id)
       setLoading(false) 
      },
      [onDelete, task],
    )
    

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
        >
            <DeleteIcon
            pos='absolute'
            top='1'
            right='1'
            color='red'
            onClick={delelteTask}
            ></DeleteIcon>
            <Box pos='absolute' top='-2'>
                <HStack>
                    <Avatar name={task.title} size='md'/>
                    {isWatched && (
                    <StarIcon
                        pos={'absolute'}
                        bottom={'-1'}
                        left={'-1'}
                        color={'silver'}
                    ></StarIcon>
                )}
                    <Heading fontSize={'3xl'} fontFamily={'body'} mr={'6'} mt={5}>
                        {task.title}
                    </Heading>
                </HStack>
            </Box>
            {children}
            <Spacer />
            <Stack mt={8} direction={'row'} spacing={4} justifySelf={'end'}>
                <Button flex={1} rounded={'xl'} variant="secondary" onClick={watchTask} >
                {isWatched ? <ViewOffIcon/> : <ViewIcon/>}
                </Button>
                <Button flex={1} rounded={'xl'} onClick={onSubmit} isLoading={loading}
                leftIcon={task.status ? <EditIcon /> : <CheckIcon />}>
                   {task.status ? 'Undo' : 'Complete'}
                </Button>
            </Stack>
        </Flex>
    )
}