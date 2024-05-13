import { Card, Avatar, CardHeader, CardBody, CardFooter, Stack, Heading, Button, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import './style.css'
import { QUERY_USER_INFO } from '../../utils/queries';
import { useQuery } from '@apollo/client'

const FriendPost = (props) => {
    const { url, name, color, text, userId, postId } = props;

    const userQuery = useQuery(QUERY_USER_INFO, {
        variables: { _id: userId }
    })
    let userData
    if (userQuery.data) {
        userData = userQuery.data.user
    }
    if (userQuery.error) {
        console.error(userQuery.error)
    }

    if (userQuery.loading) {
        return (
            <h1>...loading</h1>
        )
    } else {

        return (
            <Card
                className='friend-bubble'
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                border='1px'
                borderColor={userData.color}
                borderRadius={35}
                width={350}
                minHeight={200}
                display='flex'
                // alignItems="center"
                flexDirection='row'
                padding={5}
                marginTop={3}
            >

                <Stack className='name-container' display='flex' flexDirection='column' alignItems='center'>
                    <Link to="/profile" state={{ from: userId }}>
                        <h2>{userData.name || userData.username}</h2>
                        <Avatar
                            size='lg' src={userData.avatar} name={userData.name}
                        />
                    </Link>
                </Stack>
                <Stack className='content-container'>
                    <CardBody padding={0}>
                        <p className='bubble-text'>
                            {text}
                        </p>
                    </CardBody>
                    <CardFooter className='friend-bubble-footer' padding={0}>
                        <button
                            className='reply-button'
                            variant='solid'
                            style={{ backgroundColor: userData.color }}
                        >
                            REPLY
                        </button>
                    </CardFooter>
                </Stack>
            </Card>
        )
    }
}


export default FriendPost;
