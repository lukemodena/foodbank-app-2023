import React, { useState, useEffect } from 'react';
import {Button, Table, Dropdown, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { BsPlusLg } from "react-icons/bs";
import useWindowSize from '../common/useWindow';


import { AddParticipationModal } from './AddParticipationModal';
import { EditParticipationModal } from './EditParticipationModal';
import SearchBar from './SearchBar';
import { SuccessModal } from '../common/SuccessModal';

import { getDonors } from '../../actions/donors';
import { getCollections, getActiveCollection } from '../../actions/collections';
import { getParticipantList, editParticipant, deleteParticipant, getCurrentParticipants } from '../../actions/participation';
import { getWholesale } from '../../actions/wholesale';

// PARTICIPANTS PAGE //

const ParticipationPage = ({parsList, colls, dons, getCollections, getParticipantList, deleteParticipant, editParticipant, getCurrentParticipants, getDonors, getWholesale, whol, statusCol}) => {
    
    // Set Default States
    
    const size = useWindowSize(); 
    const [refresh, setRefresh] = useState(null);
    const [monthOptions, setMonthOptions] = useState([
        {
            key: 0,
            type: "All",
            value: "",
            filter: "All"
        },
        {
            key: 1,
            type: "Drop-Off",
            value: "1",
            filter: "Drop-Off"
        },
        {
            key: 2,
            type: "Collection",
            value: "2",
            filter: "Collection"
        },
        {
            key: 3,
            type: "Cash Donation",
            value: "3",
            filter: "Cash Donation"
        },
        {
            key: 4,
            type: "Online Order",
            value: "4",
            filter: "Online Order"
        }
    ]);

    const [collectionDate, setCollectionDate] = useState("Select Collection");
    const [collectionID, setCollectionID] = useState("");

    const [value, setValue] = useState(dayjs('2022-04-07 T00:00:00'));
    const [donationTypeVal, setDonationTypeVal] = useState(null);
    const [totalDonatedVal, setTotalDonatedVal] = useState("0");
    const [paymentRecievedVal, setPaymentRecievedVal] = useState("false");
    const [showAddButton, setShowAddButton] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [typeValue, setTypeValue] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");

    // Handle Data Request (Initial + Refresh)

    useEffect(() => {
        getCollections(null);
        getDonors();
        setRefresh("NO");
      }, []);


    useEffect(() => {
        if (refresh === "YES"){
            let collection = collectionID;
            let searchInput = searchValue;
            let type = typeValue;
            getParticipantList(collection, searchInput, type);
            getWholesale(collection)
            getDonors();
            getCollections(null);
            setRefresh("NO");
        } else if (refresh === null) {
            getCollections(null);
            getDonors();
            setRefresh("NO");
        }
      }, []);

    // Modal Handlers

    const [addParticipationShow, setAddParticipationShow] = useState(false);
    const [editParticipationShow, setEditParticipationShow] = useState(false);
    const [successModalShow, setSuccessModalShow] = useState(false);
    const [successDeleteModalShow, setSuccessDeleteModalShow] = useState(false);
    
    const addParticipationClose = () => {
        setAddParticipationShow(false);
        setRefresh("YES");
    };

    const editParticipationClose = () => {
        setEditParticipationShow(false);
        setRefresh("YES");
    };

    const successModalClose = () => {
        setSuccessModalShow(false);
        editParticipationClose(); 
        addParticipationClose();
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
    const [donaddress1, setDonaddress1] = useState(null);
    const [donaddress2, setDonaddress2] = useState(null);
    const [donpostcode, setDonpostcode] = useState(null);
    const [donnotes, setDonnotes] = useState(null);
    const [donphone, setDonphone] = useState(null);
    const [pardontype, setPardontype] = useState(null);
    const [partotdon, setPartotdon] = useState(null);
    const [partime, setPartime] = useState(null);
    const [parrec, setParrec] = useState(null);
    const [type, setType] = useState(null);
    const [isAdd, setIsAdd] = useState(null);
    const [reqStatus, setReqStatus] = useState(null);

    // Collection Date Picker

    const handleFilter = (CollectionID, CollectionDate) => {
        let collection = CollectionID;
        let searchInput =searchValue;
        let type = typeValue;
        getWholesale(collection);
        getParticipantList(collection, searchInput, type);
        setCollectionDate(CollectionDate);
        setCollectionID(collection);
        setShowAddButton(true);
    };

    // Participant Type Filter

    const handleTypeFilter = (value, filter) => {
        let type = value;
        let collection = collectionID;
        let searchInput = searchValue;
        
        getParticipantList(collection, searchInput, type);

        setTypeValue(type);
        setTypeFilter(filter);
    };
       
    // Add Participant

    const handleAddParticipant = (CollectionID, DonorID, PaymentRecieved, DonationType, TotalDonated, DropOffTime, WholesaleID) => {
        
        let colId = CollectionID
        let donId = DonorID
        let payRec = PaymentRecieved
        let donTyp = DonationType
        let totDon = TotalDonated
        let droTim = DropOffTime
        let whoId = WholesaleID

        let CollID = colId
        let DonID = donId

        // Checks if Donor already Participant in collection, 
        // - If yes, new participant is not added 
        // - if no, new participant is added + if cash donation wholesale is updated
        
        getCurrentParticipants(CollID, DonID, payRec, donTyp, totDon, droTim, donId, colId, whoId)
        setSuccessModalShow(true);
        
    };

    // Edit Participant

    const handleEditParticipant = (CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, WholesaleID) => {

        editParticipant(CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, WholesaleID)
        setSuccessModalShow(true);
    };

    // Participant Delete

    const handleDelete = (parId, parTotDon, collId, wholId) => {
        if(window.confirm('Are you sure?')){
            deleteParticipant(parId, parTotDon, collId, wholId);
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

    // Participant Type

    const handleParticipantType = (inputValue) => {
        let participantType = inputValue;

        if (participantType === "0") {
            let type = "N/A"
            return type
        } else if (participantType === "1") {
            let type = "Drop-Off"
            return type
        } else if (participantType === "2") {
            let type = "Collection"
            return type
        } else if (participantType === "3") {
            let type = "Cash Donation"
            return type
        } else if (participantType === "4") {
            let type = "Online Order"
            return type
        } else {
            let type = "N/A"
            return type
        }
    };

    // Participant Payment

    const handleParticipantPayment = (inputValue) => {
        let participantPayment = inputValue;

        if (participantPayment === "true") {
            let recieved = "Yes"
            return recieved
        } else if (participantPayment === "false") {
            let recieved = "No"
            return recieved
        } else {
            let recieved = "N/A"
            return recieved
        }
    };
    
    // Collection Date

    const handleCollectionDate = (inputValue) => {
        let dateFormat = dayjs(`${inputValue} T00:00:00`);
        let collectionDate = Intl.DateTimeFormat('en-GB', {  month: "short", day: "numeric", year: "numeric" }).format(dateFormat);

        return collectionDate
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

                        <Dropdown.Menu>
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
                            {monthOptions.map((option) => (
                                <Dropdown.Item key={option.key} onClick={() => handleTypeFilter(option.value, option.filter)} href="#/participants">{option.type}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>}

                    {/* Participant Search */}

                    <SearchBar callback={(searchValue) => handleSearch(searchValue)}/>

                    {/* Add New Participant Modal */}

                    {(showAddButton === true) &&<Button variant="secondary" className="participant-addButton"
                    onClick={()=>{
                        setAddParticipationShow(true); 
                        setCollid(collectionID); 
                        setWhoid(whol[0].WholesaleID);
                        setColldate(collectionDate);
                        setReqStatus(`Participant for collection on ${collectionDate} saved`);
                        setType("participant");
                        setIsAdd(true)
                    }}>
                        <BsPlusLg className="participant-addButton-Icon"/>
                    </Button>}
                    <AddParticipationModal 
                        show={addParticipationShow}
                        onHide={addParticipationClose}
                        addpart={handleAddParticipant}
                        collid={collid}
                        whoid={whoid}
                        dons={dons}
                        colldate={colldate}
                        successModalShow={successModalShow}
                        successModalClose={successModalClose}
                        reqStatus={reqStatus}
                        type={type}
                        isAdd={isAdd}
                    />

                </Row>

            </div>
            
            {/* Participant Table */}
            <div style={{overflowX:"fixed"}}>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            {(size.width > 760) &&<th>ID</th>}
                            <th>Options</th>
                            <th>Name</th>
                            {(size.width > 760) &&<th>Address</th>}
                            <th>Donation Type</th>
                            {(size.width > 760) &&<th>Payment Recieved</th>}
                            {(size.width > 760) &&<th>Email</th>}
                            {(size.width > 760) &&<th>Phone</th>}
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
                                                    setParid(par.ParticipantID);
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
                                                    setPartime(dayjs(`2022-04-07 T${par.DropOffTime}`));
                                                    setParrec(par.PaymentRecieved);
                                                    setSuccessModalShow(false);
                                                    setReqStatus(`${par.FullName} from collection on ${collectionDate} saved`);
                                                    setType("participant")
                                                    setIsAdd(false);
                                                    typeChanger(par.DonationType); 
                                                    handleChange(dayjs(`2022-04-07 T${par.DropOffTime}`));
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
                                    <td>{par.FullName}</td>
                                    {(size.width > 760) &&<td>
                                        {par.Address1} <br />
                                        {par.Address2} <br />
                                        {par.PostCode}
                                    </td>}
                                    <td>{handleParticipantType(par.DonationType)}</td>
                                    {(size.width > 760) &&<td>{handleParticipantPayment(par.PaymentRecieved)}</td>}
                                    {(size.width > 760) &&<td>{par.Email}</td>}
                                    {(size.width > 760) &&<td>{par.Phone}</td>}
                                    
                                </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )

}

// Reducer

const mapStateToProps = (state) => ({
    parsList: state.participants.parsList,
    result: state.participants.result,
    colls: state.collections.colls,
    dons: state.donors.dons,
    whol: state.wholesale.whol,
    statusCol: state.collections.statusCol,
});

export default connect(mapStateToProps, { getCollections, getWholesale, getParticipantList, deleteParticipant, editParticipant, getCurrentParticipants, getDonors, getActiveCollection })(ParticipationPage)
