import React, { useState } from "react"
import { registerUser, checkEmail, checkReferral } from "../../redux/actions/user"
import { connect } from "react-redux"
import { Button } from "@chakra-ui/react"
import { Alert, AlertIcon, Input, Container, Heading, Stack, Text, HStack, Link } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';


function Register(props) {

    const inputList = {
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        referralCode: "",
    }

    const [state, setState] = useState(inputList)

    const inputHandler = (key, value) => {
        setState({ ...state, [key]: value });
    };

    const [alert, setAlert] = useState({ show: false, message: "" });

    const navigate = useNavigate();

    if (props.userGlobal.username) {
        navigate("/")
    }


    return (
        <div style={{ marginTop: 100 }}>
            <Container boxShadow='dark-lg' bgGradient='linear(to-r, white.200, grey.500)' borderColor='black' borderWidth='2px' borderRadius='20px' w='100%' p={4} color='black'>
                <Stack spacing={3}>
                    <Heading>Register Now</Heading>
                    <Text as='b'>
                        Register now and start shopping
                    </Text>

                    <Input bgColor="white" name="fullname" onChange={(e) => inputHandler("fullname", e.target.value)} placeholder="Full Name" type="text" required />
                    <Input bgColor="white" name="username" onChange={(e) => inputHandler("username", e.target.value)} placeholder="Username" type="text" required />
                    <Input
                        bgColor="white"
                        name="email"
                        onChange={(e) => inputHandler("email", e.target.value)}
                        placeholder="Email"
                        type="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Please enter a valid email address"
                        required
                    />
                    <Input bgColor="white" name="password" onChange={(e) => inputHandler("password", e.target.value)} placeholder="Password" type="password" required />
                    <Input
                        bgColor="white"
                        name="confirmPassword"
                        onChange={(e) => inputHandler("confirmPassword", e.target.value)}
                        placeholder="Confirm Password"
                        type="password"
                        required
                    />
                    <Input
                        bgColor="white"
                        name="referralCode"
                        onChange={(e) => inputHandler("referralCode", e.target.value)}
                        placeholder="Referral Code"
                        type="text" 
                        required
                    />

                    {alert.show && (
                        <Alert status="error">
                            <AlertIcon />
                            {alert.message}
                        </Alert>
                    )}

                    <HStack spacing='300px'>
                        <Button
                            colorScheme='blue'
                            onClick={async () => {
                                // Check if all required fields are filled out
                                if (!state.fullname || !state.username || !state.email || !state.password) {
                                    // If not all required fields are filled out, show an alert
                                    setAlert({ show: true, message: "Please fill out all required fields" });
                                } else {
                                    // Check if the email is valid
                                    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
                                    if (!emailRegex.test(state.email)) {
                                        // If the email is not valid, show an alert
                                        setAlert({ show: true, message: "Please enter a valid email address" });

                                    } else {
                                        // Check if the email already exists in the database
                                        const emailExists = await props.checkEmail(state.email);
                                        const referralExists = await props.checkReferral(state.referralCode);
                                        if (emailExists) {
                                            // If the email already exists, show an alert
                                            setAlert({ show: true, message: "This email is already in use. Please use another email." });
                                        }
                                        else if (state.password !== state.confirmPassword) {
                                            // If the passwords do not match, show an alert
                                            setAlert({ show: true, message: "The passwords do not match. Please try again." });
                                        }
                                        else if(!referralExists){
                                            console.log(referralExists)
                                            setAlert({ show: true, message: "Your Referral Code does not exist" });
                                        }
                                        else {
                                            // If the email does not exist, submit the form
                                            props.registerUser(state);
                                        }
                                    }
                                }
                            }}
                            className="btn btn-primary mt-2"
                        >
                            Register
                        </Button>


                        <Button><Link href="/login" linkDecoration="none">Or login</Link></Button>
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
    registerUser,
    checkEmail,
    checkReferral,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
