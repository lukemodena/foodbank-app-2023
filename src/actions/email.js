import axios from 'axios';

import {
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAIL
} from './types';

// SEND EMAIL

export const sendEmail = (subject, emailBody, emails) => async dispatch => {

    if (localStorage.getItem('token')){

        
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        
        const body = {
            "Subject":`${subject}`,
            "Body":`${emailBody}`,
            "Emails":emails
        };
    
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}sendemail`, body, config);
            dispatch({
                type: SEND_EMAIL_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: SEND_EMAIL_FAIL
            });
            dispatch(alert('Failed'));
        }
    } else {
        dispatch({
            type: SEND_EMAIL_FAIL
        });
        dispatch(alert('Insufficient Credentials'));
    }
};