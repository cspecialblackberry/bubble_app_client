import { Card, CardBody, Stack, Avatar, AbsoluteCenter } from '@chakra-ui/react';
import './style.css'
import {Link} from 'react-router-dom'

const FriendList = ({ avatar, name, color, userId, friendId, handleRemove, index }) => {

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
                            size='md' src={avatar} name={name}
                        />
                        <div className="button-container"></div>
                        <Link to='/profile' state={{from: friendId}}>
                        <button
                            className='view-profile-btn'
                            variant='solid'
                            style={{ backgroundColor: color }}
                        >
                            View profile
                        </button>
                        </Link>
                        <button
                            className='remove-friend-btn'
                            variant='solid'
                            style={{ backgroundColor: color }}
                            onClick={() => handleRemove(userId, friendId, index)}
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
