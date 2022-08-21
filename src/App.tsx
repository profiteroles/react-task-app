import React, {useCallback, useState} from 'react'
import './App.css';
import { Box, ChakraProvider, HStack } from '@chakra-ui/react'
import { AppForm } from './components/form';
import { TaskCard } from './components/task-card';
import { Task } from './models/task';
import WithSubnavigation from './components/nav-bar';

export default function App() {

    const onPinned = ()=>{
    alert('Pinned to the top')
  }

  const [tasks, setTasks] = useState<Task[]>([])


  const onTaskSubmit = useCallback((title:string)=>{
      setTasks([...tasks,{id: crypto.randomUUID(),title:title,status:false}])
    }, [tasks]
  )

  function onDone(task:Task){
    const index = tasks.findIndex((x)=> x === task);
    tasks[index].status = !tasks[index].status
  }


  return (
    <ChakraProvider>
      <WithSubnavigation/>
      <AppForm onTaskSubmit={onTaskSubmit}/>
      <HStack spacing={8}>
        {tasks.map((x)=> 
          <Box w={600}>
            <TaskCard task={x} pinned={true} onPinned={onPinned} onDone={onDone(x)}/>
          </Box>
        )}            
      </HStack>
    </ChakraProvider>
  );
}

