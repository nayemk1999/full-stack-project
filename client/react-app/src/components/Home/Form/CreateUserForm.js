import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './style.css'
const CreateUserForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const userData = {
            name: data.name,
            timeStamp: new Date()
        }     
        fetch('http://localhost:3001/api/v1/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => {
            if (res) {
                alert('Successfully Added User')
            }
        })
    };
    
    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name"> Enter User Name</label> <br />
                <input placeholder='Enter User Name' {...register("name", { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>} <br />
                <input type="submit" />
            </form>
        </div>
    );
};

export default CreateUserForm;