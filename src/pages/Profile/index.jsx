import { Card, CardHeader, CardBody, CardFooter, Text, IconButton, Box } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import UserAvatar from '../../components/ProfileImage';
import EditForm from '../../components/EditForm';
import { useState, useEffect } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';
import { QUERY_USER, QUERY_POSTS } from '../../utils/queries';
import { DELETE_POST, DELETE_REPLY } from '../../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import Reply from '../../components/Reply';
import { ADD_FRIEND } from '../../utils/mutations';

const Profile = () => {
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [hasEditButton, setHasEditButton] = useState(false);
    const [postsArr, setPostsArr] = useState([])
    const [repliesArr, setRepliesArr] = useState([])
    const [isFriend, setIsFriend] = useState(true);

    const location = useLocation();
    const { from } = location.state;

    const yourId = Auth.getProfile().data._id;


    const yourInfo = useQuery(QUERY_USER, { variables: { _id: yourId }, fetchPolicy: 'network-only' })
    const { loading: loading, data: postsData } = useQuery(QUERY_POSTS)
    const { loading: userLoading, data: userInfo} = useQuery(QUERY_USER, { variables: { _id: from }, fetchPolicy: 'network-only' })

    useEffect(() => {
        console.log('effect1')
        if (from === yourId) {
            setHasEditButton(true);
        }
    }, [userInfo]);

    useEffect(() => {
        console.log('use effect:')
        console.log(postsData, userInfo)
        console.log(isFriend, hasEditButton)
        console.log(postsArr, repliesArr)

        if (postsData && userInfo) {
            console.log(postsData.posts)
            let posts = postsData.posts
            const filteredPosts = posts.filter((post) => post.user === userInfo.user._id).toReversed()
            setPostsArr(filteredPosts)
            let replies = []
            filteredPosts.map((post) => post.replies.map((reply) => {
                replies.push({ ...reply, postId: post._id })
            }))
            console.log(replies)
            setRepliesArr(replies)
        }
    }, [postsData, userInfo])

    useEffect(() => {
        console.log('effect2')
        console.log(isFriend, '1')
        if (yourInfo.data) {
            if (yourId !== from || !yourInfo.data.user.friends.includes(from)) {
                setIsFriend(false)
                
            }
        }
        console.log(isFriend, '2')
    }, [userInfo])

// changing a state value rerenders the component
// the component is rendering multiple times bc you are changing so many state variables
// change them at the right time and it will work correctly
// the replies array is correct on the first render and wrong on the second one

   

    const [deletePost] = useMutation(DELETE_POST)

    const handleDelete = async (userId, postId, index) => {
        try {
            await deletePost({
                variables: { userId: userId, postId: postId }
            })
            let updatedPosts = [...postsArr]
            updatedPosts.splice(index, 1)
            setPostsArr(updatedPosts)
        } catch (err) {
            console.error(err)
        }
    }

    const [deleteReply] = useMutation(DELETE_REPLY)

    const handleDeleteReply = async (postId, replyId) => {
        console.log(postId, replyId)
        try {
            await deleteReply({
                variables: { postId: postId, replyId: replyId }
            })
            const index = repliesArr.indexOf(repliesArr.find((reply) => reply._id === replyId))
            console.log(index)
            let updatedReplies = [...repliesArr]
            updatedReplies.splice(index, 1)
            setRepliesArr(updatedReplies)
        } catch (err) {
            console.error(err)
        }
    }

    const handleEditButtonClick = () => {
        if (editIsOpen) {
            setEditIsOpen(false);
        } else {
            setEditIsOpen(true);
        }
    }

    const [addFriend] = useMutation(ADD_FRIEND);


    const handleAdd = async (user, your) => {
        setIsFriend(true);
        try {
            await addFriend({
                variables: { userId: your, friendId: user }
            })
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <>
            {userLoading ?
                <h2>...loading</h2>
                :
                <>
                    <Box padding={5} bgColor={userInfo.user.color} marginBottom={5} borderRadius='50%' minWidth={300}>
                        <h1>{userInfo.user.name || userInfo.user.username}</h1>
                        <UserAvatar url={userInfo.user.avatar} name={userInfo.user.name}></UserAvatar>
                        <Text color='black' bgColor='white' border='2px' borderColor={userInfo.user.color}>{userInfo.user.bio || "New to bubble!"}</Text>
                    </Box >
                    {hasEditButton ? editIsOpen ? <EditForm editIsOpen={editIsOpen} setEditIsOpen={setEditIsOpen} userInfo={userInfo.user}></EditForm>
                        : <IconButton aria-label='Edit Profile' icon={<EditIcon className='button-size' />} onClick={handleEditButtonClick} alignSelf='end'></IconButton> : <></>}
                    {!isFriend ? <button
                        variant='solid'
                        // style={{ backgroundColor: color }}
                        onClick={() => handleAdd(from, yourId)}
                    >Add Friend</button> : <></>}
                    <h2>Recent Bubbles:</h2>
                    {postsArr.map((post, index) => {
                        return (
                            <article key={post._id} className="post-block">
                                <Reply
                                    key={post._id}
                                    type='main'
                                    name={userInfo.user.name || userInfo.user.username}
                                    url={userInfo.user.avatar}
                                    text={post.postText}
                                    color={userInfo.user.color}
                                    userId={post.user}
                                    postId={post._id}
                                    index={index}
                                    repliesArr={repliesArr}
                                    setRepliesArr={setRepliesArr}
                                    handleDelete={handleDelete}
                                    isFriend={isFriend}
                                >
                                </Reply>
                                {repliesArr.filter((reply) => reply.postId === post._id).map(reply => (
                                    <Reply
                                        key={reply._id}
                                        replyId={reply._id}
                                        postId={post._id}
                                        type='reply'
                                        name={reply.username}
                                        text={reply.responseText}
                                        userId={reply.user || post.user}
                                        handleDeleteReply={handleDeleteReply}
                                        index={index}
                                        isOnYourPost={hasEditButton}
                                    >
                                    </Reply>
                                ))
                                }
                            </article>
                        )
                    })}
                </>}
        </>

    )
}

export default Profile;
