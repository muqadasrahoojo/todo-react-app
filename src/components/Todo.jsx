import { Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const Todo = () => {

    const [inputValue, setInputValue] = useState('');
    const [todoList, setTodoList] = useState([]);


    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('list'));
        if (savedTodos) {
            setTodoList(savedTodos);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(todoList));

    }, [todoList])

    console.log(inputValue);

    const addTodo = () => {
        if (!inputValue.trim()) {
            alert('Task cannot be empty');
            return;
        }

        if (todoList.includes(inputValue)) {
            alert('Task is a duplicate');
            return;
        }

        setTodoList((prev) => [...prev, inputValue]);
        setInputValue('');
    };


    const removeTodo = (index) => {
        const newList = todoList.filter((_, i) => i !== index);
        setTodoList(newList);
    };

    return (
        <>
            <div style={{ height: "50vh",  }} className='d-flex justify-content-center align-items-center' >
                <Box sx={{ backgroundColor: "#d4e6f1", boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: " 50px"}}>
                    <Typography className='text-center' variant="h3">Todo App</Typography>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className='mt-3 rounded-3 me-2'
                        type='text'
                        placeholder='Enter Todo Here'
                        style={{ padding: " 8px 10px" }}
                    />
                    <button className='border border-0 rounded-3' onClick={addTodo} style={{ backgroundColor: "#5499c7", padding: " 8px 10px" }}>Add+</button>
                </Box>
            </div>



            <Box sx={{ display: 'flex', justifyContent: 'center' }} className="text-center">
                <ul className='list-unstyled w-100 d-flex flex-column align-items-center'>
                    {
                        todoList?.map((item, index) => {
                            return <li style={{ width: "14%" }} className='text-center' key={index}>{item}
                                <IconButton aria-label="delete" onClick={() => removeTodo(index)}>
                                    <DeleteIcon style={{ color: '#ec7063' }} />
                                </IconButton>
                            </li>

                        })

                    }


                </ul>

            </Box>
        </>
    );
};



export default Todo;
