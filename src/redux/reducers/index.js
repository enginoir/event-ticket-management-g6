import { combineReducers } from "redux";
import userReducer from "./user";
import cartReducer from './cart';
import organizerReducer from './organizer'; // Import organizer reducer

export default combineReducers({
    user: userReducer,
    cart: cartReducer,
    organizer: organizerReducer, // Include organizer reducer
});
