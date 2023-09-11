import Axios from "axios"
import { API_URL } from "../../constants/API"

export const registerUser = ({ fullname, username, email, password, confirmPassword }) => {
    return (dispatch) => {
        Axios.post(`${API_URL}/users`, {
            fullname,
            username,
            email,
            password,
            confirmPassword,
            role: "user"
        })
            .then((result) => {
                delete result.data.password
                delete result.data.confirmPassword
                dispatch({
                    type: "USER_LOGIN",
                    payload: result.data
                })
                alert("berhasil mendaftarkan user")
            })
            .catch(() => {
                "gagal mendaftar user"
            })
        }
}


export const loginUser = ({ username, password}) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params: {
                username,
            }
        })
            .then((result) => {
                // console.log(result.data)
                if (result.data.length) {
                    if (password === result.data[0].password) {
                        delete result.data[0].password
                        localStorage.setItem("userDataEvent", JSON.stringify(result.data[0]))
                        dispatch({
                            type: "USER_LOGIN",
                            payload: result.data[0]
                        })
                    } else {
                        // Error wrong password
                        dispatch({
                            type: "USER_ERROR",
                            payload: "Wrong Password"
                        })
                    }
                } else {
                    // Error username not found
                    dispatch({
                        type: "USER_ERROR",
                        payload: "User Not Found"
                    })
                }
            })
            .catch((err) => {
                alert("Terjadi kesalahan di server")
            })
    }
}

export const checkEmail = (email) => {
    return (dispatch) => {
        return fetch(`${API_URL}/users?email=${email}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    // Email already exists
                    return true;
                } else {
                    // Email does not exist
                    return false;
                }
            });
    };
};

export const checkReferral = (referral) => {
    return (dispatch) => {
        return fetch(`${API_URL}/referralCode?referral=${referral}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    // Email already exists
                    return true;
                } else {
                    // Email does not exist
                    return false;
                }
            });
    };
};


export const logoutUser = () => {
    localStorage.removeItem("userDataEvent")
    return {
        type: "USER_LOGOUT"
    }
}

export const userKeepLogin = (userData) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/users`, {
            params: {
                id: userData.id,
            }
        })
            .then((result) => {
                delete result.data[0].password
                localStorage.setItem("userDataEvent", JSON.stringify(result.data[0]))

                dispatch({
                    type: "USER_LOGIN",
                    payload: result.data[0]
                })
            })
            .catch(() => {
                alert("terjadi kesalahan di server")
            })
    }
}


export const checkStorage = () => {
    return {
        type: "CHECK_STORAGE"
    }
}

