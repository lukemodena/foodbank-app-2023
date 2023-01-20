import {
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAIL
} from '../actions/types';

const initialState = { 
    result: ''
};
// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {

        case SEND_EMAIL_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case SEND_EMAIL_FAIL:
            return {
                ...state,
                result: payload
            }

    default:
        return state;
    }
}