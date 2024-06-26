import React from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskPage from './components/TaskPage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<TaskList/>} />
      <Route path="/tasks/:id" element={<TaskPage/>}  />
      <Route path="/edit/:id" element={<TaskForm/>} />
      <Route path='/add' element={<TaskForm/>} />
    </Routes>
    </>
  )
}

export default App
