import React, { useState } from 'react';
import {Table, Dropdown} from 'react-bootstrap';
import { handleLoadStyle } from '../common/handleLoadStyle';
import ClipLoader from 'react-spinners/ClipLoader';
import { Bounce } from '../common/bounce';

import { PaginationFooter } from '../common/Pagination';

import { handleParticipantType } from '../common/typeFuncs';
import { participantOptions, handleParticipantPayment } from '../common/miscObjects';



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

    // Participant Type Filter

    const handleTypeFilter = (value, filter) => {
        setParLoading(true);
        let filtPage = "1";
        setParLoading(true);
        setParPage(filtPage);
        
        getParticipantList(filtPage, par_perPage, collid, searchValue, value).then(() => setParLoading(false));

        setTypeValue(value);
        setTypeFilter(filter);
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
                                    {(typeValue === "3") &&<td>??{par.TotalDonated}</td>}
                                    {(typeValue === "3" | typeValue === "1" | typeValue === "4") ?
                                    <td>{handleParticipantPayment(par.PaymentRecieved)}</td>
                                    : 
                                    null}
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
