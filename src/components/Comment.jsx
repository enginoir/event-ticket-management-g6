import React, { useState } from 'react';
import {
    Box,
    Text,
    Input,
    Button,
    VStack,
    StackDivider,
    Avatar,
    Flex,
    Spacer,
} from '@chakra-ui/react';
import { API_URL } from '../constants/API';
import { connect } from "react-redux";
import ReactStars from "react-rating-stars-component";


function CommentSection(props) {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    return (
        <VStack spacing={4} divider={<StackDivider borderColor="gray.200" />}>
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700" 
                classNames={"mt-3"}
            />
            <Text fontSize="xl" fontWeight="bold">
                Comments
            </Text>
            {comments.map((comment, index) => (
                <Flex key={index} align="start" justifyContent="flex-start">
                    <Avatar size="sm" name={props.userGlobal.username} />
                    <Text ml={2}>{comment}</Text>
                    <Spacer />
                </Flex>
            ))}

            <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <div className='d-inline-flex' style={{ justifyContent: 'space-between' }}>
                <Button colorScheme="blue" onClick={handleAddComment}>
                    Add Comment
                </Button>
            </div>

        </VStack>
    );
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user,
    };
};

export default connect(mapStateToProps)(CommentSection);
