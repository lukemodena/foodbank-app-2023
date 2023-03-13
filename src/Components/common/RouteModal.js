import React, { useState } from 'react';
import {Table, Modal, Form, Button} from 'react-bootstrap';
import { handleLoadStyle } from '../common/handleLoadStyle';
import ClipLoader from 'react-spinners/ClipLoader';
import { Bounce } from '../common/bounce';

import { PaginationFooter } from '../common/Pagination';
import dayjs from 'dayjs';

import { handleParticipantType } from '../common/typeFuncs';
import { handleParticipantPayment, fullAddressHandler } from '../common/miscObjects';
import { geocodeByAddress } from 'react-places-autocomplete';


export const RouteModal = ({
    show,
    onHide,
    postcodeOrder,
    size,
    editParticipantStatus,
    geocodeFinder,
    routePlanner,
    geocodeResult
}) => {
    
    // Set Default States

    const [typeValue, setTypeValue] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState("1");
    const par_pageData = "par";
    const par_perPage = "5";
    const modal = true
    const [parRouteLoading, setParRouteLoading] = useState(false);
    const [add1, setAdd1] = useState(null);
    const [add2, setAdd2] = useState(null);
    const [add3, setAdd3] = useState(null);

    // Recieve Handle

    const changeRecVal = (e, CollID, DonID, ParID, PayRec, DonTyp, TotDon, DroTim, Notes, WhoID) => {
        e.preventDefault();
        
        setParRouteLoading(true);
        
        if (PayRec === true){
            let newStatus = "false"
            editParticipantStatus(CollID, DonID, ParID, newStatus, DonTyp, TotDon, DroTim, Notes, WhoID, parPage, par_perPage, searchValue, typeValue).then(() => setParRouteLoading(false));
            
        } else if (PayRec === false){
            let newStatus = "true"
            editParticipantStatus(CollID, DonID, ParID, newStatus, DonTyp, TotDon, DroTim, Notes, WhoID, parPage, par_perPage, searchValue, typeValue).then(() => setParRouteLoading(false));
        };
        
    };

    // Geocode Finder

    const getGeocode = (e, address) => {
        e.preventDefault();

        geocodeFinder(address);
    };

    const createRoute = (e, participants) => {
        e.preventDefault();

        let fulladdress1 = fullAddressHandler(participants[0]['DonorID']['Address1'], participants[0]['DonorID']['Address2'], participants[0]['DonorID']['Address3'], participants[0]['DonorID']['PostCode']);
        let fulladdress2 = fullAddressHandler(participants[1]['DonorID']['Address1'], participants[1]['DonorID']['Address2'], participants[1]['DonorID']['Address3'], participants[1]['DonorID']['PostCode']);
        let fulladdress3 = fullAddressHandler(participants[2]['DonorID']['Address1'], participants[2]['DonorID']['Address2'], participants[2]['DonorID']['Address3'], participants[2]['DonorID']['PostCode']);

        //console.log(dayjs().format())
        routePlanner(fulladdress1, fulladdress2, fulladdress3)
        // geocodeFinder(fulladdress1)
        // .then(setAdd1(geocodeResult));

        // geocodeFinder(fulladdress2)
        // .then(setAdd2(geocodeResult));

        // geocodeFinder(fulladdress3)
        // .then(setAdd3(geocodeResult));
        
        // console.log(add1['lat'], add2['lat'], add3['lat']);
    };




    return (

        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Confirmation
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Button onClick={(e) =>
                        {
                            createRoute(e, postcodeOrder);
                        }}>
                    </Button>
                    {parRouteLoading ? 
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
                                    <th>TEST</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Collected</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {postcodeOrder.map((par)=>
                                        <tr key={par.ParticipationID}>
                                            <td>
                                                <Button onClick={(e) =>
                                                {
                                                    getGeocode(e, fullAddressHandler(par.DonorID.Address1, par.DonorID.Address2, par.DonorID.Address3, par.DonorID.PostCode));
                                                }}>
                                                </Button>
                                            </td>
                                            <td>{par.DonorID.FullName} {Bounce(par.Notes)}</td>
                                            <td>{fullAddressHandler(par.DonorID.Address1, par.DonorID.Address2, par.DonorID.Address3, par.DonorID.PostCode)}</td>
                                            <td>
                                                <Form.Check 
                                                    type="switch"
                                                    id="custom-switch"
                                                    label={handleParticipantPayment(par.PaymentRecieved)}
                                                    checked={(`${par.PaymentRecieved}` === 'true')}
                                                    onChange={(e) => {changeRecVal(e, par.CollectionID, par.DonorID.DonorID, par.ParticipationID, par.PaymentRecieved, par.DonationType, par.TotalDonated, par.DropOffTime, par.Notes, par.WholesaleID)}}
                                                />
                                            </td>
                                            <td>{par.DonorID.Phone}</td>
                                        </tr>)}
                            </tbody>
                        </Table>
                        {/* <PaginationFooter 
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
                        setLoading={setParRouteLoading}
                        searchDonors={null}
                        searchCollections={null}
                        getParticipantList={getParticipantList}
                        has_previous={par_has_previous}
                        has_next={par_has_next}
                        total_number={par_total_number}/> */}
                    </div>}
                </Modal.Body>
                
                <Modal.Footer>

                </Modal.Footer>

            </Modal>
        </div>
    )

}
