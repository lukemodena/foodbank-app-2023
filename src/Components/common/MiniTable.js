import React, { useState, useEffect } from 'react';
import {Table, Dropdown, Row, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import useWindowSize from '../common/useWindow';
import { handleLoadStyle } from '../common/handleLoadStyle';
import ClipLoader from 'react-spinners/ClipLoader';
import { Bounce } from '../common/bounce';

import { PaginationFooter } from '../common/Pagination';

import { handleParticipantType } from '../common/typeFuncs';
import { handleParticipantPayment } from '../common/miscObjects';

import { getParticipantList } from '../../actions/participation';



export const MiniTable = ({
    collectionID,
    parsList,
    getParticipantList
}) => {
    
    // Set Default States
    const [parPage, setParPage] = useState("1");
    const parPerPage= "5";

    const [typeValue, setTypeValue] = useState("");
    
    useEffect(() => {
        
        getParticipantList(parPage, parPerPage, collectionID);
      }, []);


    return (
        <div style={{paddingTop: "38.5px"}}>
            
            {/* Participant Table */}
            
            <div style={{overflowX:"fixed"}}>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            {(typeValue === "") &&<th>Donation Type</th>}
                            {(typeValue === "3") &&<th>Amount</th>}
                            {(typeValue === "3" | typeValue === "1" | typeValue === "4") ?
                            <th>Received</th>
                            :
                            null}
                        </tr>
                    </thead>
                    <tbody>
                        {parsList.map((par)=>
                                <tr key={par.ParticipationID}>
                                    <td>{par.DonorID.FullName} {Bounce(par.Notes)}</td>
                                    {(typeValue === "") &&<td>{handleParticipantType(par.DonationType)}</td>}
                                    {(typeValue === "3") &&<td>£{par.TotalDonated}</td>}
                                    {(typeValue === "3" | typeValue === "1" | typeValue === "4") ?
                                    <td>{handleParticipantPayment(par.PaymentRecieved)}</td>
                                    : 
                                    null}
                                </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )

}
