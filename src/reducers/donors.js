import {
    DONORS_SUCCESS,
    DONORS_FAIL,
    DONOR_SEARCH_SUCCESS,
    DONOR_SEARCH_FAIL,
    DONOR_EMAIL_SEARCH_SUCCESS,
    DONOR_EMAIL_SEARCH_FAIL,
    ADD_DONOR_SUCCESS,
    ADD_DONOR_FAIL,
    EDIT_DONOR_SUCCESS,
    EDIT_DONOR_FAIL,
    DELETE_DONOR_SUCCESS,
    DELETE_DONOR_FAIL,
    CLEAR_DONORS,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DONOR_ID_SEARCH_SUCCESS,
    DONOR_ID_SEARCH_FAIL,
} from '../actions/types';

const initialState = { 
    dons: [],
    result: '',
    isAuthenticated: null,
    emails: "",
    currentPage: null,
    has_next: false,
    has_previous: false,
    total_number: null,
    total_3months: null,
    total_monthly: null,
    total_other: null
};
// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {

        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }

        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }

        case DONORS_SUCCESS:
            return {
                ...state,
                dons: payload.data,
                currentPage: payload.page.current,
                has_next: payload.page.has_next,
                has_previous: payload.page.has_previous,
                total_number: payload.page.total_number,
                total_3months: payload.page.total3Month,
                total_monthly: payload.page.totalMonthly,
                total_other: payload.page.totalOther
                //emails: JSON.stringify(payload.map((don)=> `${don.Email};`)).replace('["', "").replace('"]', "").replaceAll('","', "")
            }

        case DONORS_FAIL:
            return {
                ...state,
                dons: []
            }

        case DONOR_SEARCH_SUCCESS:
            return {
                ...state,
                dons: payload.data,
                currentPage: payload.page.current,
                has_next: payload.page.has_next,
                has_previous: payload.page.has_previous,
                total_number: payload.page.total_number,
                total_3months: payload.page.total3Month,
                total_monthly: payload.page.totalMonthly,
                total_other: payload.page.totalOther
                //emails: JSON.stringify(payload.map((don)=> `${don.Email}; `)).replace('["', "").replace('"]', "").replaceAll('","', "")
            }

        case DONOR_EMAIL_SEARCH_SUCCESS:
            return {
                ...state,
                emails: payload.map((don)=> `${don.Email}`),
            }

            case DONOR_EMAIL_SEARCH_FAIL:
                return {
                    ...state,
                    result: payload
                }    
            
        case DONOR_SEARCH_FAIL:
            return {
                ...state,
                result: payload
            }

        case ADD_DONOR_SUCCESS:
            return {
                ...state,
                result: action.payload
            }

        case ADD_DONOR_FAIL:
            return {
                ...state,
                result: payload
            }

        case EDIT_DONOR_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case EDIT_DONOR_FAIL:
            return {
                ...state,
                result: payload
            }

        case DELETE_DONOR_SUCCESS:
            return {
                ...state,
                result: "Contact Deleted Successfully"
            }

        case DELETE_DONOR_FAIL:
            return {
                ...state,
                result: payload
            }

        case CLEAR_DONORS:
            return {
                ...state,
                dons: [],
                result: ''
            }

        case DONOR_ID_SEARCH_SUCCESS:
            return {
                ...state
            }

        case DONOR_ID_SEARCH_FAIL:
            return {
                ...state
            }

    default:
        return state;
    }
}