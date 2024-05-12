import * as React from 'react';
import FriendList from "../../components/FriendList"
import Search from "../../components/SearchBar";
import './style.css';
import Auth from '../../utils/auth';

const name = ['Jimmy Smith', 'Marie Travolta', 'Billy Lou', 'Gren Thalamus', 'Kristine Sinclair', 'Benjamin Phonics'];
const avatar = ['/avatarImages/braedonMcCloud.jpg', '/avatarImages/davidClode.jpg', '/avatarImages/alexanderDummer.jpg', '/avatarImages/marcelStrauss.jpg', '/avatarImages/forestSimon.jpg', '/avatarImages/maxKleinen.jpg']
const color = ['#FFDAE7', '#FFD073', '#FFF0B5', '#D8FFA5', '#B9E5FF', '#D9C5FF']
const friends = ['1', '2', '3', '4', '5'];

export default function Friends() {
  if (Auth.loggedIn() === false) {
    console.log('hit')
    window.location.replace('/')
  }
  return (
    <>
      <Search />
      <h1>Your Friends</h1>

      {friends.map((friend, index) => {
        return (
          <FriendList key={index} name={name[index]} url={avatar[index]} text={friends[index]} color={color[index]}></FriendList>
        )
      })}
    </>
  );
}