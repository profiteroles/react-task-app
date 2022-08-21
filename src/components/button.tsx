
import { Button } from '@chakra-ui/react'
import React from 'react'

interface BtnProps{
    title:string
    isLoading:boolean
}

export const Btn = ({isLoading,title}:BtnProps) => {
    return (
        <Button colorScheme='teal' size='md' type={'submit'} isLoading={isLoading}>
            {title}
        </Button>
    )
}

 