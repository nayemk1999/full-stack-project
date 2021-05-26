import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './style.css'
const TempForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const userData = {
            id: data.id,
            tempValue: data.tempValue,
            timeStamp: new Date()
        }    
        fetch('http://localhost:3001/api/v1/temp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(res => {
            if (res) {
                alert('Successfully Temp Added')
            }
        })
    };
    
    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="id"> Enter User ID</label> <br />
                <input placeholder='Enter User ID' {...register("id", { required: true })} /> <br />
                <label htmlFor="tempValue">Temp Value</label> <br />
                <input placeholder='Enter value' type='number' {...register("tempValue", { required: true })} /> <br />
                {errors.tempValue && <span>This field is required</span>} <br />
                <input type="submit" />
            </form>
        </div>
    );
};

export default TempForm;
