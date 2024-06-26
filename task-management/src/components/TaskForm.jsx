import React, { useEffect, useState } from 'react'
import './task.css'
import {
    DatePicker, Space
} from 'antd';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(true)
    const { id } = useParams();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("");
    const [duedate, setDueDate] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDueDate = duedate ? new Date(duedate) : null;
        try {
            if (id) {
                console.log('formattedDueDate:', formattedDueDate); 
                const task = { title, description,duedate:formattedDueDate }
                await axios.put(`http://localhost:5000/tasks/${id}`, task)
            }
            else {
                const task = { title, description,duedate:formattedDueDate }
                await axios.post(`http://localhost:5000/tasks`, task);
            }
            navigate('/')
        }
        catch (e) {
            console.log('Error in updating/Adding task', e);
        }
        setDescription("")
        setTitle("")
        setDueDate(null)
    }
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
 
        const fetchTask = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/tasks/${id}`);
            const data = response.data;
            console.log(data,'From Form');
            setTitle(data.title);
            setDescription(data.description);
            setDueDate(data.duedate)
        }
        catch (e) {
            console.log('Error in fetching task', e);
        }
    }
    useEffect(() => {
        fetchTask(id);
    }, [id])

    const cancelButton=()=>{
        navigate(`/tasks/${id}`)
    }
    return (
        <>
            <h1>{id ? 'Edit Task' : "Add Task"}</h1>
            <form onSubmit={handleSubmit} className='form' style={{ display: 'flex', width: 700, flexDirection: 'column', height: '10rem', justifyContent: 'space-between', padding: '5px', marginLeft: '40px', borderRadius: '7px', marginTop: 10 }}>
                <input type="text" id="name" name="name" value={title} placeholder='Name' onChange={(e) => { setTitle(e.target.value); console.log(e.target.value); }} style={{ display: 'flex', border: 'none', flexDirection: 'column', outline: 'none', height: '2rem', justifyContent: 'space-between', width: 690, fontSize: '15px' }} />
                <textarea placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value); console.log(e.target.value); }} style={{ border: 'none', outline: 'none' }} />
                <Space direction="vertical">
                    <DatePicker onChange={onChange} />
                </Space>

                <div className="buttons">
                    <button onClick={handleSubmit} className='addbutton'>{id ? "Update Task" : "Add Task"}</button>
                    <button onClick={cancelButton}  className='cancelbutton' >Cancel</button>
                </div>
            </form>
        </>
    );
};
export default TaskForm