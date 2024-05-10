import {gql} from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $name: String){
        addUser(username: $username, password: $password, name: $name){
            _id
            username
            password
            name
        }
    }
`

export const EDIT_USER = gql`
    mutation editUser($userId: ID!, $color: String, $bio: String, $name: String $avatar: String){
        editUser(userId: $userId, color: $color, bio: $bio, name: $name, avatar: $avatar){
        _id
        color
        name
        bio
        avatar
        }
    }
`

export const ADD_FRIEND = gql`
    mutation addFriend($userId: ID!, $friendId: ID!){
        addFriend(userId: $userId, friendId: $friendId){
        _id
        username
        friends
        }
    }
`

export const REMOVE_FRIEND = gql`
    mutation removeFriend($userId: ID!, $friendId: ID!){
        removeFriend(userId: $userId, friendId: $friendId){
        _id
        username
        friends
        }
    }
`

export const LOGIN = gql`
    mutation login($username:String!, $password:String!){
        login(username: $username, password: $password){
            token
            user{
                _id
                color
                username
            }
        }
    }
`
export const ADD_POST = gql`
    mutation addPost($userId: ID!, $postText: String!){
        addPost(userId: $userId, postText: $postText){
            _id
            user
            postText
        }
    }
`

export const DELETE_POST = gql`
    mutation deletePost($userId: ID!, $postId: ID!){
        deletePost(userId: $userId, postId: $postId){
        _id
        }
    }
`

export const ADD_REPLY = gql`
    mutation addReply($postId: ID!, $userId: ID!, $responseText: String!){
        addReply(postId: $postId, userId: $userId, responseText: $responseText){
        _id
        replies {
            _id
            responseText
        }
        }
    }
`