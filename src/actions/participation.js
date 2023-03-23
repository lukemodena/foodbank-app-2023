
import axios from 'axios';
import { cmp } from '../Components/common/cmpFunc';

import {
    PARTICIPATION_SUCCESS,
    PARTICIPATION_FAIL,
    ADD_PARTICIPATION_SUCCESS,
    ADD_PARTICIPATION_FAIL,
    EDIT_PARTICIPATION_SUCCESS,
    EDIT_PARTICIPATION_FAIL,
    DELETE_PARTICIPATION_SUCCESS,
    DELETE_PARTICIPATION_FAIL,
    PARTICIPATION_EXISTS,
    PARTICIPATION_NOT_EXISTS,
    DONOR_ID_SEARCH_SUCCESS,
    DONOR_ID_SEARCH_FAIL,
    EDIT_DONOR_SUCCESS,
    EDIT_DONOR_FAIL,
    WHOLESALE_ID_SUCCESS,
    WHOLESALE_ID_FAIL,
    EDIT_WHOLESALE_SUCCESS,
    EDIT_WHOLESALE_FAIL,
    PARTICIPATION_LIST_SUCCESSFUL,
    PARTICIPATION_LIST_FAIL
} from './types';

// GET PARTICIPANT LIST

export const getParticipantList = (page, perPage, CollectionID, FullName, Type) => async dispatch => {
    if (localStorage.getItem('token')) {
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            if (CollectionID === "" | CollectionID === null ){
                if (Type === "" | Type === null ) {
                    if (FullName === "" | FullName === null ) {
                        const res = await axios.get(`${process.env.REACT_APP_API}listparticipants?page=${page}&per_page=${perPage}`, config);
                        dispatch({
                            type: PARTICIPATION_LIST_SUCCESSFUL,
                            payload: res.data
                        });
                    } else {
                        const res = await axios.get(`${process.env.REACT_APP_API}listparticipants?page=${page}&per_page=${perPage}&fullname=${FullName}`, config);
                        dispatch({
                            type: PARTICIPATION_LIST_SUCCESSFUL,
                            payload: res.data
                        });
                    } 
                } else {
                    if (FullName === "" | FullName === null ) {
                        const res = await axios.get(`${process.env.REACT_APP_API}listparticipants?page=${page}&per_page=${perPage}&type=${Type}`, config);
                        dispatch({
                            type: PARTICIPATION_LIST_SUCCESSFUL,
                            payload: res.data
                        });
                    } else {
                        const res = await axios.get(`${process.env.REACT_APP_API}listparticipants?page=${page}&per_page=${perPage}&fullname=${FullName}&type=${Type}`, config);
                        dispatch({
                            type: PARTICIPATION_LIST_SUCCESSFUL,
                            payload: res.data
                        });
                    } 
                }

            } else {
                if (Type === "" | Type === null ) {
                    if (FullName === "" | FullName === null ) {
                        const res = await axios.get(`${process.env.REACT_APP_API}listparticipants?page=${page}&per_page=${perPage}&collid=${CollectionID}`, config);
                        dispatch({
                            type: PARTICIPATION_LIST_SUCCESSFUL,
                            payload: res.data
                        });
                    } else {
                        const res = await axios.get(`${process.env.REACT_APP_API}listparticipants?page=${page}&per_page=${perPage}&collid=${CollectionID}&fullname=${FullName}`, config);
                        dispatch({
                            type: PARTICIPATION_LIST_SUCCESSFUL,
                            payload: res.data
                        });
                    } 
                } else {
                    if (FullName === "" | FullName === null ) {
                        const res = await axios.get(`${process.env.REACT_APP_API}listparticipants?page=${page}&per_page=${perPage}&collid=${CollectionID}&type=${Type}`, config);
                        dispatch({
                            type: PARTICIPATION_LIST_SUCCESSFUL,
                            payload: res.data
                        });
                    } else {
                        const res = await axios.get(`${process.env.REACT_APP_API}listparticipants?page=${page}&per_page=${perPage}&collid=${CollectionID}&fullname=${FullName}&type=${Type}`, config);
                        dispatch({
                            type: PARTICIPATION_LIST_SUCCESSFUL,
                            payload: res.data
                        });
                    } 
                }
                
                
                // if (Type === "1" | Type === "4"){
                //     dispatch({
                //         type: PARTICIPATION_LIST_SUCCESSFUL,
                //         // payload: res.data.sort((a, b) => {
                //         //     if (parseInt(a.DropOffTime) > parseInt(b.DropOffTime)) { return 1; }
                //         //     if (parseInt(b.DropOffTime) > parseInt(a.DropOffTime)) { return -1; }
                //         //     return 0;
                //         //   }),
                //         payload: res.data.data.sort((a, b) => {
                //             return cmp(
                //                 [cmp(a.PaymentRecieved, b.PaymentRecieved), cmp(parseInt(a.DropOffTime), parseInt(b.DropOffTime))],
                //                 [cmp(b.PaymentRecieved, a.PaymentRecieved), cmp(parseInt(b.DropOffTime), parseInt(a.DropOffTime))]
                //             );
                //         })
                //     });
                // } else if (Type === "2"){
                //     dispatch({
                //         type: PARTICIPATION_LIST_SUCCESSFUL,
                //         payload: res.data.data.sort((a, b) => {
                //             if (a.PostCode > b.PostCode) { return 1; }
                //             if (b.PostCode > a.PostCode) { return -1; }
                //             return 0;
                //           })
                //     });
                // } else {
                // }
                
            }
            
        } catch (err) {
            dispatch({
                type: PARTICIPATION_LIST_FAIL
            });
        }

    } else {
        dispatch({
            type: PARTICIPATION_LIST_FAIL
        });
    }
}

// PULL CURRENT PARTICIPANTS (FOR CREATE PARTICIPANTS ON CONTACTS/DONOR PAGE - PREVENTS DUPLICATION)

export const getCurrentParticipants = (CollectionID, DonorID, payRec, donTyp, totDon, droTim, notes, donId, colId, whoId) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
    
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}searchparticipants?collid=${CollectionID}&donid=${DonorID}`, config)
            
            if (res.data.length !== 0){
                dispatch({
                    type: PARTICIPATION_EXISTS,
                    payload: "Donor already Participating"
                });

            } else {
                dispatch({
                    type: PARTICIPATION_NOT_EXISTS,
                    payload: "Donor Not Participating"
                });
                dispatch(addParticipant(payRec, donTyp, totDon, droTim, notes, donId, colId, whoId))
            }
                
        } catch (err) {
            dispatch({
                type: PARTICIPATION_NOT_EXISTS,
                payload: err
            });
        }
    } else {
        dispatch({
            type: PARTICIPATION_NOT_EXISTS
        });
    }
};

// UPDATE DONOR

export const updateDonor = (donorId) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}searchdonors?page=1&per_page=15&donid=${donorId}`, config)
            dispatch({
                type: DONOR_ID_SEARCH_SUCCESS
            });

            let involveNo = parseInt(res.data.data[0].InvolveNo)+1
            
            const body = {
                "DonorID": `${res.data.data[0].DonorID}`,
                "FullName": `${res.data.data[0].FullName}`,
                "FirstName": `${res.data.data[0].FirstName}`,
                "LastName": `${res.data.data[0].LastName}`,
                "Email": `${res.data.data[0].Email}`,
                "Address1": `${res.data.data[0].Address1}`,
                "Address2": `${res.data.data[0].Address2}`,
                "PostCode": `${res.data.data[0].PostCode}`,
                "DonorType": `${res.data.data[0].DonorType}`,
                "Notes": `${res.data.data[0].Notes}`,
                "Phone": `${res.data.data[0].Phone}`,
                "InvolveNo": `${involveNo}`,
                "Volunteer": `${res.data.data[0].Volunteer}`
            };
    
            try {
                const res = await axios.put(`${process.env.REACT_APP_API}donor`, body, config);
                dispatch({
                    type: EDIT_DONOR_SUCCESS,
                    payload: res.data
                });
                
            } catch (err) {
                dispatch({
                    type: EDIT_DONOR_FAIL
                });
                dispatch(alert('Failed'));
            }
        } catch (err) {
            dispatch({
                type: DONOR_ID_SEARCH_FAIL
            })
        }
    } else {
        dispatch({
            type: EDIT_DONOR_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// UPDATE WHOLESALE

export const updateWholesale = (CollectionID, wholesaleID, newDonationVal) => async dispatch => {

    if (localStorage.getItem('token')){
        const conf = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}searchwholesale?collid=${CollectionID}`, conf)
            dispatch({
                type: WHOLESALE_ID_SUCCESS
            });
            let currentTotal = parseFloat(res.data[0].TotalDonated) + parseFloat(newDonationVal);
            let remainder = currentTotal - parseFloat(res.data[0].TotalSpent);

            const config ={
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                }
            };
            
            const body = {
                "WholesaleID": parseInt(wholesaleID),
                "TotalDonated": parseFloat(currentTotal).toFixed(2),
                "TotalSpent": parseFloat(res.data[0].TotalSpent).toFixed(2),
                "Remainder": parseFloat(remainder).toFixed(2),
                "WholesaleReceipt": `${res.data[0].WholesaleReceipt}`,
                "Notes": `${res.data[0].Notes}`,
                "CollectionID": parseInt(res.data[0].CollectionID)
            };
            try {
                const res = await axios.put(`${process.env.REACT_APP_API}wholesale`, body, config);
                dispatch({
                    type: EDIT_WHOLESALE_SUCCESS,
                    payload: res.data
                });
            } catch (err) {
                dispatch({
                    type: EDIT_WHOLESALE_FAIL,
                    payload: err
                });
                dispatch(alert('Failed'));
            }

        } catch (err) {
            dispatch({
                type: WHOLESALE_ID_FAIL
            });
        }
        
    } else {
        dispatch({
            type: EDIT_WHOLESALE_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};


// ADD PARTICIPANTS

export const addParticipant  = (payRec, donTyp, totDon, droTim, notes, donId, colId, whoId) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "ParticipationID":null,
            "PaymentRecieved":`${payRec}`,
            "DonationType":`${donTyp}`,
            "TotalDonated":`${totDon}`,
            "DropOffTime":`${droTim}`,
            "Notes":`${notes}`,
            "DonorID":`${donId}`,
            "CollectionID":`${colId}`,
            "WholesaleID":`${whoId}`
        };
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}participants`, body, config);
            dispatch({
                type: ADD_PARTICIPATION_SUCCESS,
                payload: res.data
            });
            dispatch(updateDonor(donId));
            if (payRec === "true" | payRec === true){ 
                dispatch(updateWholesale(colId, whoId, totDon));
            };
        } catch (err) {
            dispatch({
                type: ADD_PARTICIPATION_FAIL
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: ADD_PARTICIPATION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// EDIT PARTICIPANTS

export const editParticipant = (CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, Notes, WholesaleID, OriginalPaymentRecieved, page, perPage, type, searchInput) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "ParticipationID":`${ParticipantID}`,
            "PaymentRecieved":`${PaymentRecieved}`,
            "DonationType":`${DonationType}`,
            "TotalDonated":`${TotalDonated}`,
            "DropOffTime":`${DropOffTime}`,
            "Notes":`${Notes}`,
            "DonorID":`${DonorID}`,
            "CollectionID":`${CollectionID}`,
            "WholesaleID":`${WholesaleID}`
        };

        let donChange = parseFloat(DonationChange);
        
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}participants`, body, config);
            dispatch({
                type: EDIT_PARTICIPATION_SUCCESS,
                payload: res.data
            });

            dispatch(getParticipantList(page, perPage, CollectionID, searchInput, type));

            if (DonationType === "3") {
                if (OriginalPaymentRecieved === PaymentRecieved) {
                    if ((PaymentRecieved === "true" || PaymentRecieved === true) && donChange !== 0.0) {
                        dispatch(updateWholesale(CollectionID, WholesaleID, donChange));                    
                    }
                } else if (OriginalPaymentRecieved != PaymentRecieved) {
                    if (PaymentRecieved === "true" | PaymentRecieved === true) {
                        let totDonated = parseFloat(TotalDonated);
                        dispatch(updateWholesale(CollectionID, WholesaleID, totDonated));
                    } else if ((PaymentRecieved === "false" || PaymentRecieved === false) && donChange === 0.0) {
                        let removeDonation = -parseFloat(TotalDonated);
                        dispatch(updateWholesale(CollectionID, WholesaleID, removeDonation));         
                    } else if ((PaymentRecieved === "false" || PaymentRecieved === false) && donChange !== 0.0) {
                        let removeDonation = -(parseFloat(TotalDonated) - donChange)
                        dispatch(updateWholesale(CollectionID, WholesaleID, removeDonation));                    
                    }
                }
            }
            
            
        } catch (err) {
            dispatch({
                type: EDIT_PARTICIPATION_FAIL,
                payload: err
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: EDIT_PARTICIPATION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// EDIT PARTICIPANTS STATUS

export const editParticipantStatus = (CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DropOffTime, Notes, WholesaleID, page, perPage, FullName, Type) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "ParticipationID":`${ParticipantID}`,
            "PaymentRecieved":`${PaymentRecieved}`,
            "DonationType":`${DonationType}`,
            "TotalDonated":`${TotalDonated}`,
            "DropOffTime":`${DropOffTime}`,
            "Notes":`${Notes}`,
            "DonorID":`${DonorID}`,
            "CollectionID":`${CollectionID}`,
            "WholesaleID":`${WholesaleID}`
        };
    
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}participants`, body, config);
            dispatch({
                type: EDIT_PARTICIPATION_SUCCESS,
                payload: res.data
            });
            dispatch(getParticipantList(page, perPage, CollectionID, FullName, Type));
        } catch (err) {
            dispatch({
                type: EDIT_PARTICIPATION_FAIL,
                payload: err
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: EDIT_PARTICIPATION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// UPDATE WHOLESALE (DELETE)

export const updateWholesaleDelete = (collectionID, wholesaleID, DonationVal) => async dispatch => {

    if (localStorage.getItem('token')){
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}searchwholesale?collid=${collectionID}`, config)
            dispatch({
                type: WHOLESALE_ID_SUCCESS
            });
            let currentTotal = parseFloat(res.data[0].TotalDonated) - parseFloat(DonationVal);
            let remainder = currentTotal - parseFloat(res.data[0].TotalSpent);

            const body = {
                "WholesaleID": parseInt(wholesaleID),
                "TotalDonated": parseFloat(currentTotal).toFixed(2),
                "TotalSpent": parseFloat(res.data[0].TotalSpent).toFixed(2),
                "Remainder": parseFloat(remainder).toFixed(2),
                "WholesaleReceipt": `${res.data[0].WholesaleReceipt}`,
                "Notes": `${res.data[0].Notes}`,
                "CollectionID": parseInt(res.data[0].CollectionID)
            };
            try {
                const res = await axios.put(`${process.env.REACT_APP_API}wholesale`, body, config);
                dispatch({
                    type: EDIT_WHOLESALE_SUCCESS,
                    payload: res.data
                });
            } catch (err) {
                dispatch({
                    type: EDIT_WHOLESALE_FAIL
                });
                dispatch(alert('Failed'));
            }

        } catch (err) {
            dispatch({
                type: WHOLESALE_ID_FAIL
            });
        }
        
    } else {
        dispatch({
            type: EDIT_WHOLESALE_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

// DELETE PARTICIPANTS

export const deleteParticipant = (participantID, DonationType, DonationVal, PaymentRecieved, collectionID, wholesaleID, page, perPage, searchInput, type) => async dispatch => {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}participants/${participantID}`, config);
            dispatch({
                type: DELETE_PARTICIPATION_SUCCESS,
                payload: res.data
            });
            if (DonationType === "3") { 
                if (PaymentRecieved === "true" | PaymentRecieved === true) {
                    dispatch(updateWholesaleDelete(collectionID, wholesaleID, DonationVal));
                    dispatch(getParticipantList(page, perPage, collectionID, searchInput, type));
                } else {
                    dispatch(getParticipantList(page, perPage, collectionID, searchInput, type));
                }
            } else {
                dispatch(getParticipantList(page, perPage, collectionID, searchInput, type));
            }
            
        } catch (err) {
            dispatch({
                type: DELETE_PARTICIPATION_FAIL
            });
            dispatch(alert('Delete Fail'));
        }
    } else {
        dispatch({
            type: DELETE_PARTICIPATION_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};

