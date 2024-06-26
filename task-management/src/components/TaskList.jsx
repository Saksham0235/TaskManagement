import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './task.css'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const TaskList = () => {
    const [tasks, setTask] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/tasks')
            const data = await response.json();
            setTask(data);
            setLoading(false);
        }
        catch (e) {
            console.log("Error in fetching tasks", e);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])
    return (
        <>
            {
                loading ? (<center> <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 40, marginTop: '30px' }} spin />} /></center>) : (
                    <div className='home'>
                        <center><h1>Task  List</h1></center>
                        <ul className='taskdiv'>
                            {
                                tasks.map((task) => {
                                    return (
                                        <Link to={`/tasks/${task._id}`} style={{ textDecoration: 'none' }}>
                                            <li className='task' style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                                                {task.title}
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        <Link to="/add"><button className='addbutton'>Add New Task</button></Link>
                        </ul>
                    </div>)
            }
        </>
    )
}

export default TaskList
