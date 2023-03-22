import axios from 'axios';

import {
    GET_NOTES_SUCCESS,
    GET_NOTES_FAIL,
    ADD_NOTES_SUCCESS,
    ADD_NOTES_FAIL,
    EDIT_NOTES_SUCCESS,
    EDIT_NOTES_FAIL,
    DELETE_NOTES_SUCCESS,
    DELETE_NOTES_FAIL,
} from './types';

// GET NOTES


export const getNotes = (page, collid) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
    
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}notes?page=${page}&collid=${collid}`, config)
            dispatch({
                type: GET_NOTES_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_NOTES_FAIL,
                payload: err
            });
        }
    } else {
        dispatch({
            type: GET_NOTES_FAIL,
            payload: localStorage.getItem('token')
        });
    }
};

// ADD NOTES

export const addNote = (note, collid, page) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "Note": `${note}`,
            "CollectionID": collid,
        };
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}notes`, body, config);
            dispatch({
                type: ADD_NOTES_SUCCESS,
                payload: res.data
            });

            dispatch(getNotes(page, collid));
        } catch (err) {
            dispatch({
                type: ADD_NOTES_FAIL,
                payload: err
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: ADD_NOTES_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};
// EDIT NOTES

export const editNote = (noteid, note, completed, collid, page) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };

        const body = {
            "NoteID": noteid,
            "Note": `${note}`,
            "Completed": completed,
            "CollectionID": collid,
        };
    
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}notes`, body, config);
            dispatch({
                type: EDIT_NOTES_SUCCESS,
                payload: res.data
            });

            dispatch(getNotes(page, collid));
            
        } catch (err) {
            dispatch({
                type: EDIT_NOTES_FAIL,
                payload: err
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: EDIT_NOTES_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// DELETE NOTES 

export const deleteNote = (noteid, page, collid) => async dispatch => {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}notes/${noteid}`, config);
            dispatch({
                type: DELETE_NOTES_SUCCESS,
                payload: res.data
            });

            dispatch(getNotes(page, collid));
        } catch (err) {
            dispatch({
                type: DELETE_NOTES_FAIL,
                payload: err
            });
        }
    } else {
        dispatch({
            type: DELETE_NOTES_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};