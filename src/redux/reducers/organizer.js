// organizer.js
const initialState = {
    organizerData: {}, // Initialize with an empty object
};

const organizerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ORGANIZER_DATA":
            return {
                ...state,
                organizerData: action.payload,
            };
        // Add cases for other organizer-related actions here (e.g., add, update, delete).

        default:
            return state;
    }
};

export default organizerReducer;
