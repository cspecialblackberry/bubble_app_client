import YourPost from "../../components/YourPost";
import FriendPost from "../../components/FriendPost";
import './style.css';
import Auth from '../../utils/auth'
import { QUERY_USER, QUERY_POSTS } from '../../utils/queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import Search from "../../components/SearchBar";

const name = ['Jimmy Smith', 'Marie Travolta', 'Billy Lou', 'Gren Thalamus', 'Kristine Sinclair', 'Benjamin Phonics'];
const image = ['/avatarImages/braedonMcCloud.jpg', '/avatarImages/davidClode.jpg', '/avatarImages/alexanderDummer.jpg', '/avatarImages/marcelStrauss.jpg', '/avatarImages/forestSimon.jpg', '/avatarImages/maxKleinen.jpg']
const color = ['#FFDAE7', '#FFD073', '#FFF0B5', '#D8FFA5', '#B9E5FF', '#D9C5FF']
const bubbles = ['Let\'s go Phillies! Big win tonight!',
  'Stop judging people for what they put on their bagels! Chocolate sauce is good!',
  'Anyone want to go to the mall later on?',
  'I cannot get used to the sun being up at this time. Crazy daylight savings lol',
  'Sushi night!',
  'Bubble is the new Myspace'];

export default function Home() {

  const token = Auth.getProfile()
  console.log(token.data._id)

  const [getUser, { called, loading, data }] = useLazyQuery(
    QUERY_USER, { variables: { _id: token.data._id } }
  )

  const userResult = useQuery(
    QUERY_USER, { variables: { _id: token.data._id } }
  )
  if (userResult.loading) console.log('loading')
  if (userResult.data) console.log(userResult.data)
  if (userResult.error) console.log(userResult.error)

  let posts = []
  let homePosts = []
  const user = userResult.data?.user
  console.log(user)

  const postsResult = useQuery(
    QUERY_POSTS
  )

  if (postsResult.data) {
    console.log(postsResult.data)
    posts = postsResult.data.posts
    console.log(posts)
    homePosts = posts.filter((post) => {
      if (post.user === token.data._id) {
        return post
      } else if (user.friends.includes(post.user)) {
        return post
      }
    })
    console.log(homePosts)
  }

  return (
    <>
      <h1>Here's what's poppin'</h1>

      {homePosts.toReversed().map((post) => {
        if (post.user === token.data._id) {
          return (
            <YourPost key={post._id} name={user.name} url={user.avatar} text={post.postText} color={user.color} userId={user._id}></YourPost>
          )
        } else {
          return (
            <FriendPost key={post._id} postId={post._id} text={post.postText} userId={post.user}></FriendPost>
          )
        }
      })}

      {/* <YourPost name='Doug Hamilton' url='/avatarImages/alfredSchrock.jpg' text='Expand your mind with Bubbles' color='#FFF0B5'></YourPost>
      {bubbles.map((bubble, index) => {
        return (
          <FriendPost key={index} name={name[index]} url={image[index]} text={bubble} color={color[index]}></FriendPost>
        )
      })} */}
    </>
  );
}