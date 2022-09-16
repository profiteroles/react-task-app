import { Box, Flex } from '@chakra-ui/react'
import React, { useCallback,  useMemo,  useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Task } from '../models/task'
import { AppForm } from './form'
import { TaskCard } from './task-card'


export function TasksBody(){
    const location = useLocation()
    const watchedKey = `pinneed:${location.pathname}`
    const [wathed, setWatched] = useState<{ [key: string]: boolean }>(
        JSON.parse(localStorage.getItem(watchedKey) || '{}'),
    )
    
    const onWatch = useCallback((id:string) =>{ const newState  ={ ...wathed, [id]: !wathed[id]}
        localStorage.setItem(watchedKey, JSON.stringify(newState))
        setWatched(newState)
        },[wathed, watchedKey]
    )
    
      const [tasks, setTasks] = useState<Task[]>([])
    
      const onTaskSubmit = useCallback((title:string)=>{
          setTasks([...tasks,{id: crypto.randomUUID(),title:title,status:false}])
        }, [tasks]
      )

        const complete = useCallback((id: string )=>{
            const updatedTask = tasks.find((x) => x.id === id)
            if(updatedTask) updatedTask.status = true
        },[tasks])

        const uncomplete = useCallback((id: string )=>{
          const updatedTask = tasks.find((x) => x.id === id)
          if(updatedTask) updatedTask.status = false
      },[tasks])
     
       const onDone = useCallback((id: string, status: boolean) =>
        status
                ? uncomplete(id) 
                : complete(id),
        [complete, uncomplete],
    )

    const filteredCards = useMemo(()=>
         tasks.sort((a,b) => 
           (wathed[a.id] === wathed[b.id] ? a.title> b.title : wathed[b.id]) ? 1: -1)
    ,[tasks, wathed, ])

    const onDelete = useCallback((id:string)=>{
     const deletedTask = tasks.findIndex((x)=> x.id === id)
     console.log(deletedTask)
     tasks.splice(deletedTask,1)
    },[tasks] )
    
    return(<>
    
    <AppForm onTaskSubmit={onTaskSubmit}/>
        <Flex
            direction={'row'}
            wrap={'wrap'}
            gap={3}
            mt={6}
            overflow={'hidden'}
        >
            {filteredCards.map((x)=> 
          <Box w={600}>
            <TaskCard task={x} isWatched={wathed[x.id]} onWatch={onWatch} onDone={onDone} onDelete={onDelete}/>
          </Box>
        )}   
         
        </Flex>
        </>
    )
}