import {
    GET_NOTES_SUCCESS,
    GET_NOTES_FAIL,
    ADD_NOTES_SUCCESS,
    ADD_NOTES_FAIL,
    EDIT_NOTES_SUCCESS,
    EDIT_NOTES_FAIL,
    DELETE_NOTES_SUCCESS,
    DELETE_NOTES_FAIL,
} from '../actions/types';

const initialState = { 
    notes: [],
    result: '',
    currentPage: null,
    has_next: false,
    has_previous: false,
    total_number: null,
};
// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {

        case GET_NOTES_SUCCESS:
            return {
                ...state,
                notes: payload.data,
                currentPage: payload.page.current,
                has_next: payload.page.has_next,
                has_previous: payload.page.has_previous,
                total_number: payload.page.total_number,
            }

        case GET_NOTES_FAIL:
            return {
                ...state,
                result: payload
            }

        case ADD_NOTES_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case ADD_NOTES_FAIL:
            return {
                ...state,
                result: payload
            }
            case EDIT_NOTES_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case EDIT_NOTES_FAIL:
            return {
                ...state,
                result: payload
            }

        case DELETE_NOTES_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case DELETE_NOTES_FAIL:
            return {
                ...state,
                result: payload
            }
    default:
        return state;
    }
}