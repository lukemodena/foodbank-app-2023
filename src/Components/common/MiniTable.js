import React, { useState } from 'react';
import {Table, Dropdown} from 'react-bootstrap';
import { handleLoadStyle } from '../common/handleLoadStyle';
import ClipLoader from 'react-spinners/ClipLoader';
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { Bounce } from '../common/bounce';

import { PaginationFooter } from '../common/Pagination';

import { handleParticipantType } from '../common/typeFuncs';
import { participantOptions, handleParticipantPayment, recievedOptions } from '../common/miscObjects';



export const MiniTable = ({
    parsList,
    collid,
    getParticipantList,
    par_currentPage,
    par_has_next,
    par_has_previous,
    par_total_number,
    size
}) => {
    
    // Set Default States

    const [typeValue, setTypeValue] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState("1");
    const par_pageData = "par";
    const par_perPage = "5";
    const modal = true
    const [parLoading, setParLoading] = useState(false);
    const [paymentRecievedVal, setPaymentRecievedVal] = useState("");
    const [paymentRecievedFil, setPaymentRecievedFil] = useState("Both");

    // Participant Type Filter

    const handleTypeFilter = (value, filter) => {
        setParLoading(true);
        let filtPage = "1";
        setParPage(filtPage);
        
        getParticipantList(filtPage, par_perPage, collid, searchValue, value, paymentRecievedVal).then(() => setParLoading(false));
        console.log(paymentRecievedVal)
        setTypeValue(value);
        setTypeFilter(filter);
    };

    // Participant Recieved Filter

    const handleRecievedFilter = (value, filter) => {
        let isRec = value;
        setParLoading(true);
        let filtPage = "1";
        setParPage(filtPage);
        
        getParticipantList(filtPage, par_perPage, collid, searchValue, typeValue, isRec).then(() => setParLoading(false));

        setPaymentRecievedVal(isRec);
        setPaymentRecievedFil(filter);
    };


    return (
        <div>
            <Dropdown style={{paddingTop:"10px", paddingBottom:"0px"}}>
                <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic">
                {typeFilter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {participantOptions.map((option) => (
                        <Dropdown.Item key={option.key} onClick={() => handleTypeFilter(option.value, option.filter)}>{option.type}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown style={{paddingTop:"10px", paddingBottom:"0px"}}>
                <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic">
                            {(paymentRecievedFil === "Both") &&<>Both</>}
                            {(paymentRecievedFil === "Recieved") &&<BsCheckLg />}
                            {(paymentRecievedFil === "Not Recieved") &&<BsXLg />}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {recievedOptions.map((option) => (
                                <Dropdown.Item key={option.key} onClick={() => handleRecievedFilter(option.value, option.filter)}>{option.type}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
            </Dropdown>
            {parLoading ? 
            <div className="mt-4" style={handleLoadStyle(size.width, modal)}>
                <div className="loader-container">
                    <ClipLoader color={'#000000'} size={150} />
                </div> 
            </div>
            : 
            <div style={{overflowX:"fixed"}}>
                <Table style={{paddingTop:"0px"}} className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            {(typeValue === "" || typeValue === "notRecieved") &&<th>Donation Type</th>}
                            {(typeValue === "3") &&<th>Amount</th>}
                            <th>Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parsList.map((par)=>
                                <tr key={par.ParticipationID}>
                                    <td>{par.DonorID.FullName} {Bounce(par.Notes)}</td>
                                    {(typeValue === "" || typeValue === "notRecieved") &&<td>{handleParticipantType(par.DonationType)}</td>}
                                    {(typeValue === "3") &&<td>£{par.TotalDonated}</td>}
                                    <td>{handleParticipantPayment(par.PaymentRecieved)}</td>
                                </tr>)}
                    </tbody>
                </Table>
                <PaginationFooter 
                data={par_pageData}
                monthValue={null}
                searchValue={searchValue}
                typeValue={typeValue}
                collectionID={collid}
                startDate={null}
                endDate={null}
                pageStatus={null}
                currentPage={par_currentPage}
                setPage={setParPage}
                page={parPage}
                perPage={par_perPage}
                setLoading={setParLoading}
                searchDonors={null}
                searchCollections={null}
                getParticipantList={getParticipantList}
                has_previous={par_has_previous}
                has_next={par_has_next}
                total_number={par_total_number}/>
            </div>}
        </div>
    )

}
