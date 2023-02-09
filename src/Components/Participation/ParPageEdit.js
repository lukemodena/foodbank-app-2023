import React, { useState, useEffect } from 'react';
import {Pagination, Table, Dropdown, Row, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import useWindowSize from '../common/useWindow';
import { handleLoadStyle } from '../common/handleLoadStyle';
import ClipLoader from 'react-spinners/ClipLoader';

import { EditParticipationModal } from './EditParticipationModal';
import SearchBar from './SearchBar';
import { SuccessModal } from '../common/SuccessModal';
import { handleCollectionDate } from '../common/dateFuncs';
import { handleParticipantType, handleDropOffTime } from '../common/typeFuncs';
import { participantOptions, handleParticipantPayment, collectionDateSelection, fullAddressHandler } from '../common/miscObjects';

import { getCollections } from '../../actions/collections';
import { getParticipantList, editParticipant, deleteParticipant, getCurrentParticipants, editParticipantStatus } from '../../actions/participation';
import { getWholesale } from '../../actions/wholesale';

// PARTICIPANTS PAGE //

const ParticipationPage = ({
    parsList, 
    colls, 
    getCollections, 
    getParticipantList, 
    deleteParticipant, 
    editParticipant, 
    editParticipantStatus, 
    getWholesale, 
    whol, 
    activeId,
    currentPage,
    has_next,
    has_previous,
    total_number
}) => {
    
    // Set Default States
    
    const size = useWindowSize(); 
    const [collectionDate, setCollectionDate] = useState(collectionDateSelection(size.width));
    const [collectionID, setCollectionID] = useState(`${localStorage.getItem('activeId')}`);

    const [value, setValue] = useState("N/A");
    const [donationTypeVal, setDonationTypeVal] = useState(null);
    const [totalDonatedVal, setTotalDonatedVal] = useState("0");
    const [paymentRecievedVal, setPaymentRecievedVal] = useState("false");
    const [showAddButton, setShowAddButton] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [typeValue, setTypeValue] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [page, setPage] = useState("1");
    const [loading, setLoading] = useState(true)

    // Handle Initial Data Request

    useEffect(() => {
        
        let collection = collectionID;
        let searchInput = searchValue;
        let type = typeValue;
        let collPage = "all";
        let collStatus = "";
        setCollectionDate(collectionDateSelection(size.width));
        setLoading(true);
        
        getParticipantList(page, collection, searchInput, type).then(() => setLoading(false));
        getCollections(collPage, collStatus);
        setShowAddButton(true);
      }, []);


    
    // Modal Handlers

    const [editParticipationShow, setEditParticipationShow] = useState(false);
    const [successModalShow, setSuccessModalShow] = useState(false);
    const [successDeleteModalShow, setSuccessDeleteModalShow] = useState(false);

    const editParticipationClose = () => {
        setEditParticipationShow(false);
    };

    const successModalClose = () => {
        setSuccessModalShow(false);
    };

    const successDeleteModalClose = () => {
        setSuccessDeleteModalShow(false);
    };

    // Participation Modal Info Handlers

    const typeChanger = (inputValue) => {
        setDonationTypeVal(inputValue);
    };

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    
    const totDonChange = (inputValue) => {
        setTotalDonatedVal(inputValue);
    };

    const payRecChange = (inputValue) => {
        setPaymentRecievedVal(inputValue);
    };

    // Page Props

    const [parid, setParid] = useState(null);
    const [donid, setDonid] = useState(null); 
    const [whoid, setWhoid] = useState(null); 
    const [collid, setCollid] = useState(null);
    const [colldate, setColldate] = useState(null);
    const [donfullname, setDonfullname] = useState(null);
    const [donemail, setDonemail] = useState(null);
    const [donfulladdress, setDonfulladdress] = useState(null);
    const [donnotes, setDonnotes] = useState(null);
    const [donphone, setDonphone] = useState(null);
    const [pardontype, setPardontype] = useState(null);
    const [partotdon, setPartotdon] = useState(null);
    const [partime, setPartime] = useState(null);
    const [parnotes, setParnotes] = useState(null);
    const [parrec, setParrec] = useState(null);
    const [type, setType] = useState(null);
    const [isAdd, setIsAdd] = useState(null);
    const [reqStatus, setReqStatus] = useState(null);

    // Collection Date Picker

    const handleFilter = (CollectionID, CollectionDate) => {

        let collection = CollectionID;
        let searchInput =searchValue;
        let type = typeValue;
        let filtPage = "1";
        setLoading(true);
        setPage(filtPage);

        getWholesale(collection);
        getParticipantList(filtPage, collection, searchInput, type).then(() => setLoading(false));
        setCollectionDate(CollectionDate);
        setCollectionID(collection);
        setShowAddButton(true);
    };

    // Participant Type Filter

    const handleTypeFilter = (value, filter) => {
        let type = value;
        let collection = collectionID;
        let searchInput = searchValue;
        setLoading(true);
        let filtPage = "1";
        setLoading(true);
        setPage(filtPage);

        console.log(parsList.reduce((a,v) =>  a = a + parseFloat(v.TotalDonated) , 0 ))
        
        getParticipantList(filtPage, collection, searchInput, type).then(() => setLoading(false));

        setTypeValue(type);
        setTypeFilter(filter);
    };

    // Edit Participant

    const handleEditParticipant = (CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, Notes, WholesaleID) => {
        let type = typeValue;
        let searchInput = searchValue;
        setLoading(true);
        editParticipant(CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, Notes, WholesaleID, page, type, searchInput).then(() => setLoading(false));
        setSuccessModalShow(true);
    };

    // Participant Delete

    const handleDelete = (parId, parTotDon, collId, wholId) => {
        if(window.confirm('Are you sure?')){
            let searchInput = searchValue;
            let type = typeValue;
            setLoading(true);
            deleteParticipant(parId, parTotDon, collId, wholId, page, searchInput, type).then(() => setLoading(false));
            setSuccessDeleteModalShow(true);
        }
    };

    // Participation Search

    const handleSearch = (searchVal) => {
        let collection = collectionID;
        let searchInput = searchVal;
        setSearchValue(searchInput);
        let type = typeValue;
        setLoading(true);
        let filtPage = "1";
        setLoading(true);
        setPage(filtPage);
        
        getParticipantList(filtPage, collection, searchInput, type).then(() => setLoading(false));
    };

    // Handle Page

    const handlePage = (inputVal) => {
 
        let prevPage = currentPage;
        let newpage = `${parseInt(prevPage)+parseInt(inputVal)}`;
        setLoading(true);
 
        setPage(newpage);
        getParticipantList(newpage, collectionID, searchValue, typeValue).then(() => setLoading(false));
    };
 
    // Handle Last Page
 
    const handleLastPage = (inputValue) => {
 
        let newpage = inputValue;
        setLoading(true);
 
        setPage(newpage)
        getParticipantList(newpage, collectionID, searchValue, typeValue).then(() => setLoading(false));
    };
 
    // Handle First Page
 
    const handleFirstPage = (inputValue) => {
    
        let newpage = inputValue;
        setLoading(true);
 
        setPage(newpage);
        getParticipantList(newpage, collectionID, searchValue, typeValue).then(() => setLoading(false));
    };
 

    // Recieve Handle

    const changeRecVal = (e, CollID, DonID, ParID, PayRec, DonTyp, TotDon, DroTim, Notes, WhoID) => {
        e.preventDefault();
        let searchInput = searchValue;
        let type = typeValue;
        setLoading(true);
        
        if (PayRec === true){
            let newStatus = "false"
            editParticipantStatus(CollID, DonID, ParID, newStatus, DonTyp, TotDon, DroTim, Notes, WhoID, page, searchInput, type).then(() => setLoading(false));
            
        } else if (PayRec === false){
            let newStatus = "true"
            editParticipantStatus(CollID, DonID, ParID, newStatus, DonTyp, TotDon, DroTim, Notes, WhoID, page, searchInput, type).then(() => setLoading(false));
        };
        
    };

    return (
        <div style={{paddingTop: "38.5px"}}>

            <div style={{margin:"auto"}}>
                <Row>

                    <Dropdown className="participation-dropdownFilter">

                        {/* Collection Filter */}

                        <Dropdown.Toggle className="participation-dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                            {collectionDate}
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{height: "300px", overflowY: "scroll"}}>
                            {colls.map((coll) => (
                                <Dropdown.Item key={coll.CollectionID} onClick={() => handleFilter(coll.CollectionID, coll.CollectionDate)} href="#/participants">{handleCollectionDate(coll.CollectionDate)}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Participant Type Filter */}
                    {(showAddButton === true) &&<Dropdown className="participation-dropdownFilter">

                        <Dropdown.Toggle className="participationType-dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                            {typeFilter}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {participantOptions.map((option) => (
                                <Dropdown.Item key={option.key} onClick={() => handleTypeFilter(option.value, option.filter)} href="#/participants">{option.type}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>}

                    {/* Participant Search */}

                    {(showAddButton === true) &&<SearchBar callback={(searchValue) => handleSearch(searchValue)}/>}

                </Row>

            </div>
            
            {/* Participant Table */}
            {loading ? 
            <div className="mt-4" style={handleLoadStyle(size.width)}>
                <div className="loader-container">
                    <ClipLoader color={'#000000'} size={150} />
                </div> 
            </div>
            : 
            <div style={{overflowX:"fixed"}}>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            {(size.width > 760) &&<th>ID</th>}
                            <th>Options</th>
                            {(typeValue === "1" | typeValue === "4") ?<th>Time</th> : null}
                            {(typeValue === "1" | typeValue === "4") ?<th>Recieved</th> : null}
                            <th>Name</th>
                            {(size.width > 760) &&<th>Address</th>}
                            {(typeValue === "") &&<th>Donation Type</th>}
                            {(typeValue === "3") &&<th>Received</th>}
                            {(size.width > 760) &&<th>Email</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {parsList.map((par)=>
                                <tr key={par.ParticipationID}>
                                    {(size.width > 760) &&<td>{par.ParticipationID}</td>}
                                    <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            ...
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>

                                            {/* Edit Donor Modal */}

                                            <Dropdown.Item onClick={() => {   
                                                    setEditParticipationShow(true);
                                                    setParid(par.ParticipationID);
                                                    setDonid(par.DonorID.DonorID);
                                                    setCollid(par.CollectionID);
                                                    setWhoid(par.WholesaleID);
                                                    setDonfullname(par.DonorID.FullName);
                                                    setDonemail(par.DonorID.Email);
                                                    setDonfulladdress(fullAddressHandler(par.DonorID.Address1, par.DonorID.Address2, par.DonorID.Address3, par.DonorID.PostCode));
                                                    setDonnotes(par.DonorID.Notes);
                                                    setDonphone(par.DonorID.Phone);
                                                    setPardontype(par.DonationType);
                                                    setPartotdon(par.TotalDonated);
                                                    setPartime(par.DropOffTime);
                                                    setParnotes(par.Notes);
                                                    setParrec(par.PaymentRecieved);
                                                    setSuccessModalShow(false);
                                                    setReqStatus(`${par.FullName} from collection on ${collectionDate} saved`);
                                                    setType("participant")
                                                    setIsAdd(false);
                                                    typeChanger(par.DonationType); 
                                                    totDonChange(par.TotalDonated);
                                                    payRecChange(par.PaymentRecieved)}}>
                                                More Information...
                                            </Dropdown.Item>
                                            <EditParticipationModal show={editParticipationShow}
                                                onHide={editParticipationClose}
                                                editpart={handleEditParticipant}
                                                parid={parid}
                                                donid={donid}
                                                collid={collid}
                                                whoid={whoid}
                                                donfullname={donfullname}
                                                donemail={donemail}
                                                donfulladdress={donfulladdress}
                                                donnotes={donnotes}
                                                donphone={donphone}
                                                pardontype={pardontype}
                                                partotdon={partotdon}
                                                partime={partime}
                                                parnotes={parnotes}
                                                parrec={parrec}
                                                value={value}
                                                donationTypeVal={donationTypeVal}
                                                typeChanger={typeChanger}
                                                handleChange={handleChange}
                                                totalDonatedVal={totalDonatedVal}
                                                paymentRecievedVal={paymentRecievedVal}
                                                totDonChange={totDonChange}
                                                payRecChange={payRecChange}
                                                successModalShow={successModalShow}
                                                successModalClose={successModalClose}
                                                reqStatus={reqStatus}
                                                type={type}
                                                isAdd={isAdd}
                                            />
                                            {/* Delete Participant */}

                                            <Dropdown.Item
                                                onClick={()=>{
                                                    setSuccessDeleteModalShow(false);
                                                    setReqStatus(`${par.FullName} from collection on ${collectionDate} deleted`);
                                                    setType("participant");
                                                    setIsAdd(false);
                                                    handleDelete(par.ParticipationID, par.TotalDonated, par.CollectionID, par.WholesaleID)
                                                    }
                                                }
                                            >
                                                Delete
                                            </Dropdown.Item>

                                            <SuccessModal show={successDeleteModalShow}
                                                onHide={successDeleteModalClose}
                                                reqStatus={reqStatus}
                                                type={type}
                                                isAdd={isAdd}
                                            />

                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </td>
                                    {(typeValue === "1" | typeValue === "4") ?<td>{handleDropOffTime(par.DropOffTime)}</td> : null}
                                    {(typeValue === "1" | typeValue === "4") ?<td>
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            label={handleParticipantPayment(par.PaymentRecieved)}
                                            checked={(`${par.PaymentRecieved}` === 'true')}
                                            onChange={(e) => {changeRecVal(e, par.CollectionID, par.DonorID.DonorID, par.ParticipationID, par.PaymentRecieved, par.DonationType, par.TotalDonated, par.DropOffTime, par.Notes, par.WholesaleID)}}
                                        />
                                    </td> : null}
                                    <td>{par.DonorID.FullName}</td>
                                    {(size.width > 760) &&<td>{fullAddressHandler(par.DonorID.Address1, par.DonorID.Address2, par.DonorID.Address3, par.DonorID.PostCode)}</td>}
                                    {(typeValue === "") &&<td>{handleParticipantType(par.DonationType)}</td>}
                                    {(typeValue === "3") &&<td>{handleParticipantPayment(par.PaymentRecieved)}</td>}
                                    {(size.width > 760) &&<td>{par.DonorID.Email}</td>}
                                    
                                </tr>)}
                    </tbody>
                </Table>
                <Pagination style={{justifyContent:"center"}}>
                    {(page != "1") &&<Pagination.First onClick={e => handleFirstPage("1")}/>}
                    {(has_previous) &&<Pagination.Prev onClick={e => handlePage("-1")}/>}
                    <Pagination.Item active>
                        {page}
                    </Pagination.Item>
                    {(has_next) &&<Pagination.Next onClick={e => handlePage("1")}/>}
                    {(page != total_number) &&<Pagination.Last onClick={e => handleLastPage(total_number)}/>}
                </Pagination>
            </div>}
        </div>
    )

}

// Reducer

const mapStateToProps = (state) => ({
    parsList: state.participants.parsList,
    result: state.participants.result,
    colls: state.collections.colls,
    whol: state.wholesale.whol,
    activeId: state.collections.activeId,
    currentPage: state.participants.currentPage,
    has_next: state.participants.has_next,
    has_previous: state.participants.has_previous,
    total_number: state.participants.total_number
});

export default connect(mapStateToProps, { getCollections, getWholesale, getParticipantList, deleteParticipant, editParticipant, getCurrentParticipants, editParticipantStatus })(ParticipationPage)
