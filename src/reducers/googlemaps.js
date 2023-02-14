import {
    ADDRESS_SEARCH_SUCCESS,
    ADDRESS_SEARCH_FAIL
} from '../actions/types';

const initialState = { 
    googleResult: ''
};
// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {

        case ADDRESS_SEARCH_SUCCESS:
            return {
                ...state,
                googleResult: payload
            }

        case ADDRESS_SEARCH_FAIL:
            return {
                ...state,
                googleResult: payload
            }

    default:
        return state;
    }
}