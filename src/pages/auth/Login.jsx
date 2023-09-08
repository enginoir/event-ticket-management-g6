import React, { useState } from "react";
import { connect } from "react-redux";
import { 
    AlertIcon, 
    Alert, 
    Button, 
    Input, 
    Container, 
    Heading, 
    Stack, 
    Text, 
    HStack, 
    Link } from "@chakra-ui/react";
import { loginUser } from "../../redux/actions/user";
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const inputList = {
        username: "",
        password: "",
    }

    const [state, setState] = useState(inputList);
    const navigate = useNavigate();

    const inputHandler = (key, value) => {
        setState({ ...state, [key]: value });
        // console.log(state);
    };

    if(props.userGlobal.username){
        navigate("/search")
    }


    return (
        <div style={{ marginTop: 100 }}>

            <Container boxShadow='dark-lg' bg='white' borderColor='black' borderWidth='2px' borderRadius='20px' w='100%' p={4} color='black'>
                <Stack spacing={3}>
                    <Heading>Login Now</Heading>
                    <Text as='b'>
                        Login now and start shopping
                    </Text>         
                    <Input bgColor="white" onChange={(e) => inputHandler("username", e.target.value)} name="username" placeholder="Username" type="text" />
                    <Input bgColor="white" onChange={(e) => inputHandler("password", e.target.value)} name="password" placeholder="Password" type="password" />
                    {
                        props.userGlobal.errMsg ?
                            <Alert status='error'>
                                <AlertIcon />
                                {props.userGlobal.errMsg}
                            </Alert>
                            : null
                    }
                    <HStack spacing='300px'>
                        <Button colorScheme='blue' onClick={() => props.loginUser(state)} className="btn btn-primary mt-2"> Log In</Button>
                        <Button><Link href="/register">Or Register</Link></Button>
                    </HStack>
                </Stack>


            </Container>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user,

    }
}

const mapDispatchToProps = {
    loginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
