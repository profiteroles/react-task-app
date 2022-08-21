import { Button, Center, FormControl, FormLabel, HStack, Stack } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { Task } from '../models/task'
import { Btn } from './button'
import InputField from './input-field'
import { useForm } from 'react-hook-form'

interface AppFormProps{
    onTaskSubmit: (title:string) => void
}


export function AppForm({onTaskSubmit}:AppFormProps) {

    const { 
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful }
        } = useForm<Task>();

        const onSubmit = useMemo(()=> handleSubmit((value)=> onTaskSubmit(value.title)), [handleSubmit ])

        useEffect(() => {
            reset()
        }, [isSubmitSuccessful, reset])
  
    return (
    <Center>
        <Stack as='form' onSubmit={onSubmit} spacing={4}>
        <FormLabel>Task Title</FormLabel>
            <HStack>
                <InputField name='title' errors={errors} register={register}/>
                <Button variant="secondary" onClick={() => reset()}>
                        Reset
                    </Button>
                <Btn title='Save' isLoading={isSubmitting}/>
            </HStack>
        </Stack>
    </Center>
    )
}