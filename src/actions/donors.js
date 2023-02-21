
import axios from 'axios';

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
    DELETE_DONOR_FAIL
} from './types';



// PULL DONORS

export const getDonors = (page) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
    
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}searchdonors?page=${page}`, config)
            dispatch({
                type: DONORS_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: DONORS_FAIL,
                payload: localStorage.getItem('token')
            });
        }
    } else {
        dispatch({
            type: DONORS_FAIL,
            payload: localStorage.getItem('token')
        });
    }
};

// SEARCH
export const searchDonors = (page, monthType, searchInput) => async dispatch => {
    if (localStorage.getItem('token')) {

        //} else { 
            if (searchInput == null || searchInput === ""){
                try {
                    const config ={
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${localStorage.getItem('token')}`,
                            'Accept': 'application/json',
                        }
                    };

                    const res = await axios.get(`${process.env.REACT_APP_API}searchdonors?page=${page}&type=${monthType}`, config)
                    dispatch({
                        type: DONOR_SEARCH_SUCCESS,
                        payload: res.data
                    });
                } catch (err) {
                    dispatch({
                        type: DONOR_SEARCH_FAIL
                    });
                    dispatch(getDonors());
                }
            } else {
                try {
                    const config ={
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${localStorage.getItem('token')}`,
                            'Accept': 'application/json'
                        }
                    };
                    
                    const res = await axios.get(`${process.env.REACT_APP_API}searchdonors?page=${page}&type=${monthType}&fullname=${searchInput}`, config)
                    dispatch({
                        type: DONOR_SEARCH_SUCCESS,
                        payload: res.data
                    });
                } catch (err) {
                    dispatch({
                        type: DONOR_SEARCH_FAIL
                    });
                    dispatch(getDonors());
                }
            }
        //}
    } else {
        dispatch({
            type: DONOR_SEARCH_FAIL
        });
    }
};

// SEARCH (FOR EMAILS)

export const searchDonorsEmails = (page, monthType, searchInput) => async dispatch => {
    if (localStorage.getItem('token')) {

        //} else { 
            if (searchInput == null || searchInput === ""){
                try {
                    const config ={
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${localStorage.getItem('token')}`,
                            'Accept': 'application/json',
                        }
                    };

                    const res = await axios.get(`${process.env.REACT_APP_API}searchdonors?page=${page}&type=${monthType}`, config)
                    dispatch({
                        type: DONOR_EMAIL_SEARCH_SUCCESS,
                        payload: res.data
                    });
                } catch (err) {
                    dispatch({
                        type: DONOR_EMAIL_SEARCH_FAIL,
                        payload: err
                    });
                }
            } else {
                try {
                    const config ={
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${localStorage.getItem('token')}`,
                            'Accept': 'application/json'
                        }
                    };
                    
                    const res = await axios.get(`${process.env.REACT_APP_API}searchdonors?page=${page}&type=${monthType}&fullname=${searchInput}`, config)
                    dispatch({
                        type: DONOR_EMAIL_SEARCH_SUCCESS,
                        payload: res.data
                    });
                } catch (err) {
                    dispatch({
                        type: DONOR_EMAIL_SEARCH_FAIL,
                        payload: err
                    });
                }
            }
        //}
    } else {
        dispatch({
            type: DONOR_SEARCH_FAIL
        });
    }
};

// ADD DONOR

export const addDonor = (fullName, firstName, lastName, email, address1, address2, address3, postCode, donorType, notes, phone, volunteer) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };

        let page = "1";
        
        const body = {
            "DonorID":null,
            "FullName": `${fullName}`,
            "FirstName": `${firstName}`,
            "LastName": `${lastName}`,
            "Email": `${email}`,
            "Address1": `${address1}`,
            "Address2": `${address2}`,
            "Address3": `${address3}`,
            "PostCode": `${postCode}`,
            "DonorType": `${donorType}`,
            "Notes": `${notes}`,
            "Phone": `${phone}`,
            "InvolveNo": 0,
            "Volunteer": `${volunteer}`
        };
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}donor`, body, config);
            dispatch({
                type: ADD_DONOR_SUCCESS,
                payload: res.data
            });

            dispatch(getDonors(page));
        } catch (err) {
            dispatch({
                type: ADD_DONOR_FAIL
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: ADD_DONOR_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// EDIT DONOR

export const editDonor = (donorId, fullName, firstName, lastName, email, address1, address2, address3, postCode, donorType, notes, phone, involveNo, volunteer, page, monthType, searchInput) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "DonorID": `${donorId}`,
            "FullName": `${fullName}`,
            "FirstName": `${firstName}`,
            "LastName": `${lastName}`,
            "Email": `${email}`,
            "Address1": `${address1}`,
            "Address2": `${address2}`,
            "Address3": `${address3}`,
            "PostCode": `${postCode}`,
            "DonorType": `${donorType}`,
            "Notes": `${notes}`,
            "Phone": `${phone}`,
            "InvolveNo": `${involveNo}`,
            "Volunteer": `${volunteer}`
        };
    
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}donor`, body, config);
            dispatch({
                type: EDIT_DONOR_SUCCESS,
                payload: res.data
            });

            dispatch(searchDonors(page, monthType, searchInput));
            
        } catch (err) {
            dispatch({
                type: EDIT_DONOR_FAIL
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: EDIT_DONOR_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// DELETE DONOR

export const deleteDonor = (donorId, page, monthType, searchInput) => async dispatch => {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}donor/${donorId}`, config);
            dispatch({
                type: DELETE_DONOR_SUCCESS,
                payload: res.data
            });

            dispatch(searchDonors(page, monthType, searchInput));
        } catch (err) {
            dispatch({
                type: DELETE_DONOR_FAIL
            });
        }
    } else {
        dispatch({
            type: DELETE_DONOR_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// DELETE MULTIPLE DONORS

export const deleteDonorsMulti = (donors, page, monthType, searchInput) => async dispatch => {
    if (localStorage.getItem('token')) {
        await donors.map((id) => {
            try{
                dispatch(deleteDonor(id, page, monthType, searchInput))
            } catch(err) {
                dispatch({
                    type: DELETE_DONOR_FAIL
                })
            }
        })
    } else {
        dispatch({
            type: DELETE_DONOR_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};