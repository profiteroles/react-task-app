import './App.css';
import {  ChakraProvider, } from '@chakra-ui/react'
import WithSubnavigation from './components/nav-bar';
import { TasksBody } from './components/tasks-body';

export default function App() {

    


  return (
    <ChakraProvider>
      <WithSubnavigation/>
      <TasksBody/>
    </ChakraProvider>
  );
}

