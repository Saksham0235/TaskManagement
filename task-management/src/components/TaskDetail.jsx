import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Card } from 'antd';import './task.css'

const TaskDetail = () => {
    const [task, setTask] = useState(null)
    const { id } = useParams()
    console.log(id, "From taskDetail");
    console.log(task, "FRom taskdetail");
    const navigate = useNavigate()

    const fetchTask = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tasks/${id}`)
            const data = response.data;
            setTask(data);
        }
        catch (e) {
            console.log('Error in fetching task', e);
        }
    }
    const deleteTask = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/tasks/${id}`)
            navigate('/')
        }
        catch (e) {
            console.log('Error in Deleting task', e);
        }
    }
    useEffect(() => {
        fetchTask()
    }, [id])

    const backPage=()=>{
        navigate("/")
    }

    if (!task) return <div>Loading...</div>;
    return (
        <div>
            <center><h1>TASK DETAILS</h1></center>
            <button onClick={backPage} className='backbtn' style={{marginLeft:'20px',marginBottom:'10px'}}>Back To HomePage</button>
            <Card
                title="TASK"
                style={{
                    width: 400, border: '1px solid black',marginLeft:'20px'
                }}
            >
                <h2>Title : {task.title}</h2>
                <p>Description : {task.description}</p>
                <p>Due Date : {task.dueDate}</p>
                <div style={{display:'flex',width:'300px',justifyContent:'space-between',marginTop:'5px'}}>
                <Link to={`/edit/${task._id}`}><button className='cancelbutton'>Edit</button></Link>
                <button onClick={deleteTask} className='deletebtn'>Delete</button>
                </div>
            </Card>
            
        </div>
    )
}

export default TaskDetail
