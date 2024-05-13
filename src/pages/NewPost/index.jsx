import React from 'react'
import { useState } from 'react'
import { Text, Textarea } from '@chakra-ui/react'
import './style.css'
import { useMutation } from '@apollo/client'
import { ADD_POST } from '../../utils/mutations'
import Auth from '../../utils/auth'
import { useNavigate } from 'react-router-dom'

export default function NewPost() {
    let [value, setValue] = React.useState('')
    let navigate = useNavigate();

    let handleInputChange = (event) => {
        let inputValue = event.target.value
        setValue(inputValue)
    }

    const [addPost, {error}] = useMutation(ADD_POST)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = Auth.getProfile()
        try{
            const res = await addPost({
                variables: {userId: token.data._id, postText: value}
            })
        }catch(error){
            console.error(error)
        }
        navigate('/home');
    }

    return (
        <form className='new-post-form' onSubmit={handleSubmit}>
            <label className='new-post-label' htmlFor='post'>Blow a new bubble</label>
            <Textarea
                value={value}
                onChange={handleInputChange}
                placeholder={`What's poppin'?`}
                size='sm'
            />
            <button className="submit-post" type="submit">Blow Bubble</button>
        </form>
    )
}
