import React, { useState, useEffect } from 'react';
import {Pagination, Button, Table, Dropdown, Row} from 'react-bootstrap';
import { connect } from 'react-redux';
import { BsPlusLg, BsXCircle, BsEnvelope, BsFillTelephoneFill } from "react-icons/bs";
import ClipLoader from 'react-spinners/ClipLoader';

import useWindowSize from '../common/useWindow';
import { handleLoadStyle } from '../common/handleLoadStyle';

import { InfoDonorModal } from './MoreInfoModal';
import { AddDonorModal } from "./AddDonModal";
import { EditDonorModal } from './EditDonModal';
import { WriteBasicEmail } from '../Email/EmailModal';
import SearchBar from "./SearchBar";
import { SuccessModal } from '../common/SuccessModal';
import { AddParticipationModal } from './AddParticipatingDonorModal';
import { handleCollectionDate } from '../common/dateFuncs';
import { handleDonorType } from '../common/typeFuncs';
import { typeOptions, addressHandler, fullAddressHandler, phoneHandler } from '../common/miscObjects';
import { Bounce } from '../common/bounce';

import { getDonors, searchDonors, searchDonorsEmails, deleteDonor, editDonor, deleteDonorsMulti } from '../../actions/donors';
import { getActiveCollection } from '../../actions/collections';
import { getCurrentParticipants } from '../../actions/participation';
import { sendEmail } from '../../actions/email';

// MAIN DONORS PAGE //

const DonorPage = ({ 
    dons, 
    emails,
    partresult, 
    statusCol, 
    whol, 
    getDonors, 
    searchDonors,
    searchDonorsEmails,
    deleteDonor,
    editDonor,
    getActiveCollection,
    getCurrentParticipants,
    deleteDonorsMulti,
    sendEmail,
    currentPage,
    has_next,
    has_previous,
    total_number,
    total_3months,
    total_monthly,
    total_other
}) => {

    // Set Default States
    const size = useWindowSize(); 
    
    const [monthFilter, setMonthFilter] = useState("All Contacts");
    const [monthValue, setMonthValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [isChecked, setIsChecked] = useState([]);
    const [page, setPage] = useState("1");
    const [loading, setLoading] = useState(true);

    // Handle Initial Data Request

    useEffect(() => {
        let newpage = page
        setLoading(true);
        getDonors(newpage).then(() => setLoading(false));
        getActiveCollection();
      }, []);

    // Modal Handlers
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [infoModalShow, setInfoModalShow] = useState(false);
    const [addParticipationShow, setAddParticipationShow] = useState(false);
    const [emailModalShow, setEmailModalShow] = useState(false);
    const [successModalShow, setSuccessModalShow] = useState(false);
    const [successDeleteModalShow, setSuccessDeleteModalShow] = useState(false);

    const addModalClose = () => {
        setAddModalShow(false);
    };

    const editModalClose = () => {
        setEditModalShow(false);
    };

    const infoModalClose = () => {
        setInfoModalShow(false);
    };

    const addParticipationClose = () => {
        setAddParticipationShow(false);
    };

    const emailModalClose = () => {
        setEmailModalShow(false);
    };

    const successModalClose = () => {
        setSuccessModalShow(false);
    };

    const successDeleteModalClose = () => {
        setSuccessDeleteModalShow(false);
    };

    // Page Props

    const emailPage = "all";
    const [donid, setDonid] = useState(null);
    const [donfullname, setDonfullname] = useState(null); 
    const [donfirstname, setDonfirstname] = useState(null); 
    const [donlastname, setDonlastname] = useState(null);
    const [donemail, setDonemail] = useState(null);
    const [donaddress1, setDonaddress1] = useState(null);
    const [donaddress2, setDonaddress2] = useState(null);
    const [donaddress3, setDonaddress3] = useState(null);
    const [donpostcode, setDonpostcode] = useState(null);
    const [dondonortype, setDondonortype] = useState(null);
    const [donnotes, setDonnotes] = useState(null);
    const [donphone, setDonphone] = useState(null);
    const [doninvolveno, setDoninvolveno] = useState(null);
    const [collid, setCollid] = useState(null);
    const [colldate, setColldate] = useState(null);
    const [colldateread, setColldateread] = useState(null);
    const [whoid, setWhoid] = useState(null);
    const [emaillist, setEmailList] = useState([]);
    const [emaillength, setEmailLength] = useState(null);
    const [emailfullname, setEmailFullName] = useState("");
    const [type, setType] = useState(null);
    const [isAdd, setIsAdd] = useState(null);
    const [reqStatus, setReqStatus] = useState(null);

    // Donor Month Type Filter

    const handleFilter = (value, filter) => {
        let monthType = value;
        let searchInput = searchValue;
        let newpage = "1";
        setLoading(true);
        
        searchDonors(newpage, monthType, searchInput).then(() => setLoading(false));
        setPage(newpage);
        setMonthValue(monthType);
        setMonthFilter(filter);
    };

    // Donor Search

    const handleSearch = (value) => {
        let monthType = monthValue;
        let searchInput = value;
        let newpage = "1";
        setLoading(true);

        setSearchValue(searchInput);
        setPage(newpage);
        searchDonors(newpage, monthType, searchInput).then(() => setLoading(false));
        searchDonorsEmails(emailPage, monthType, searchInput);
        console.log(emails.length)
    };

    // Handle Page

    const handlePage = (inputVal) => {

        let monthType = monthValue;
        let searchInput = searchValue;
        let prevPage = currentPage;
        let newpage = `${parseInt(prevPage)+parseInt(inputVal)}`;
        setLoading(true);

        setPage(newpage);
        searchDonors(newpage, monthType, searchInput).then(() => setLoading(false));
    }

    // Handle Last Page

    const handleLastPage = (inputValue) => {

        let monthType = monthValue;
        let searchInput = searchValue;
        let newpage = inputValue;
        setLoading(true);

        setPage(newpage);
        searchDonors(newpage, monthType, searchInput).then(() => setLoading(false));
    }

    // Handle First Page

    const handleFirstPage = (inputValue) => {
    
            let monthType = monthValue;
            let searchInput = searchValue;
            let newpage = inputValue;
            setLoading(true);

            setPage(newpage);
            searchDonors(newpage, monthType, searchInput).then(() => setLoading(false));
    }

    // Donor Delete

    const handleDelete = (donId) => {
        if(window.confirm('Are you sure?')){
            setLoading(true);
            deleteDonor(donId).then(() => setLoading(false));
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
                setLoading(true)
                deleteDonorsMulti(toDelete).then(() => setLoading(false));

                setSuccessDeleteModalShow(true);
            }
        }
    };

    // Donor Update

    const handleEditSubmit = (e) => {
        e.preventDefault();
        let fullName = e.target.FirstName.value + " " + e.target.LastName.value;

        let donorId = e.target.DonorID.value;
        let firstName = e.target.FirstName.value;
        let lastName = e.target.LastName.value;
        let email = e.target.Email.value;
        let address1 = e.target.Address1.value;
        let address2 = e.target.Address2.value;
        let address3 = e.target.Address3.value;
        let postCode = e.target.PostCode.value.toUpperCase();
        let donorType = `${e.target.DonorType.value}${e.target.Volunteer.value}`;
        let notes = e.target.Notes.value;
        let phone = e.target.Phone.value;
        let involveNo = e.target.InvolveNo.value;

        setLoading(true)
        editDonor(donorId, fullName, firstName, lastName, email, address1, address2, address3, postCode, donorType, notes, phone, involveNo).then(() => setLoading(false));
        setSuccessModalShow(true);
    };

    // Add Participant

    const handleAddParticipant = (CollectionID, DonorID, PaymentRecieved, DonationType, TotalDonated, DropOffTime, Notes, WholesaleID) => {
    
        let colId = CollectionID;
        let donId = DonorID;
        let payRec = PaymentRecieved;
        let donTyp = DonationType;
        let totDon = TotalDonated;
        let droTim = DropOffTime;
        let whoId = WholesaleID;
        let notes = Notes;

        let CollID = colId;
        let DonID = donId;

        // Checks if Donor already Participant in collection, 
        // - If yes, new participant is not added 
        // - if no, new participant is added + if cash donation wholesale is updated
        //console.log(CollID, DonID, payRec, donTyp, totDon, droTim, donId, colId, whoId)
        setLoading(true)
        getCurrentParticipants(CollID, DonID, payRec, donTyp, totDon, droTim, notes, donId, colId, whoId).then(() => setLoading(false));
        setSuccessModalShow(true);
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
                            {typeOptions.map((option) => (
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

                    {/* Send Email Modal */}

                    <Button variant="secondary" className="emailButton"
                    onClick={() => {
                        searchDonorsEmails(emailPage, monthValue, searchValue);
                        setEmailModalShow(true);
                        setEmailList(emails);
                        setEmailLength(emails.length)
                        setEmailFullName(dons[0].FullName)
                        setSuccessModalShow(false);
                        setReqStatus(`Email Sent`);
                        setType("email");
                        setIsAdd(false)
                    }}>
                        <BsEnvelope className="emailButton-Icon"/>
                    </Button>

                    <WriteBasicEmail show={emailModalShow}
                    onHide={emailModalClose}
                    send={sendEmail}
                    emaillist={emails}
                    length={emails.length}
                    fullname = {emailfullname}
                    successModalShow={successModalShow}
                    successModalClose={successModalClose}
                    reqStatus={reqStatus}
                    type={type}
                    isAdd={isAdd}
                    />

                </Row>

                <SuccessModal show={successDeleteModalShow}
                    onHide={successDeleteModalClose}
                    reqStatus={reqStatus}
                    type={type}
                    isAdd={isAdd}
                />

            </div>
            
            {/* Donor Table */}
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
                            <th>Options</th>
                            <th>Name</th>
                            {(size.width > 760) &&<th>Email</th>}
                            {(size.width <= 760) &&<th>Address</th>}
                            {(size.width > 760) &&<th style={{width: "15%"}}>Address 1</th>}
                            {(size.width > 760) &&<th>Address 2 & 3</th>}
                            {/* {(size.width > 760) &&<th>Address 3</th>} */}
                            {(size.width > 760) &&<th>Postcode</th>}
                            {(size.width > 760) &&<th style={{width: "5%"}}>Type</th>}
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dons.map((don)=>
                            <tr key={don.DonorID} style={{height:"50%"}}>
                                {(size.width > 760) &&<td><input type="checkbox" value={don.DonorID} checked={don.isChecked} onChange={(e) => handleChecked(e)}/></td>}
                                <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        ...
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>

                                        {/* More Information Donor Modal */}

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
                                                setDonaddress3(don.Address3);
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
                                        donaddress3={donaddress3}
                                        donpostcode={donpostcode}
                                        dondonortype={dondonortype}
                                        donnotes={donnotes}
                                        donphone={donphone}
                                        doninvolveno={doninvolveno}
                                        />

                                        {/* Edit Donor Modal */}

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
                                                setDonaddress3(don.Address3);
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
                                        donaddress3={donaddress3}
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
                                <td>{don.FullName} {Bounce(don.Notes)}</td>
                                {(size.width > 760) &&<td>{don.Email}</td>}
                                {(size.width <= 760) &&<td>{fullAddressHandler(don.Address1, don.Address2, don.Address3, don.PostCode)}</td>}
                                {(size.width > 760) &&<td>{don.Address1}</td>}
                                {(size.width > 760) &&<td>{addressHandler(don.Address2, don.Address3)}</td>}
                                {/* {(size.width > 760) &&<td>{don.Address3}</td>} */}
                                {(size.width > 760) &&<td>{don.PostCode}</td>}
                                {(size.width > 760) &&<td>{handleDonorType(don.DonorType)}</td>}
                                {(size.width > 760) ? 
                                    <td>{don.Phone}</td>
                                    :
                                    <td>{phoneHandler(don.Phone)}</td>
                                }
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
    dons: state.donors.dons,
    emails: state.donors.emails,
    partresult: state.participants.partresult,
    statusCol: state.collections.statusCol,
    whol: state.wholesale.whol,
    currentPage: state.donors.currentPage,
    has_next: state.donors.has_next,
    has_previous: state.donors.has_previous,
    total_number: state.donors.total_number,
    total_3months: state.donors.total_3months,
    total_monthly: state.donors.total_monthly,
    total_other: state.donors.total_other
});

export default connect(mapStateToProps, { getDonors, searchDonors, searchDonorsEmails, deleteDonor, editDonor, getActiveCollection, getCurrentParticipants, deleteDonorsMulti, sendEmail })(DonorPage)
