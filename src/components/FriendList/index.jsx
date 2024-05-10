import { Card, CardBody, CardFooter, Stack, Avatar, AbsoluteCenter } from '@chakra-ui/react';
import './style.css'
import { QUERY_USER } from '../../utils/queries';
import { useQuery } from '@apollo/client'

const FriendList = (props) => {
    const { url, name, color, text, userId } = props;
    console.log(userId)

    const userQuery = useQuery(QUERY_USER, {
        variables: { _id: userId }
    })

    let userData

    if (userQuery.data) {
        userData = userQuery.data.user
        console.log(userData)
    }

    return (
        <Card
            className='friend-bubble'
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            border='1px'
            borderColor={color}
            borderRadius={35}
            width={350}
            minHeight={350}
            display='flex'
            flexDirection='row'
            padding={5}
            marginTop={3}
        >
            <CardBody padding={0}>
                <Stack className='friend-container' display='flex' flexDirection='column' alignItems='center'>
                    <AbsoluteCenter>
                        <h2>{name}</h2>
                        <Avatar
                            size='md' src={url} name={name}
                        />
                        <div className="button-container"></div>
                        <button
                            className='view-profile-btn'
                            variant='solid'
                            style={{ backgroundColor: color }}
                        >
                            View profile
                        </button>
                        <button
                            className='add-friend-btn'
                            variant='solid'
                            style={{ backgroundColor: color }}
                        >
                            Add Friend
                        </button>
                        <button
                            className='remove-friend-btn'
                            variant='solid'
                            style={{ backgroundColor: color }}
                        >
                            Remove friend
                        </button>
                    </AbsoluteCenter>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default FriendList;
