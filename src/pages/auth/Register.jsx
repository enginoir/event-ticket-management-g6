import React, { useState } from "react"
import { registerUser, checkEmail } from "../../redux/actions/user"
// import { checkEmail } from "../../redux/actions/user"
import { connect } from "react-redux"
import { Button } from "@chakra-ui/react"
import { Alert, AlertIcon, Input, Container, Heading, Stack, Text, HStack, Link } from "@chakra-ui/react"
import { API_URL } from "../../constants/API"
import { useNavigate } from 'react-router-dom';


function Register(props) {

    const inputList = {
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    const [state, setState] = useState(inputList)

    const inputHandler = (key, value) => {
        setState({ ...state, [key]: value });
        // console.log(state);
    };

    const [alert, setAlert] = useState({ show: false, message: "" });

    const navigate = useNavigate();

   if(props.userGlobal.username){
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
                                        if (emailExists) {
                                            // If the email already exists, show an alert
                                            setAlert({ show: true, message: "This email is already in use. Please use another email." });
                                        }
                                        else if (state.password !== state.confirmPassword) {
                                            // If the passwords do not match, show an alert
                                            setAlert({ show: true, message: "The passwords do not match. Please try again." });
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

}

export default connect(mapStateToProps, mapDispatchToProps)(Register);



// export default connect (mapStateToProps, mapDispatchToProps)


// }


// <div className="container">
                // <div className="row">
                //     <div className="col-12 text-center">
                //         <h1>Register Now</h1>
                //         <p className="lead">
                //             Register now and start shopping
                //         </p>
                //     </div>
                // </div>
                // <div className="row mt-5">
                //     <div className="col-4 offset-4">
                //         <div className="card">
                //             <div className="card-body">
                //                 <h5 className="font-weight-bold mb-3">Register</h5>
                //                 <input onChange={this.inputHandler} placeholder="Full Name" type="text"  />
                //                 <input onChange={this.inputHandler} placeholder="Username" type="text"  />
                //                 <input onChange={this.inputHandler} placeholder="Email" type="text"  />
                //                 <input onChange={this.inputHandler} placeholder="Password" type="password"  />
                //                 <div className="d-flex flex-row justify-content-between align-items-center">
                //                     <button className="btn btn-primary mt-2"> Register</button>
                //                     <Link to="/login">Or login</Link>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>
            // </div>