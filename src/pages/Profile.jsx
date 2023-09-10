import Axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";

function Profile(props) {
    const [userData, setUserData] = useState({});
    const [transactionList, setTransactionList] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newFullName, setNewFullName] = useState("");
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);

    // Default profile picture URL
    const defaultProfilePictureUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_Nuhe-dVcxSaXtHCE83tzKyUUmh390EHkyes67K25ST4uIvtn3uIG-i_6yduiJR2rhFE&usqp=CAU";

    // Fetch user data
    const fetchUserData = () => {
        Axios.get(`${API_URL}/users/${props.userGlobal.id}`)
            .then((result) => {
                setUserData(result.data);
            })
            .catch(() => {
                alert("Terjadi kesalahan di server");
            });
    };

    // Fetch user's transaction history
    const fetchTransactions = () => {
        Axios.get(`${API_URL}/transactions`, {
            params: {
                userId: props.userGlobal.id,
            },
        })
            .then((result) => {
                setTransactionList(result.data);
            })
            .catch(() => {
                alert("Terjadi kesalahan di server");
            });
    };

    // Fetch user's recent cart items
    const fetchCartItems = () => {
        Axios.get(`${API_URL}/carts`, {
            params: {
                userId: props.userGlobal.id,
            },
        })
            .then((result) => {
                setCartItems(result.data);
            })
            .catch(() => {
                alert("Terjadi kesalahan di server");
            });
    };

    // Function to handle changes in input fields
    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleFullNameChange = (e) => {
        setNewFullName(e.target.value);
    };

    const handleProfilePictureUrlChange = (e) => {
        setProfilePictureUrl(e.target.value);
    };

    // Function to toggle profile picture edit mode
    const toggleProfilePictureEditMode = () => {
        setIsEditingProfilePicture(!isEditingProfilePicture);
    };

    // Function to submit the form and update user data
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the new email is a valid format
        if (!isValidEmail(newEmail)) {
            alert("Invalid email format. Please use a valid email address.");
            return;
        }

        // Create an object with the updated user data
        const updatedUserData = {
            ...userData,
            email: newEmail,
            password: newPassword,
            fullname: newFullName,
        };

        // Send a PUT request to update user data
        Axios.put(`${API_URL}/users/${props.userGlobal.id}`, updatedUserData)
            .then(() => {
                alert("User data updated successfully.");
                // Clear input fields and fetch updated user data
                setNewEmail("");
                setNewPassword("");
                setNewFullName("");
                fetchUserData();
            })
            .catch(() => {
                alert("Terjadi kesalahan di server");
            });
    };

    // Function to validate email format
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    useEffect(() => {
        fetchUserData();
        fetchTransactions();
        fetchCartItems();
    }, [props.userGlobal.id]);

    const renderTransactionHistory = () => {
        return transactionList.map((val, index) => {
            return (
                <tr key={index}>
                    <td>{val.transactionDate}</td>
                    <td>{val.transactionItems.length} Chosen Event(s)</td>
                    <td>Rp {val.totalPrice}</td>
                </tr>
            );
        });
    };

    const renderCartItems = () => {
        return cartItems.map((val) => {
            return (
                <tr key={val.id}>
                    <td>{val.productName}</td>
                    <td>{val.quantity}</td>
                    <td>Rp {val.price * val.quantity}</td>
                </tr>
            );
        });
    };

    return (
        <div className="p-5">
            <h1>User Profile</h1>
            <div className="row mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <strong>User Details</strong>
                        </div>
                        <div className="card-body">
                            <p>
                                <strong>Full Name:</strong> {userData.fullname}
                            </p>
                            <p>
                                <strong>Username:</strong> {userData.username}
                            </p>
                            <p>
                                <strong>Email:</strong> {userData.email}
                            </p>
                            <p>
                                <strong>Password:</strong> {userData.password}
                            </p>
                            <p>
                                <strong>Profile Picture:</strong>
                            </p>
                            {isEditingProfilePicture ? (
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter profile picture URL"
                                        value={profilePictureUrl}
                                        onChange={handleProfilePictureUrlChange}
                                    />
                                </div>
                            ) : (
                                <img
                                    src={profilePictureUrl || userData.profilePictureUrl || defaultProfilePictureUrl}
                                    alt="Profile"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <button
                                className="btn btn-primary mt-3"
                                onClick={toggleProfilePictureEditMode}
                            >
                                {isEditingProfilePicture ? "Save Profile Picture" : "Edit Profile Picture"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <div className="card">
                        <div className="card-header">
                            <strong>Edit User Information</strong>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="newEmail">New Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="newEmail"
                                        placeholder="Enter new email"
                                        value={newEmail}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newFullName">New Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="newFullName"
                                        placeholder="Enter new full name"
                                        value={newFullName}
                                        onChange={handleFullNameChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">
                            <strong>Transaction History</strong>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Transaction Date</th>
                                        <th>Total Chosen Events</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>{renderTransactionHistory()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">
                            <strong>Recent Cart Items</strong>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>{renderCartItems()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userGlobal: state.user,
    };
};

export default connect(mapStateToProps)(Profile);
