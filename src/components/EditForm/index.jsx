import { useState } from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Radio,
    RadioGroup,
    SimpleGrid,
    Image,
    Card,
    CardBody,
    CloseButton
} from '@chakra-ui/react';
import { EDIT_USER } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import './style.css';

const imageArray = ['/bubble-favicon.svg', //Photo by David Clode on Unsplash 
    '/avatarImages/andrewKeymaster.jpg', //Photo by Andrew Keymaster on Unsplash 
    '/avatarImages/braedonMcCloud.jpg', //Photo by Braedon McLeod on Unsplash 
    '/avatarImages/davidClode.jpg', //Photo by David Clode on Unsplash 
    '/avatarImages/thomasStephan.jpg', //Photo by Thomas Stephan on Unsplash
    '/avatarImages/ZdenekMachacek.jpg', //Photo by Zdeněk Macháček on Unsplash
    '/avatarImages/maxKleinen.jpg', //Photo by Max Kleinen on Unsplash
    '/avatarImages/alexanderDummer.jpg', //Photo by Alexander Dummer on Unsplash
    '/avatarImages/davidClode2.jpg', //Photo by David Clode on Unsplash
    '/avatarImages/forestSimon.jpg', //Photo by Forest Simon on Unsplash
    '/avatarImages/alfredSchrock.jpg', //Photo by Alfred Schrock on Unsplash
    '/avatarImages/forestSimon2.jpg', //Photo by Forest Simon on Unsplash
    '/avatarImages/marcelStrauss.jpg', //Photo by Marcel Strauß on Unsplash
    '/avatarImages/albertoBianchini.jpg', //Photo by Alberto Bianchini on Unsplash
    '/avatarImages/kindAndCurious.jpg', //Photo by Kind and Curious on Unsplash
    '/avatarImages/marinaRaspopova.jpg', //Photo by Marina Raspopova on Unsplash
    '/avatarImages/pawelCzerwinski.jpg', //Photo by PawelCzerwinski on Unsplash
    '/avatarImages/alfredSchrock2.jpg', //Photo by Alfred Schrock on Unsplash
    '/avatarImages/alexAlvarez.jpg', //Photo by Alex Alvarez on Unsplash
    '/avatarImages/kidCircus.jpg', //Photo by Kid Circus on Unsplash
    '/avatarImages/sharonPittaway.jpg', //Photo by Sharon Pittaway on Unsplash
    '/avatarImages/aaronBurden.jpg', //Photo by Aaron Burden on Unsplash
    '/avatarImages/kellySikkema.jpg', //Photo by Kelly Sikkema on Unsplash
    '/avatarImages/markusSpiske.jpg', //Photo by Markus Spiske on Unsplash
    '/avatarImages/almosBechtold.jpg', //Photo by Almos Bechtold on Unsplash
    '/avatarImages/kaiDahms.jpg', //Photo by Kai Dahms on Unsplash
    '/avatarImages/kaiDahms2.jpg', //Photo by Kai Dahms on Unsplash
    '/avatarImages/pieter.jpg', //Photo by Pieter on Unsplash
    '/avatarImages/adityaGhodke.jpg', //Photo by Aditya Ghodke on Unsplash
    '/avatarImages/carlosTorres.jpg', //Photo by Carlos Torres on Unsplash
    '/avatarImages/israelPina.jpg', //Photo by Israel Pina on Unsplash
    '/avatarImages/davidClode3.jpg', //Photo by David Clode on Unsplash 
    '/avatarImages/elisabethArnold.jpg', //Photo by Elisabeth Arnold on Unsplash 
]



const EditForm = (props) => {
    const { userInfo } = props
    const { setEditIsOpen } = props;
    const [nameInput, setNameInput] = useState(userInfo.name);
    const [bioInput, setBioInput] = useState(userInfo.bio);
    const [value, setColorValue] = useState(userInfo.color);
    const [avatarImage, setAvatarImage] = useState(userInfo.avatar);


    const [editUser, { error }] = useMutation(EDIT_USER)

    const handleNameInputChange = (e) => {
        setNameInput(e.target.value);
    }
    const handleBioInputChange = (e) => {
        setBioInput(e.target.value);
    }
    const handleColorInputChange = (e) => {
        setColorValue(e);
    }
    const handleAvatarImageChange = (image) => {
        setAvatarImage(image)
    }
    const handleSubmit = async () => {
        const res = await editUser({
            variables: {
                userId: userInfo._id,
                name: nameInput,
                bio: bioInput,
                color: value,
                avatar: avatarImage
            }
        })
        setEditIsOpen(false)
        window.location.reload()
    }
    const handleCloseClick = () => {
        setEditIsOpen(false);
        window.location.reload()
    }

    return (
        <Card bgColor='#F4F4F4'>
            <CloseButton onClick={handleCloseClick} alignSelf='end' />
            <CardBody>
                <h2>Edit Profile:</h2>
                <FormControl>
                    <FormLabel>Edit Name:</FormLabel>
                    <Input type="text"
                        value={nameInput}
                        onChange={handleNameInputChange}>
                    </Input>

                    <FormLabel>Choose Your Avatar:</FormLabel>
                    <SimpleGrid columns={3} height={60} overflowY='scroll' rowGap={3}>
                        {imageArray.map((image, index) => {
                            return (
                                <Image key={index}
                                    borderRadius='full'
                                    boxSize='100px'
                                    src={image}
                                    onClick={() => handleAvatarImageChange(image)}
                                    className={avatarImage === image ? 'selected' : 'unselected'}
                                />
                            )
                        })}
                    </SimpleGrid>

                    <FormLabel>Choose Accent Color:</FormLabel>
                    <RadioGroup onChange={handleColorInputChange} value={value}>
                        <SimpleGrid direction='row' columns={3}>
                            <Radio value='#B9E5FF' color='#B9E5FF' colorScheme='#B9E5FF' bg='#B9E5FF' borderColor='#B9E5FF'>Blue</Radio>
                            <Radio value='#FFDAE7' color='#FFDAE7' colorScheme='#FFDAE7' bg='#FFDAE7' borderColor='#FFDAE7'>Red</Radio>
                            <Radio value='#FFF0B5' color='#FFF0B5' colorScheme='#FFF0B5' bg='#FFF0B5' borderColor='#FFF0B5'>Yellow</Radio>
                            <Radio value='#D8FFA5' color='#D8FFA5' colorScheme='#D8FFA5' bg='#D8FFA5' borderColor='#D8FFA5'>Green</Radio>
                            <Radio value='#D9C5FF' color='#D9C5FF' colorScheme='#D9C5FF' bg='#D9C5FF' borderColor='#D9C5FF'>Purple</Radio>
                            <Radio value='#FFD073' color='#FFD073' colorScheme='#FFD073' bg='#FFD073' borderColor='#FFD073'>Orange</Radio>
                        </SimpleGrid>
                    </RadioGroup>


                    <FormLabel>Edit Bio:</FormLabel>
                    <Input type="text"
                        value={bioInput}
                        onChange={handleBioInputChange}>
                    </Input>

                    <Button colorScheme='blue' onClick={handleSubmit} marginTop={3}>Submit</Button>
                </FormControl>
            </CardBody>
        </Card>
    )
}

export default EditForm;