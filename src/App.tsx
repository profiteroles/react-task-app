import './App.css';
import {  ChakraProvider, } from '@chakra-ui/react'
import WithSubnavigation from './components/nav-bar';
import { TasksBody } from './components/tasks-body';
import { BrowserRouter, Router } from 'react-router-dom';
import React from 'react';

export default function App() {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider>
          <WithSubnavigation/>
          <TasksBody/>
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

