import React from 'react'
import { useParams } from 'react-router-dom'
import TaskForm from './TaskForm';
import TaskDetail from './TaskDetail';

const TaskPage = () => {
    const {id}=useParams();
    
    console.log(id,"From taskpage");
  return (
    <div>
      {id ?<TaskDetail/>:<TaskForm/>}


    </div>
  )
}

export default TaskPage
