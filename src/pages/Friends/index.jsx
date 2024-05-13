import * as React from 'react';
import FriendList from "../../components/FriendList"
import Search from "../../components/SearchBar";
import './style.css';
import Auth from '../../utils/auth'
import { QUERY_USER, QUERY_USERS } from '../../utils/queries';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { REMOVE_FRIEND } from '../../utils/mutations';

export default function Friends() {
  const navigate = useNavigate()

  let userId

  useEffect(() => {
    if (!Auth.loggedIn()) {
      navigate('/')
    }else{
      userId = Auth.getProfile().data._id
      getUser({
        variables: {_id: userId}
      })
    }
  }, [])

  const [ getUser, { loading: loading1, data: userData }] = useLazyQuery(QUERY_USER)

  const { loading: loading2, data: usersData } = useQuery(
    QUERY_USERS, { fetchPolicy: 'network-only' }
  );

  const [usersState, setUsersState] = useState([])

  useEffect(() => {
    if (usersData && usersData.users && userData) {
      
      const filteredUsers = usersData.users.filter((user) => userData.user.friends.includes(user._id))
      setUsersState(filteredUsers.reverse())
    }
  }, [userData, usersData]);

  const [removeFriend] = useMutation(REMOVE_FRIEND)

  const handleRemove = async (user, friendId, index) => {
    try {
      await removeFriend({
        variables: { userId: user, friendId: friendId }
      })

      const updatedUsers = [...usersState]
      updatedUsers.splice(index, 1)
      setUsersState(updatedUsers)
    } catch (err) {
      console.error(err)
    }
  };

 

  if (loading1 || loading2) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <Search />
      <h1>Your Friends</h1>

      {usersState.map((user, index) => (
        <FriendList
          key={user._id}
          friendId={user._id}
          userId={userData.user._id}
          name={user.name || user.username}
          avatar={user.avatar}
          color={user.color}
          index={index}
          handleRemove={handleRemove}
        />
      ))}
    </>
  )
}