import React, { useState } from 'react';
import {Table, Modal, Form, Button} from 'react-bootstrap';
import { handleLoadStyle } from '../common/handleLoadStyle';
import ClipLoader from 'react-spinners/ClipLoader';
import { Bounce } from '../common/bounce';
import { BsMap } from 'react-icons/bs';

import { PaginationFooter } from '../common/Pagination';
import dayjs from 'dayjs';

import { handleParticipantType } from '../common/typeFuncs';
import { handleParticipantPayment, fullAddressHandler } from '../common/miscObjects';
import { geocodeByAddress } from 'react-places-autocomplete';


export const RouteModal = ({
    show,
    onHide,
    postcodeOrder,
    postcodeLength,
    size,
    editParticipantStatus,
    geocodeFinder,
    routePlanner,
    geocodeResult,
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

    // Handle Select Collection Address#

    const [isChecked, setIsChecked] = useState([]);
    const [link, setLink] = useState('https://www.google.com/maps/dir/51.5536862,-0.185989')


    const handleChecked = (e, postCode) => {
        const id = e.target.value;

        let isFound = isChecked.some(element => {
            return element.id === id;
          });
        
        if (isFound) {
            console.log("id found")
            setIsChecked(locs => locs.filter(loc => loc.id !== id))
        } else {
            let checkedLoc = {
                "id": id,
                "postcode": `/${postCode.replace(" ","+")}`
            };
            console.log("id not found")
            setIsChecked([...isChecked, checkedLoc])
        }
        
    };

    const handleCreateRoute = (e) => {
        e.preventDefault();

        let toRoute = isChecked;
        let length = toRoute.length;

        if (length === 0){
            let message = `Please select the destination/s`;
            window.confirm(message);
        } else if (length > 10) {
            let remove = length - 10;
            let message = `You have selected ${length} destinations, please remove ${remove} destination/s`;
            window.confirm(message);
        } else {

            let startLocation = '51.5536862,-0.185989';
            let firstDestination = isChecked[0]['postcode'];

            if (length === 1) {

                setLink(`https://www.google.com/maps/dir/${startLocation}${firstDestination}/`);

            } else if (length === 2) {
                
                let secondDestination = isChecked[1]['postcode'];
                setLink(`https://www.google.com/maps/dir/${startLocation}${firstDestination}${secondDestination}/`);

            } else if (length === 3) {
                
                let secondDestination = isChecked[1]['postcode'];
                let thirdDestination = isChecked[1]['postcode'];
                setLink(`https://www.google.com/maps/dir/${startLocation}${firstDestination}${secondDestination}${thirdDestination}/`);

            } else if (length === 4) {
                
                let secondDestination = isChecked[1]['postcode'];
                let thirdDestination = isChecked[1]['postcode'];
                let fourthDestination = isChecked[1]['postcode'];
                setLink(`https://www.google.com/maps/dir/${startLocation}${firstDestination}${secondDestination}${thirdDestination}${fourthDestination}/`);

            } else if (length === 5) {
                
                let secondDestination = isChecked[1]['postcode'];
                let thirdDestination = isChecked[1]['postcode'];
                let fourthDestination = isChecked[1]['postcode'];
                let fifthDestination = isChecked[1]['postcode'];
                setLink(`https://www.google.com/maps/dir/${startLocation}${firstDestination}${secondDestination}${thirdDestination}${fourthDestination}${fifthDestination}/`);

            } else if (length === 6) {
                
                let secondDestination = isChecked[1]['postcode'];
                let thirdDestination = isChecked[1]['postcode'];
                let fourthDestination = isChecked[1]['postcode'];
                let fifthDestination = isChecked[1]['postcode'];
                let sixthDestination = isChecked[1]['postcode'];
                setLink(`https://www.google.com/maps/dir/${startLocation}${firstDestination}${secondDestination}${thirdDestination}${fourthDestination}${fifthDestination}${sixthDestination}/`);

            } else if (length === 7) {
                
                let secondDestination = isChecked[1]['postcode'];
                let thirdDestination = isChecked[1]['postcode'];
                let fourthDestination = isChecked[1]['postcode'];
                let fifthDestination = isChecked[1]['postcode'];
                let sixthDestination = isChecked[1]['postcode'];
                let sevethDestination = isChecked[1]['postcode'];
                setLink(`https://www.google.com/maps/dir/${startLocation}${firstDestination}${secondDestination}${thirdDestination}${fourthDestination}${fifthDestination}${sixthDestination}${sevethDestination}/`);

            } else if (length === 8) {
                
                let secondDestination = isChecked[1]['postcode'];
                let thirdDestination = isChecked[1]['postcode'];
                let fourthDestination = isChecked[1]['postcode'];
                let fifthDestination = isChecked[1]['postcode'];
                let sixthDestination = isChecked[1]['postcode'];
                let sevethDestination = isChecked[1]['postcode'];
                let eighthDestination = isChecked[1]['postcode'];
                setLink(`https://www.google.com/maps/dir/${startLocation}${firstDestination}${secondDestination}${thirdDestination}${fourthDestination}${fifthDestination}${sixthDestination}${sevethDestination}${eighthDestination}/`);

            } else if (length === 9) {
                
                let secondDestination = isChecked[1]['postcode'];
                let thirdDestination = isChecked[1]['postcode'];
                let fourthDestination = isChecked[1]['postcode'];
                let fifthDestination = isChecked[1]['postcode'];
                let sixthDestination = isChecked[1]['postcode'];
                let sevethDestination = isChecked[1]['postcode'];
                let eighthDestination = isChecked[1]['postcode'];
                let ninthDestination = isChecked[1]['postcode'];
                setLink(`https://www.google.com/maps/dir/${startLocation}${firstDestination}${secondDestination}${thirdDestination}${fourthDestination}${fifthDestination}${sixthDestination}${sevethDestination}${eighthDestination}${ninthDestination}/`);

            } else if (length === 10) {
                
                let secondDestination = isChecked[1]['postcode'];
                let thirdDestination = isChecked[1]['postcode'];
                let fourthDestination = isChecked[1]['postcode'];
                let fifthDestination = isChecked[1]['postcode'];
                let sixthDestination = isChecked[1]['postcode'];
                let sevethDestination = isChecked[1]['postcode'];
                let eighthDestination = isChecked[1]['postcode'];
                let ninthDestination = isChecked[1]['postcode'];
                let tenthDestination = isChecked[1]['postcode'];
                setLink(`https://www.google.com/maps/dir/${startLocation}${firstDestination}${secondDestination}${thirdDestination}${fourthDestination}${fifthDestination}${sixthDestination}${sevethDestination}${eighthDestination}${ninthDestination}${tenthDestination}/`);

            }
            console.log(link)
        }
    }
    

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
                    <a href={link} target="_blank"><Button/></a>
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
                                    <th>
                                        <Button className="deleteButton" variant="outline-secondary" onClick={(e) =>{
                                        handleCreateRoute(e)}}>
                                        <BsMap className='deleteIcon'/>
                                        </Button>
                                    </th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Collected</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {postcodeOrder.map((par)=>
                                        <tr key={par.ParticipationID}>
                                            <td><input type="checkbox" value={par.ParticipationID} checked={par.isChecked} onChange={(e) => handleChecked(e, par.DonorID.PostCode)}/></td>
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
