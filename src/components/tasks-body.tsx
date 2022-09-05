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
        return tasks.sort((a,b) => {
          return ( wathed[a.id] === wathed[b.id] ? a.title> b.title : wathed[b.id]) ? 1: -1
        }) 
    },[tasks, wathed] )
    
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
            <TaskCard task={x} isWatched={true} onWatch={onWatch} onDone={onDone}/>
          </Box>
        )}   
        </Flex>
        </>
    )
}