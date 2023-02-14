import axios from 'axios';

import {
    ADDRESS_SEARCH_SUCCESS,
    ADDRESS_SEARCH_FAIL,
} from './types';

// AUTO-ADDRESS FINDER

export const addressFinder = (postcode) => async dispatch => {
    const config ={
        headers: { }
    };
    try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${postcode}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`, config)

        dispatch({
            type: ADDRESS_SEARCH_SUCCESS,
            payload: res
        });
    } catch(err) {
        dispatch({
            type: ADDRESS_SEARCH_FAIL,
            payload: err
        });
    }
};