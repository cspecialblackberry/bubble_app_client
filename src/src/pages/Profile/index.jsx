import { Card, CardHeader, CardBody, CardFooter, Text, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import UserAvatar from '../../components/ProfileImage';
import EditForm from '../../components/EditForm';
import YourPost from '../../components/YourPost';
import FriendPost from '../../components/FriendPost';
import { useState } from 'react';
import { useEffect } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

const Profile = () => {
    if (Auth.loggedIn() === false) {
        console.log('hit')
        window.location.replace('/')
    }
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [hasEditButton, setHasEditButton] = useState(false);

    const location = useLocation();
    const { from } = location.state;
    console.log(from)
    const userId = from;

    const yourId = Auth.getProfile().data._id;
    console.log(userId, 'userId');
    console.log(yourId, 'yourId');

    useEffect(() => {
        if (userId === yourId) {
            setHasEditButton(true);
        }
    }, []);


    const userInfo = useQuery(QUERY_USER, { variables: { _id: from } })
    let posts = []

    if (userInfo.data) {
        console.log(userInfo.data)
        posts = userInfo.data.user.posts.toReversed()
        console.log(posts, 'posts')
    }

    const handleEditButtonClick = () => {
        if (editIsOpen) {
            setEditIsOpen(false);
        } else {
            setEditIsOpen(true);
        }
    }

    return (
        <>
            {userInfo.loading ?
                <h2>...loading</h2>
                :
                <>
                    <h1>{userInfo.data.user.name || userInfo.data.user.username}</h1>
                    <UserAvatar url={userInfo.data.user.avatar} name={userInfo.data.user.name}></UserAvatar>
                    <Text bgColor={userInfo.data.user.color}>{userInfo.data.user.bio || "New to bubble!"}</Text>
                    {hasEditButton? editIsOpen ? <EditForm editIsOpen={editIsOpen} setEditIsOpen={setEditIsOpen} userInfo={userInfo.data.user}></EditForm> 
                    : <IconButton aria-label='Edit Profile' icon={<EditIcon />} onClick={handleEditButtonClick} ></IconButton> : <></>}
                    <h2>Recent Bubbles:</h2>
                    {hasEditButton ? posts.map((post) => {
                        return (
                            <YourPost key={post._id} name={userInfo.data.user.name || userInfo.data.user.username} url={userInfo.data.user.avatar} text={post.postText} color={userInfo.data.user.color} userId={from}></YourPost>
                        )
                    }) : 
                    posts.map((post) => {
                        return (
                            <FriendPost key={post._id} name={userInfo.data.user.name || userInfo.data.user.username} url={userInfo.data.user.avatar} text={post.postText} color={userInfo.data.user.color} userId={from}></FriendPost>
                        )
                    })}
                </>}
        </>

    )
}

export default Profile;
