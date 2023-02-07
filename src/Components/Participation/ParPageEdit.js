import React, { useState, useEffect } from 'react';
import {Table, Dropdown, Row, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import useWindowSize from '../common/useWindow';
import { handleLoadStyle } from '../common/handleLoadStyle';
import ClipLoader from 'react-spinners/ClipLoader';

import { EditParticipationModal } from './EditParticipationModal';
import SearchBar from './SearchBar';
import { SuccessModal } from '../common/SuccessModal';
import { handleCollectionDate } from '../common/dateFuncs';
import { handleParticipantType, handleDropOffTime } from '../common/typeFuncs';
import { participantOptions, handleParticipantPayment, collectionDateSelection } from '../common/miscObjects';

import { getCollections } from '../../actions/collections';
import { getParticipantList, editParticipant, deleteParticipant, getCurrentParticipants, editParticipantStatus } from '../../actions/participation';
import { getWholesale } from '../../actions/wholesale';

// PARTICIPANTS PAGE //

const ParticipationPage = ({parsList, colls, getCollections, getParticipantList, deleteParticipant, editParticipant, getCurrentParticipants, editParticipantStatus, getDonors, getWholesale, whol, activeId}) => {
    
    // Set Default States
    
    const size = useWindowSize(); 
    const [refresh, setRefresh] = useState(null);
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
    const [loading, setLoading] = useState(true)

    // Handle Data Request (Initial + Refresh)

    useEffect(() => {
        
        let collection = collectionID;
        let searchInput = searchValue;
        let type = typeValue;
        let collPage = "all";
        let collStatus = "";
        setCollectionDate(collectionDateSelection(size.width));
        setLoading(true);
        
        getParticipantList(collection, searchInput, type).then(() => setLoading(false));
        getCollections(collPage, collStatus);
        setRefresh("NO");
        setShowAddButton(true);
      }, []);


    useEffect(() => {
        if (refresh === "YES"){
            
            let collection = collectionID;
            let searchInput = searchValue;
            let type = typeValue;
            let collPage = "all";
            let collStatus = "";
            setCollectionDate(collectionDateSelection(size.width))
            setLoading(true);

            getParticipantList(collection, searchInput, type).then(() => setLoading(false));
            getWholesale(collection)
            //getDonors();
            getCollections(collPage, collStatus);
            setRefresh("NO");
        } else if (refresh === null) {
            
            let collection = collectionID;
            let searchInput = searchValue;
            let type = typeValue;
            let collPage = "all";
            let collStatus = "";
            setLoading(true);

            getParticipantList(collection, searchInput, type).then(() => setLoading(false));
            getCollections(collPage, collStatus);
            //getDonors();
            setRefresh("NO");
            setShowAddButton(true);
        }
      }, []);

    // Modal Handlers

    const [editParticipationShow, setEditParticipationShow] = useState(false);
    const [successModalShow, setSuccessModalShow] = useState(false);
    const [successDeleteModalShow, setSuccessDeleteModalShow] = useState(false);

    const editParticipationClose = () => {
        setEditParticipationShow(false);
        setRefresh("YES");
        console.log(refresh)
    };

    const successModalClose = () => {
        setSuccessModalShow(false);
        console.log(refresh)
    };

    const successDeleteModalClose = () => {
        setSuccessDeleteModalShow(false);
        console.log(refresh)
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
    const [donaddress1, setDonaddress1] = useState(null);
    const [donaddress2, setDonaddress2] = useState(null);
    const [donpostcode, setDonpostcode] = useState(null);
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
        setLoading(true);

        getWholesale(collection);
        getParticipantList(collection, searchInput, type).then(() => setLoading(false));
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

        console.log(parsList.reduce((a,v) =>  a = a + parseFloat(v.TotalDonated) , 0 ))
        
        getParticipantList(collection, searchInput, type).then(() => setLoading(false));

        setTypeValue(type);
        setTypeFilter(filter);
    };

    // Edit Participant

    const handleEditParticipant = (CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, Notes, WholesaleID) => {
        let type = typeValue;
        let searchInput = searchValue;
        editParticipant(CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, Notes, WholesaleID, type, searchInput)
        setSuccessModalShow(true);
    };

    // Participant Delete

    const handleDelete = (parId, parTotDon, collId, wholId) => {
        if(window.confirm('Are you sure?')){
            let searchInput = searchValue;
            let type = typeValue
            deleteParticipant(parId, parTotDon, collId, wholId, searchInput, type);
            setSuccessDeleteModalShow(true);
        }
    };

    // Participation Search

    const handleSearch = (searchVal) => {
        let collection = collectionID;
        let searchInput = searchVal;
        setSearchValue(searchInput);
        let type = typeValue;
        getParticipantList(collection, searchInput, type);
    };

    // Recieve Handle

    const changeRecVal = (e, CollID, DonID, ParID, PayRec, DonTyp, TotDon, DroTim, Notes, WhoID) => {
        e.preventDefault();
        let searchInput = searchValue;
        let type = typeValue;
        
        if (PayRec === "true"){
            let newStatus = "false"
            editParticipantStatus(CollID, DonID, ParID, newStatus, DonTyp, TotDon, DroTim, Notes, WhoID, searchInput, type);
            
        } else if (PayRec === "false"){
            let newStatus = "true"
            editParticipantStatus(CollID, DonID, ParID, newStatus, DonTyp, TotDon, DroTim, Notes, WhoID, searchInput, type);
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
                                                    setDonid(par.DonorID);
                                                    setCollid(par.CollectionID);
                                                    setWhoid(par.WholesaleID);
                                                    setDonfullname(par.FullName);
                                                    setDonemail(par.Email);
                                                    setDonaddress1(par.Address1);
                                                    setDonaddress2(par.Address2);
                                                    setDonpostcode(par.PostCode);
                                                    setDonnotes(par.Notes);
                                                    setDonphone(par.Phone);
                                                    setPardontype(par.DonationType);
                                                    setPartotdon(par.TotalDonated);
                                                    setPartime(par.DropOffTime);
                                                    setParnotes(par.ParticipationNotes);
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
                                                donaddress1={donaddress1}
                                                donaddress2={donaddress2}
                                                donpostcode={donpostcode}
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
                                            checked={(par.PaymentRecieved === 'true')}
                                            onChange={(e) => {changeRecVal(e, par.CollectionID, par.DonorID, par.ParticipationID, par.PaymentRecieved, par.DonationType, par.TotalDonated, par.DropOffTime, par.Notes, par.WholesaleID)}}
                                        />
                                    </td> : null}
                                    <td>{par.FullName}</td>
                                    {(size.width > 760) &&<td>
                                        {par.Address1} <br />
                                        {par.Address2} <br />
                                        {par.PostCode}
                                    </td>}
                                    {(typeValue === "") &&<td>{handleParticipantType(par.DonationType)}</td>}
                                    {(typeValue === "3") &&<td>{handleParticipantPayment(par.PaymentRecieved)}</td>}
                                    {(size.width > 760) &&<td>{par.Email}</td>}
                                    
                                </tr>)}
                    </tbody>
                </Table>
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
});

export default connect(mapStateToProps, { getCollections, getWholesale, getParticipantList, deleteParticipant, editParticipant, getCurrentParticipants, editParticipantStatus })(ParticipationPage)
