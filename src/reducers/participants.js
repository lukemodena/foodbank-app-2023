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
    PARTICIPATION_LIST_SUCCESSFUL,
    PARTICIPATION_LIST_FAIL
} from '../actions/types';

import { cmp } from '../Components/common/cmpFunc';

const initialState = { 
    pars: [],
    parsList: [
        {
            "ParticipationID": "N/A",
            "DonorID": "N/A",
            "WholesaleID": "N/A",
            "CollectionID": "N/A",
            "FullName": "N/A",
            "Email": "N/A",
            "Phone": "N/A",
            "Notes": "N/A",
            "Address1": "N/A",
            "Address2": "",
            "PostCode": "",
            "DonationType": "N/A",
            "TotalDonated": "N/A",
            "DropOffTime": "N/A",
            "PaymentRecieved": "N/A"
        }
    ],
    partresult:"",
    result:"",
    isAuthenticated: null,
    currentPage: null,
    has_next: false,
    has_previous: false,
    total_number: null,
    parTotalLength: null,
    postcodeOrder: [],
    stats: []
};
// eslint-disable-next-line
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case PARTICIPATION_LIST_SUCCESSFUL:
            // let order = payload.routeData.sort((a, b) => {
            //     if (a.DonorID.PostCode > b.DonorID.PostCode) { return 1; }
            //     if (b.DonorID.PostCode > a.DonorID.PostCode) { return -1; }
            //     return 0;
            //     });

            let order = payload.routeData.sort((a, b) => {
                return cmp(
                    [cmp(a.PaymentRecieved, b.PaymentRecieved), cmp(parseInt(a.DonorID.PostCode), parseInt(b.DonorID.PostCode))],
                    [cmp(b.PaymentRecieved, a.PaymentRecieved), cmp(parseInt(b.DonorID.PostCode), parseInt(a.DonorID.PostCode))]
                );
            });
            
            return {
                ...state,
                parsList: payload.data,
                currentPage: payload.page.current,
                has_next: payload.page.has_next,
                has_previous: payload.page.has_previous,
                total_number: payload.page.total_number,
                partresult: "Participants found successfully",
                parTotalLength: payload.page.parTotalLength,
                postcodeOrder: order,
                stats: payload.stats
            }

        case PARTICIPATION_LIST_FAIL:
            return {
                ...state,
                parsList: [],
                partresult: "Participants not found successfully"
            }

        case PARTICIPATION_SUCCESS:
            return {
                ...state,
                pars: payload
            }

        case PARTICIPATION_FAIL:
            return {
                ...state,
                pars: []
            }

        case ADD_PARTICIPATION_SUCCESS:
            return {
                ...state,
                partresult:"Participant added successfully to the collection"
            }

        case ADD_PARTICIPATION_FAIL:
            return {
                ...state,
                partresult:"Participant added unsuccessfully to the collection"
            }

        case EDIT_PARTICIPATION_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case EDIT_PARTICIPATION_FAIL:
            return {
                ...state,
                result: payload
            }

        case DELETE_PARTICIPATION_SUCCESS:
            return {
                ...state,
                result: payload
            }

        case DELETE_PARTICIPATION_FAIL:
            return {
                ...state,
                result: payload
            }
        
        case PARTICIPATION_EXISTS:
            return {
                ...state,
                partresult:"Contact Already Participating"
            }
        
        case PARTICIPATION_NOT_EXISTS:
            return {
                ...state,
                result:"Contact not participating"
            }

    default:
        return state;
    }
}