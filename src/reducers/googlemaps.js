import {
    ADDRESS_SEARCH_SUCCESS,
    ADDRESS_SEARCH_FAIL,
    GEOCODE_SEARCH_SUCCESS,
    GEOCODE_SEARCH_FAIL,
    ROUTE_SUCCESS,
    ROUTE_FAIL
} from '../actions/types';

const initialState = { 
    googleResult: [],
    googleTest: '',
    googleArray: [],
    geocodeResult: [],
    routeResult: []
};
// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {

        case ADDRESS_SEARCH_SUCCESS:
            // let arrayAddress = [];

            // for(let i=0; i < payload.length; i++){
            //     let addObj = {
            //         "Number": payload[i]['address_components'][0].long_name, 
            //         "Add1": payload[i]['address_components'][1].long_name,
            //         "Add2": payload[i]['address_components'][2].long_name, 
            //         "Add3": payload[i]['address_components'][4].long_name, 
            //         "Postcode": payload[i]['address_components'][6].long_name
            //     };
            //     arrayAddress.push(addObj)
            // };
            return {
                ...state,
                googleResult: payload,
                // googleTest: payload[0]['address_components'][0]['long_name'],
                // googleArray: arrayAddress
            }

        case ADDRESS_SEARCH_FAIL:
            return {
                ...state,
                googleResult: payload
            }

        case GEOCODE_SEARCH_SUCCESS:
            return {
                ...state,
                geocodeResult:payload
            }

        case GEOCODE_SEARCH_FAIL:
            return {
                ...state,
                geocodeResult:payload
            }
        
        case ROUTE_SUCCESS:
            return {
                ...state,
                routeResult:payload
            }
        
        case ROUTE_FAIL:
            return {
                ...state,
                routeResult:payload
            }

    default:
        return state;
    }
}