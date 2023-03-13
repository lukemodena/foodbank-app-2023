import axios from 'axios';
import dayjs from 'dayjs';

import {
    ADDRESS_SEARCH_SUCCESS,
    ADDRESS_SEARCH_FAIL,
    GEOCODE_SEARCH_SUCCESS,
    GEOCODE_SEARCH_FAIL,
    ROUTE_SUCCESS,
    ROUTE_FAIL,
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

// Geocode Finder

export const geocodeFinder = (address) => async dispatch => {
    const config ={
        headers: { }
    };
    try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_MAPS_API_LOCAL_KEY}`, config)

        console.log(res);
        dispatch({
            type: GEOCODE_SEARCH_SUCCESS,
            payload: res.data['results'][0]['geometry']['location']
        });
    } catch(err) {
        dispatch({
            type: GEOCODE_SEARCH_FAIL,
            payload: err
        });
    }
};

const getGeocode = (address) => async dispatch => {
    const config ={
        headers: { }
    };
    try {
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_MAPS_API_LOCAL_KEY}`, config)

        dispatch({
            type: GEOCODE_SEARCH_SUCCESS,
            payload: res.data['results'][0]['geometry']['location']
        });

        return (
            res.data['results'][0]['geometry']['location']
        );
        
    } catch(err) {
        dispatch({
            type: GEOCODE_SEARCH_FAIL,
            payload: err
        });
    }
};

// Route Planner

export const routePlanner = (address1, address2, address3) => async dispatch => {

    let date = dayjs().format()

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        "origin":{
            "location":{
              "latLng":{
                "latitude": 51.5536862,
                "longitude": -0.185989
              }
            },
            "sideOfRoad": true
        },
        "destination":{
            "location":{
              "latLng":{
                "latitude": 51.5536862,
                "longitude": -0.185989
              }
            }
        },
        "intermediates": [
            {
                "address": `${address1}`
            },
            {
                "address": `${address2}`
            },
            {
                "address": `${address3}`
            },
        ],
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE",
        "departureTime": `${date}`,
        "computeAlternativeRoutes": false,
        "routeModifiers": {
          "avoidTolls": false,
          "avoidHighways": false,
          "avoidFerries": false
        },
        "languageCode": "en-GB",
        "units": "IMPERIAL"
    };

    try {
        const res = await axios.post(`https://routes.googleapis.com/directions/v2:computeRoutes?key=${process.env.REACT_APP_GOOGLE_MAPS_API_LOCAL_KEY}`, body, config)

        console.log(res);
        dispatch({
            type: ROUTE_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: ROUTE_FAIL,
            payload: err
        });
    }
};

export const routeGeoapifyPlanner = (address1, address2, address3) => async dispatch => {

    const getConfig ={
        headers: { }
    };

    const stop1 = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address1}&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_MAPS_API_LOCAL_KEY}`, getConfig);
    const stop2 = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address2}&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_MAPS_API_LOCAL_KEY}`, getConfig);
    const stop3 = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address3}&result_type=street_address&key=${process.env.REACT_APP_GOOGLE_MAPS_API_LOCAL_KEY}`, getConfig);

    console.log(stop1.data['results'][0]['geometry']['location'], stop2.data['results'][0]['geometry']['location'], stop3.data['results'][0]['geometry']['location'])

    let stop1Lng = stop1.data['results'][0]['geometry']['location']['lng']
    let stop1Lat = stop1.data['results'][0]['geometry']['location']['lat']

    let stop2Lng = stop2.data['results'][0]['geometry']['location']['lng']
    let stop2Lat = stop2.data['results'][0]['geometry']['location']['lat']

    let stop3Lng = stop3.data['results'][0]['geometry']['location']['lng']
    let stop3Lat = stop3.data['results'][0]['geometry']['location']['lat']

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        "mode":"drive",
        "agents":[
            {
                "start_location":[-0.185989,51.5536862],
                "end_location":[-0.185989,51.5536862],
                "pickup_capacity":10
            }
        ],
        "jobs":[
            {
                "location":[stop1Lng,stop1Lat],
                "duration":300,
                "pickup_amount":1
            },
            {
                "location":[stop2Lng,stop2Lat],
                "duration":300,
                "pickup_amount":1
            },
            {
                "location":[stop3Lng,stop3Lat],
                "duration":300,
                "pickup_amount":1
            }
        ]
    };

    try {
        const res = await axios.post(`${process.env.REACT_APP_GEOAPIFY_URL}?apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`, body, config)

        console.log(res);
        dispatch({
            type: ROUTE_SUCCESS,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: ROUTE_FAIL,
            payload: err
        });
    }
};
