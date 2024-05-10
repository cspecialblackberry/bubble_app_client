import { Avatar } from '@chakra-ui/react';

const UserAvatar = (props) => {
    const {url, name} = props;
    return(
        <>
            <Avatar size='2xl' name={name} src={url}/>
        </>
    )
}

export default UserAvatar;