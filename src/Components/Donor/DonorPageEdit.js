import React, { useState, useEffect } from 'react';
import {Button, Table, Dropdown, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import { BsPlusLg, BsXCircle } from "react-icons/bs";
import useWindowSize from '../common/useWindow';
import dayjs from 'dayjs';

import { InfoDonorModal } from './MoreInfoModal';
import { AddDonorModal } from "./AddDonModal";
import { EditDonorModal } from './EditDonModal';
import SearchBar from "./SearchBar";
import { SuccessModal } from '../common/SuccessModal';
import { AddParticipationModal } from './AddParticipatingDonorModal';

import { getDonors, searchDonors, deleteDonor, editDonor, deleteDonorsMulti } from '../../actions/donors';
import { getActiveCollection } from '../../actions/collections';
import { getCurrentParticipants } from '../../actions/participation';

// MAIN DONORS PAGE //

const DonorPage = ({ 
    dons, 
    partresult, 
    statusCol, 
    whol, 
    getDonors, 
    searchDonors, 
    deleteDonor,
    editDonor,
    getActiveCollection,
    getCurrentParticipants,
    deleteDonorsMulti
}) => {

    // Set Default States
    const size = useWindowSize(); 
    const [refresh, setRefresh] = useState(null);
    const [monthOptions, setMonthOptions] = useState([
        {
            key: 0,
            type: "All",
            value: "",
            filter: "All Contacts"
        },
        {
            key: 1,
            type: "Monthly",
            value: "1",
            filter: "Monthly Contacts"
        },
        {
            key: 2,
            type: "3 Months",
            value: "3",
            filter: "3 Months Contacts"
        },
        {
            key: 3,
            type: "Other",
            value: "0",
            filter: "Other Contacts"
        }
    ]);
    
    const [monthFilter, setMonthFilter] = useState("All Contacts");
    const [monthValue, setMonthValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [isChecked, setIsChecked] = useState([]);

    // Handle Data Request (Initial + Refresh)

    useEffect(() => {
        getDonors();
        getActiveCollection();
        setRefresh("NO");
      }, []);


    useEffect(() => {
        if (refresh === "YES"){
            getDonors();
            getActiveCollection();
            setRefresh("NO");
            setMonthValue("");
            setMonthFilter("All Contacts");
            setSearchValue("")
            setRefresh("NO");
        } else if (refresh === null) {
            getDonors();
            getActiveCollection();
            setRefresh("NO");
            setMonthValue("");
            setMonthFilter("All Contacts");
            setSearchValue("")
            setRefresh("NO");
        }
      }, []);

    // Modal Handlers
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [infoModalShow, setInfoModalShow] = useState(false);
    const [addParticipationShow, setAddParticipationShow] = useState(false);
    const [successModalShow, setSuccessModalShow] = useState(false);
    const [successDeleteModalShow, setSuccessDeleteModalShow] = useState(false);

    const addModalClose = () => {
        setAddModalShow(false);
        setRefresh("YES");
    };

    const editModalClose = () => {
        setEditModalShow(false);
        setRefresh("YES");
    };

    const infoModalClose = () => {
        setInfoModalShow(false);
        setRefresh("YES");
    };

    const addParticipationClose = () => {
        setAddParticipationShow(false);
        setRefresh("YES");
    };

    const successModalClose = () => {
        setSuccessModalShow(false);
    };

    const successDeleteModalClose = () => {
        setSuccessDeleteModalShow(false);
    };

    // Page Props

    const [donid, setDonid] = useState(null);
    const [donfullname, setDonfullname] = useState(null); 
    const [donfirstname, setDonfirstname] = useState(null); 
    const [donlastname, setDonlastname] = useState(null);
    const [donemail, setDonemail] = useState(null);
    const [donaddress1, setDonaddress1] = useState(null);
    const [donaddress2, setDonaddress2] = useState(`${process.env.REACT_APP_API}media/photos/anonymous.png`);
    const [donpostcode, setDonpostcode] = useState(null);
    const [dondonortype, setDondonortype] = useState(null);
    const [donnotes, setDonnotes] = useState(null);
    const [donphone, setDonphone] = useState(null);
    const [doninvolveno, setDoninvolveno] = useState(null);
    const [collid, setCollid] = useState(null);
    const [colldate, setColldate] = useState(null);
    const [colldateread, setColldateread] = useState(null);
    const [whoid, setWhoid] = useState(null);
    const [type, setType] = useState(null);
    const [isAdd, setIsAdd] = useState(null);
    const [reqStatus, setReqStatus] = useState(null);

    // Donor Month Type Filter

    const handleFilter = (value, filter) => {
        let monthType = value;
        let searchInput = searchValue;
        searchDonors(monthType, searchInput);
        setMonthValue(monthType);
        setMonthFilter(filter);
    };

    // Donor Search

    const handleSearch = (value) => {
        let monthType = monthValue;
        let searchInput = value;

        setSearchValue(searchInput);
        searchDonors(monthType, searchInput);
    };

    // Donor Delete

    const handleDelete = (donId) => {
        if(window.confirm('Are you sure?')){
            deleteDonor(donId);
            setSuccessDeleteModalShow(true);
        }
    };

    // Delete Multiple Donors

    const handleChecked = (e) => {
        const id = e.target.value;

        setIsChecked([...isChecked, id]);
    };
    
        
    const handleDeleteMulti = (e) => {
        e.preventDefault();

        let toDelete = isChecked;
        let length = toDelete.length;

        if (length === 0){
            let message = `Please select the contacts you'd like to delete`;
            window.confirm(message);
        } else {
            let message = `Are you sure you want to delete ${length} record/s?`;
            if(window.confirm(message)){
                deleteDonorsMulti(toDelete);

                setSuccessDeleteModalShow(true);
            }
        }
    };

    // Donor Update

    const handleEditSubmit = (e) => {
        e.preventDefault()
        let fullName = e.target.FirstName.value + " " + e.target.LastName.value;

        let donorId = e.target.DonorID.value;
        let firstName = e.target.FirstName.value;
        let lastName = e.target.LastName.value;
        let email = e.target.Email.value;
        let address1 = e.target.Address1.value;
        let address2 = e.target.Address2.value;
        let postCode = e.target.PostCode.value.toUpperCase();
        let donorType = `${e.target.DonorType.value}${e.target.Volunteer.value}`;
        let notes = e.target.Notes.value;
        let phone = e.target.Phone.value;
        let involveNo = e.target.InvolveNo.value;

        editDonor(donorId, fullName, firstName, lastName, email, address1, address2, postCode, donorType, notes, phone, involveNo);
        setSuccessModalShow(true);
    };

    // Add Participant

    const handleAddParticipant = (CollectionID, DonorID, PaymentRecieved, DonationType, TotalDonated, DropOffTime, WholesaleID) => {
    
        let colId = CollectionID;
        let donId = DonorID;
        let payRec = PaymentRecieved;
        let donTyp = DonationType;
        let totDon = TotalDonated;
        let droTim = DropOffTime;
        let whoId = WholesaleID;

        let CollID = colId;
        let DonID = donId;

        // Checks if Donor already Participant in collection, 
        // - If yes, new participant is not added 
        // - if no, new participant is added + if cash donation wholesale is updated
        //console.log(CollID, DonID, payRec, donTyp, totDon, droTim, donId, colId, whoId)
        getCurrentParticipants(CollID, DonID, payRec, donTyp, totDon, droTim, donId, colId, whoId)
        setSuccessModalShow(true);
    };

    // Donor Type

    const handleDonorType = (inputValue) => {
        let donorType = inputValue;

        if (donorType === "1") {
            let type = "Monthly";
            return type
        } else if (donorType === "3") {
            let type = "3 Months";
            return type
        } else if (donorType === "0") {
            let type = "Other";
            return type
        } else if (donorType === "1v") {
            let type = "Monthly (+ Volunteer)";
            return type
        } else if (donorType === "3v") {
            let type = "3 Months (+ Volunteer)";
            return type
        }
    };

    // Collection Date

    const handleCollectionDate = (inputValue) => {
        let dateFormat = dayjs(`${inputValue} T00:00:00`);
        let collectionDate = Intl.DateTimeFormat('en-GB', {  month: "short", day: "numeric", year: "numeric" }).format(dateFormat);

        return collectionDate
    };

    return(
        <div style={{paddingTop: "38.5px"}}>

            <div style={{margin:"auto"}}>
                <Row>

                    {/* Donor Month Type Filter */}

                    <Dropdown className="dropdownFilter">
                        <Dropdown.Toggle className="dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                            {monthFilter}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {monthOptions.map((option) => (
                                <Dropdown.Item key={option.key} onClick={() => handleFilter(option.value, option.filter)} href="#/contacts">{option.type}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Donor Search */}

                    <SearchBar callback={(searchValue) => handleSearch(searchValue)}/>

                    {/* Add New Donor Modal */}

                    <Button variant="secondary" className="addButton"
                    onClick={()=> {setAddModalShow(true);}}>
                        <BsPlusLg className="addButton-Icon"/>
                    </Button>
                    <AddDonorModal show={addModalShow}
                    onHide={addModalClose}/>

                </Row>

                <SuccessModal show={successDeleteModalShow}
                    onHide={successDeleteModalClose}
                    reqStatus={reqStatus}
                    type={type}
                    isAdd={isAdd}
                />

            </div>
            
            {/* Donor Table */}
            <div style={{overflowX:"fixed"}}>

                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            {(size.width > 760) &&<th>
                                <Button className="deleteButton" variant="outline-secondary" onClick={(e) =>
                                    {
                                        setSuccessModalShow(true);
                                        setReqStatus(`Contacts deleted`);
                                        setType("contact");
                                        handleDeleteMulti(e);
                                    }}>
                                    <BsXCircle className='deleteIcon'/>
                                </Button>
                            </th>}
                            {(size.width > 760) &&<th>ID</th>}
                            <th>Options</th>
                            <th>Name</th>
                            {(size.width > 760) &&<th>Email</th>}
                            {(size.width <= 760) &&<th>Address</th>}
                            {(size.width > 760) &&<th>Address 1</th>}
                            {(size.width > 760) &&<th>Address 2</th>}
                            {(size.width > 760) &&<th>Postcode</th>}
                            {(size.width > 760) &&<th>Type</th>}
                            {(size.width > 760) &&<th>Notes</th>}
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dons.map((don)=>
                            <tr key={don.DonorID}>
                                {(size.width > 760) &&<td><input type="checkbox" value={don.DonorID} checked={don.isChecked} onChange={(e) => handleChecked(e)}/></td>}
                                {(size.width > 760) &&<td>{don.DonorID}</td>}
                                <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        ...
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>

                                        {/* Edit Donor Modal */}

                                        <Dropdown.Item
                                            onClick={()=>{
                                                setInfoModalShow(true);
                                                setDonid(don.DonorID);
                                                setDonfullname(don.FullName);
                                                setDonfirstname(don.FirstName);
                                                setDonlastname(don.LastName);
                                                setDonemail(don.Email);
                                                setDonaddress1(don.Address1);
                                                setDonaddress2(don.Address2);
                                                setDonpostcode(don.PostCode);
                                                setDondonortype(handleDonorType(don.DonorType));
                                                setDonnotes(don.Notes);
                                                setDonphone(don.Phone);
                                                setDoninvolveno(don.InvolveNo);
                                            }}
                                        >
                                            More Information
                                        </Dropdown.Item>
                                        <InfoDonorModal 
                                        show={infoModalShow}
                                        onHide={infoModalClose}
                                        donfullname={donfullname}
                                        donemail={donemail}
                                        donaddress1={donaddress1}
                                        donaddress2={donaddress2}
                                        donpostcode={donpostcode}
                                        dondonortype={dondonortype}
                                        donnotes={donnotes}
                                        donphone={donphone}
                                        doninvolveno={doninvolveno}
                                        />

                                        <Dropdown.Item
                                            onClick={()=>{
                                                setEditModalShow(true);
                                                setDonid(don.DonorID);
                                                setDonfullname(don.FullName);
                                                setDonfirstname(don.FirstName);
                                                setDonlastname(don.LastName);
                                                setDonemail(don.Email);
                                                setDonaddress1(don.Address1);
                                                setDonaddress2(don.Address2);
                                                setDonpostcode(don.PostCode);
                                                setDondonortype(don.DonorType);
                                                setDonnotes(don.Notes);
                                                setDonphone(don.Phone);
                                                setDoninvolveno(don.InvolveNo);
                                                setSuccessModalShow(false);
                                                setReqStatus(`${don.FullName} saved`);
                                                setType("contact");
                                                setIsAdd(false);
                                            }}
                                        >
                                            Edit
                                        </Dropdown.Item>

                                        <EditDonorModal show={editModalShow}
                                        onHide={editModalClose}
                                        edit={handleEditSubmit}
                                        donid={donid}
                                        donfirstname={donfirstname}
                                        donlastname={donlastname}
                                        donfullname={donfullname}
                                        donemail={donemail}
                                        donaddress1={donaddress1}
                                        donaddress2={donaddress2}
                                        donpostcode={donpostcode}
                                        dondonortype={dondonortype}
                                        donnotes={donnotes}
                                        donphone={donphone}
                                        doninvolveno={doninvolveno}
                                        successModalShow={successModalShow}
                                        successModalClose={successModalClose}
                                        reqStatus={reqStatus}
                                        type={type}
                                        isAdd={isAdd}
                                        />

                                        {/* Add to Participation List */}

                                        <Dropdown.Item onClick={() => 
                                            {
                                                setAddParticipationShow(true);
                                                setCollid(statusCol[0].CollectionID);
                                                setWhoid(whol[0].WholesaleID);
                                                setColldate(statusCol[0].CollectionDate);
                                                setType("partdonor");
                                                setIsAdd(null);
                                                setDonid(don.DonorID);
                                                setDonfullname(don.FullName);
                                                setColldateread(handleCollectionDate(statusCol[0].CollectionDate));
                                            }
                                        }
                                        >
                                            Add to Participant List
                                        </Dropdown.Item>
                                        <AddParticipationModal show={addParticipationShow}
                                        onHide={addParticipationClose}
                                        addpart={handleAddParticipant}
                                        collid={collid}
                                        whoid={whoid}
                                        colldate={colldate}
                                        successModalShow={successModalShow}
                                        successModalClose={successModalClose}
                                        reqStatus={partresult}
                                        type={type}
                                        isAdd={isAdd}
                                        donid={donid}
                                        donfullname={donfullname}
                                        colldateread= {colldateread}
                                        />

                                        {/* Delete Donor */}

                                        <Dropdown.Item
                                            onClick={()=>  
                                                {
                                                    setSuccessDeleteModalShow(false);
                                                    setReqStatus(`${don.FullName} deleted`);
                                                    setType("contact");
                                                    setIsAdd(false);
                                                    handleDelete(don.DonorID);
                                                } 
                                            }
                                        >
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </td>
                                <td>{don.FullName}</td>
                                {(size.width > 760) &&<td>{don.Email}</td>}
                                {(size.width <= 760) &&<td>
                                        {don.Address1} <br />
                                        {don.Address2} <br />
                                        {don.PostCode}
                                </td>}
                                {(size.width > 760) &&<td>{don.Address1}</td>}
                                {(size.width > 760) &&<td>{don.Address2}</td>}
                                {(size.width > 760) &&<td>{don.PostCode}</td>}
                                {(size.width > 760) &&<td>{handleDonorType(don.DonorType)}</td>}
                                {(size.width > 760) &&<td>{don.Notes}</td>}
                                <td>{don.Phone}</td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

// Reducer

const mapStateToProps = (state) => ({
    dons: state.donors.dons,
    partresult: state.participants.partresult,
    statusCol: state.collections.statusCol,
    whol: state.wholesale.whol
});

export default connect(mapStateToProps, { getDonors, searchDonors, deleteDonor, editDonor, getActiveCollection, getCurrentParticipants, deleteDonorsMulti })(DonorPage)
