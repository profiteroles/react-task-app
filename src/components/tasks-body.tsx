import { Box, Flex } from '@chakra-ui/react'
import React, { useCallback, useMemo, useState } from 'react'
import {  useLocation } from 'react-router-dom'
import { Task } from '../models/task'
import { AppForm } from './form'
import { TaskCard } from './task-card'


export function TasksBody(){
    const location = useLocation()
    const pinnedKey = `pinneed:${location.pathname}`
    const [pinned, setPinned] = useState<{ [key: string]: boolean }>(
        JSON.parse(localStorage.getItem(pinnedKey) || '{}'),
    )

    const onPinned = useCallback((id:string) =>{ const newState  ={ ...pinned, [id]: !pinned[id]}
        localStorage.setItem(pinnedKey, JSON.stringify(newState))
        setPinned(newState)
        },[pinned, pinnedKey]
    )
    
      const [tasks, setTasks] = useState<Task[]>([])
    
      const onTaskSubmit = useCallback((title:string)=>{
          setTasks([...tasks,{id: crypto.randomUUID(),title:title,status:false}])
        }, [tasks]
      )
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const complete = (id:string)=>{
      const updatedTask =tasks.find((x) => x.id ===id)
        if(updatedTask != null){
          updatedTask.status = true
        }
        console.log(updatedTask)
    
      } 
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const uncomplete = (id:string)=>{
        const updatedTask =tasks.find((x) => x.id ===id)
          if(updatedTask != null){
            updatedTask.status = false
          }
          console.log(updatedTask)
        }
     
       const onDone = useCallback((id: string, status: boolean) =>
        status
                ? uncomplete(id) 
                : complete(id),
        [complete, uncomplete],
    )

    const filteredCards = useMemo(()=>{
        return tasks.sort((a,b) => pinned[a.id]=== pinned[b.id] ? a.title > b.title : pinned[b.id]) ? 1:-1
    } )
    
    return(<>
    
    <AppForm onTaskSubmit={onTaskSubmit}/>
        <Flex
            direction={'row'}
            wrap={'wrap'}
            gap={3}
            mt={6}
            overflow={'hidden'}
        >
            
            {tasks.map((x)=> 
          <Box w={600}>
            <TaskCard task={x} pinned={true} onPinned={onPinned} onDone={onDone}/>
          </Box>
        )}   
        </Flex>
        </>
    )
}