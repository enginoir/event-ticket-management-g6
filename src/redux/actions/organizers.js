// ./redux/actions/organizers.js
import Axios from "axios";
import { API_URL } from "../../constants/API";

// Define your actions here, for example:
export const getOrganizerData = (organizerId) => {
    return (dispatch) => {
        Axios.get(`${API_URL}/organizers/${organizerId}`)
            .then((result) => {
                // Dispatch action to handle organizer data
                dispatch({
                    type: "GET_ORGANIZER_DATA",
                    payload: result.data,
                });
            })
            .catch((error) => {
                console.error("Error fetching organizer data:", error); // Log the error
                alert("Error fetching organizer data or You need to add events"); // Show a user-friendly alert
            });
    };
};

// Add other actions as needed
