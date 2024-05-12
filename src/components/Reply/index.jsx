import { Card, Avatar, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import './style.css';
import { ADD_REPLY } from '../../utils/mutations';
import { useState } from 'react'
import Auth from '../../utils/auth';
import { QUERY_POSTS, QUERY_USER_INFO } from '../../utils/queries';
import ReplyForm from '../ReplyForm';

const Reply = (props) => {
    const { url, name, color, text, userId, type, postId } = props;

    const [openReply, setOpenReply] = useState(false);

    const openReplyForm = () => {
        setOpenReply(true);
    }

    const token = Auth.getProfile();

    const isReply = type === 'reply';
    const isOwnPost = userId === token.data._id;
    const isMainPost = type === 'main';

    const userQuery = useQuery(QUERY_USER_INFO, {
        variables: { _id: userId }
    })

    const postData = useQuery(QUERY_POSTS, {
        variables: {
            _id: postId }
    })
    console.log('POSTDATA', postData.data)

    let userData
    if (userQuery.data) {
        userData = userQuery.data.user
    }
    if (userQuery.error) {
        console.log(userQuery.error)
    }
    if (userQuery.loading) {
        return (
            <h1>...loading</h1>
        )
    } else {

        return (
            <>
                <Card
                    className={isMainPost ? 'your-bubble' : 'reply-bubble'}
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    border='1px'
                    borderColor={userData.color}
                    borderRadius={35}
                    display='flex'
                    flexDirection={isOwnPost ? 'row' : 'row-reverse'}
                    padding={5}
                    marginTop={3}
                >
                    <Stack className='content-container' textAlign={isOwnPost ? 'left' : 'right'}>
                        <CardBody padding={0}>
                            <p className='bubble-text'>
                                {text}
                            </p>
                        </CardBody>
                        <CardFooter padding={0}>
                            {openReply && <ReplyForm openReply={openReply} setOpenReply={setOpenReply} postId={postId}></ReplyForm>}
                            {isMainPost && <button
                                className='reply-button'
                                type='button'
                                variant='solid'
                                style={{ backgroundColor: userData.color }}
                                onClick={openReplyForm}
                            >
                                REPLY
                            </button>
                            }
                            {isOwnPost && <button
                                className='reply-button'
                                variant='solid'
                                style={{ backgroundColor: userData.color }}
                            >
                                DELETE
                            </button>
                            }
                            {/* add in something if both are empty */}
                        </CardFooter>
                    </Stack>
                    <Stack className='name-container' display='flex' flexDirection='column' alignItems='center'>
                        <Link to="/profile" state={{ from: userData._id }}>
                            <h3>{userData.name || userData.username}</h3>
                            <Avatar
                                size={isMainPost ? 'lg' : 'md'} src={userData.avatar} name={name}
                            />
                        </Link>
                    </Stack>
                </Card>
            </>
        )
    }
}

export default Reply;

// CASEY-TODO: margin-top on replies
// add reply form + function
// delete reply if it's your reply or on your post
// single bubble icon for home
// replies on profile page
// ensure friends' profile + replies show up using Reply component
// comment out YourPost + FriendPost to ensure it works without them
// media queries
