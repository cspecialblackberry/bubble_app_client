import { gql } from '@apollo/client'

export const QUERY_USERS = gql`
    query getUsers {
        users{
            _id
            username
            password
            name
            color
            avatar
            bio
            friends
            posts{
                _id
            }
        }
    }
`
//query for friend search feature
export const SEARCH_USERS = gql`
    query searchUsers{
        users{
            _id
            username
            avatar
            color
        }
    }
`
//query for finding one user
export const QUERY_USER = gql`
    query user($_id: ID!){
        user(_id: $_id){
            _id
            username
            password
            name
            color
            avatar
            bio
            friends
            posts{
                _id
                postText
                replies{
                    _id
                    responseText
                }
            }
        }
    }
`

export const QUERY_USER_INFO = gql`
    query user($_id: ID!){
        user(_id: $_id){
            _id
            username
            name
            color
            avatar
        }
    }
`

export const QUERY_POSTS = gql`
    query getPosts {
        posts{
            _id
            user
            postText
            replies{
                _id
                user
                responseText
            }
        }
    }
`

export const QUERY_POST = gql`
    query Post($_id: ID!){
        post(_id: $_id){
        postText
        _id
        }
    }
`