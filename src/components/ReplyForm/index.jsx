import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import { ADD_REPLY } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Auth from '../../utils/auth';


function ReplyForm(props) {
    const { postId } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [replyContent, setReplyContent] = useState('');
    const [addReply] = useMutation(ADD_REPLY);
    const token = Auth.getProfile();
    const userId = token.data._id;

    const handleReply = async () => {
        try {
            console.log('POSTID', postId)
            const res = await addReply({
                variables: {
                    postId: postId,
                    userId: userId,
                    responseText: replyContent,
                }
            });
            console.log('hit');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <button onClick={onOpen}>Open Modal</button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Repy to the bubble</p>
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder='Enter your reply'
                        />
                    </ModalBody>

                    <ModalFooter>
                        <button type='button' mr={3} onClick={onClose}>
                            Close
                        </button>
                        <button type='button' onClick={handleReply}>Submit Reply</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

// const ReplyForm = () => {
//     return (
//         <>
//             <form className='reply-form' onSubmit={handleReply}>
//                 <textarea
//                     value={replyContent}
//                     onChange={(e) => setReplyContent(e.target.value)}
//                     placeholder='Reply to the bubble'
//                 />
//                 <button type='submit'>Submit</button>
//             </form>
//         </>
//     )
// }

export default ReplyForm

