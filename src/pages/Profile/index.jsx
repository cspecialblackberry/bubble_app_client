import { Card, CardHeader, CardBody, CardFooter, Text, IconButton, Box } from '@chakra-ui/react';
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
import Reply from '../../components/Reply';

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


    const userInfo = useQuery(QUERY_USER, { variables: { _id: from }, fetchPolicy: 'network-only' })
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
                    <Box padding={5} bgColor={userInfo.data.user.color} marginBottom={5} borderRadius='50%' minWidth={300}>
                        <h1>{userInfo.data.user.name || userInfo.data.user.username}</h1>
                        <UserAvatar url={userInfo.data.user.avatar} name={userInfo.data.user.name}></UserAvatar>
                        <Text color='black' bgColor='white' border='2px' borderColor={userInfo.data.user.color}>{userInfo.data.user.bio || "New to bubble!"}</Text>
                    </Box >
                    {hasEditButton ? editIsOpen ? <EditForm editIsOpen={editIsOpen} setEditIsOpen={setEditIsOpen} userInfo={userInfo.data.user}></EditForm>
                        : <IconButton aria-label='Edit Profile' icon={<EditIcon  className='button-size'/>} onClick={handleEditButtonClick} alignSelf='end'></IconButton> : <></>}
                    <h2>Recent Bubbles:</h2>
                    {hasEditButton ? posts.map((post) => {
                        return (
                            <article key={post._id} className="post-block">
                                <Reply
                                    key={post._id}
                                    type='main'
                                    name={userInfo.data.user.name || userInfo.data.user.username}
                                    url={userInfo.data.user.avatar}
                                    text={post.postText}
                                    color={userInfo.data.user.color}
                                    userId={from}
                                >
                                </Reply>
                                {/* {post.replies.map(reply => (
                                    <Reply
                                        key={reply._id}
                                        type='reply'
                                        name={reply.username}
                                        text={reply.responseText}
                                        userId={reply.user}
                                    >
                                    </Reply>
                                ))
                                } */}
                            </article>
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
