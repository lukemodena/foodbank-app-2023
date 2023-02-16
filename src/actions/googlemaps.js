import axios from 'axios';

import {
    ADDRESS_SEARCH_SUCCESS,
    ADDRESS_SEARCH_FAIL,
} from './types';

// AUTO-ADDRESS FINDER

export const addressFinder = (latlng) => async dispatch => {
    const config ={
        headers: { }
    };
    try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_MAPS_API_LOCAL_KEY}`, config)

        console.log(res);
        dispatch({
            type: ADDRESS_SEARCH_SUCCESS,
            payload: res['data']['results']
        });
    } catch(err) {
        dispatch({
            type: ADDRESS_SEARCH_FAIL,
            payload: err
        });
    }
};

export const OLDaddressFinder = (postcode) => async dispatch => {
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