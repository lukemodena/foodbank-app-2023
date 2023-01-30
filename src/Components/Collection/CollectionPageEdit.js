import React, { useState, useEffect } from 'react';
import {Button, Table, Dropdown, Row} from 'react-bootstrap';
import { BsPlusLg, BsXCircle } from "react-icons/bs";
import SearchBar from "./SearchBar";
import { connect } from 'react-redux';
import useWindowSize from '../common/useWindow';

import { AddCollectionModal } from "./AddCollModal";
import { EditCollectionModal } from "./EditCollModal";
import { AddParticipationModal } from "../Participation/AddParticipationModal";
import { EditWholesaleModal } from "./Wholesale/EditWholesaleModal";
import { SuccessModal } from "../common/SuccessModal";
import { WriteEmail } from '../Email/EmailModal';
import { handleCollectionDate } from '../common/dateFuncs';
import { handleCollectionType } from '../common/typeFuncs';
import { monthOptions } from '../common/miscObjects';

import { getCollections, searchCollections, deleteCollection, editCollection, addCollectionPhoto, checkStatusEdit, deleteCollectionsMulti } from '../../actions/collections';
import { addWholesale, getWholesale, editWholesale } from "../../actions/wholesale";
import { searchDonors } from "../../actions/donors";
import { addParticipant, getCurrentParticipants } from "../../actions/participation";
import { sendEmail } from '../../actions/email';

const Collection = ({ 
    getCollections, 
    searchCollections, 
    deleteCollection, 
    editCollection, 
    addCollectionPhoto, 
    checkStatusEdit, 
    deleteCollectionsMulti, 
    getWholesale, 
    editWholesale, 
    searchDonors,
    getCurrentParticipants,
    sendEmail,
    colls,
    dons,
    emails,
    whol
}) => {

    // Set Default States
    const size = useWindowSize(); 
    const [refresh, setRefresh] = useState(null);
    
    const [photo, setPhoto] = useState({
        photofilename: "anonymous.png",
        imagesrc: `${process.env.REACT_APP_API}media/photos/anonymous.png`,
        photofile: []
    })
    
    const [monthFilter, setMonthFilter] = useState("Select Collection");
    const [monthValue, setMonthValue] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isChecked, setIsChecked] = useState([]);

    // Handle Data Request (Initial + Refresh)

    useEffect(() => {
        let status = 'PLANNED,ACTIVE';
        getCollections(status);
        setRefresh("NO");
      }, []);


    useEffect(() => {
        if (refresh === "YES"){
            let status = 'PLANNED,ACTIVE';
            getCollections(status);
            setStartDate("");
            setEndDate("");
            setMonthValue("");
            setMonthFilter("All");
            setRefresh("NO");
        } else if (refresh === null) {
            let status = 'PLANNED,ACTIVE';
            getCollections(status);
            setStartDate("");
            setEndDate("");
            setMonthValue("");
            setMonthFilter("All");
            setRefresh("NO");
        }
      }, []);

    // Modal Handlers
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [addParticipationShow, setAddParticipationShow] = useState(false);
    const [editWholesaleShow, setEditWholesaleShow] = useState(false);
    const [emailModalShow, setEmailModalShow] = useState(false);
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
 
    const addParticipationClose = () => {
        setAddParticipationShow(false);
        setRefresh("YES");
    };

    const editWholesaleClose = () => {
        setEditWholesaleShow(false);
        setRefresh("YES");
    };

    const emailModalClose = () => {
        setEmailModalShow(false);
        setRefresh("YES");
    };

    const successModalClose = () => {
        setSuccessModalShow(false);
    };

    const successDeleteModalClose = () => {
        setSuccessDeleteModalShow(false);
    };

    // Page Props

    const [collid, setCollid] = useState(null);
    const [colldate, setColldate] = useState(null); 
    const [colltype, setColltype] = useState(null); 
    const [colltotalweight, setColltotalweight] = useState(null);
    const [colltotalcost, setColltotalcost] = useState(null);
    const [collphoto, setCollphoto] = useState(null);
    const [collspreadsheet, setCollspreadsheet] = useState(null);
    const [collstatus, setCollstatus] = useState(null);
    const [whoid, setWhoid] = useState(null);
    const [whototaldonated, setWhototaldonated] = useState(null);
    const [whototalspent, setWhototalspent] = useState(null);
    const [whoremainder, setWhoremainder] = useState(null);
    const [whoreceipt, setWhoreceipt] = useState(null);
    const [whonotes, setWhonotes] = useState("");
    const [donors, setDons] = useState([]);
    const [emaillist, setEmailList] = useState([]);
    const [foodlist, setFoodList] = useState("");
    const [type, setType] = useState(null);
    const [isAdd, setIsAdd] = useState(null);
    const [reqStatus, setReqStatus] = useState(null);

    // Collection Month Type Filter

    const handleFilter = (value, filter) => {
        let monthType = value;

        if (monthType === "0") {
            let status = 'PLANNED,ACTIVE';
            getCollections(status);

            setMonthValue(monthType);
            setMonthFilter(filter);
        } else {
            let status = 'PLANNED,ACTIVE';
            let searchInputStart = startDate;
            let searchInputEnd = endDate;
            searchCollections(monthType, searchInputStart, searchInputEnd, status);

            setMonthValue(monthType);
            setMonthFilter(filter);
        }
    };

    // Collection Search

    const handleSearch = (startDate, endDate) => {
        let status = 'PLANNED,ACTIVE';
        let monthType = monthValue;
        let startYear = Intl.DateTimeFormat('en-GB', { year: "numeric" }).format(startDate);
        let startMonth = Intl.DateTimeFormat('en-GB', { month: "2-digit" }).format(startDate);
        let startDay = Intl.DateTimeFormat('en-GB', { day: "2-digit" }).format(startDate);
        let searchInputStart = `${startYear}-${startMonth}-${startDay}`;

        let endYear = Intl.DateTimeFormat('en-GB', { year: "numeric" }).format(endDate);
        let endMonth = Intl.DateTimeFormat('en-GB', { month: "2-digit" }).format(endDate);
        let endDay = Intl.DateTimeFormat('en-GB', { day: "2-digit" }).format(endDate);
        let searchInputEnd = `${endYear}-${endMonth}-${endDay}`;
        setStartDate(searchInputStart);
        setEndDate(searchInputEnd);

        searchCollections(monthType, searchInputStart, searchInputEnd, status);
    };

    // Collection Delete

    const handleDelete = (collId) => {
        if(window.confirm('Are you sure?')){
            deleteCollection(collId);
            setSuccessDeleteModalShow(true);
        }
    };

    
    const handleChecked = (e) => {
        const id = e.target.value;

        setIsChecked([...isChecked, id]);
    };
    
        
    const handleDeleteMulti = (e) => {
        e.preventDefault();

        let toDelete = isChecked;
        let length = toDelete.length;

        if (length === 0){
            let message = `Please select the collection dates you'd like to delete`;
            window.confirm(message);
        } else {
            let message = `Are you sure you want to delete ${length} record/s?`;
            if(window.confirm(message)){
                deleteCollectionsMulti(toDelete);

                setSuccessDeleteModalShow(true);
            }
        }
    }

    // Locally Store Photo

    const handleFileSelected = (e) => {
        const file = e.target.files[0];
        const filename = e.target.files[0].name;

        setPhoto({
            photofilename: filename,
            photofile: file,
            imagesrc: 'http://127.0.0.1:8000/media/'+filename
        });
    }

    // Collection Update + Photo Update

    const handleFileSubmit = (e) => {
        e.preventDefault();

        let file = e.target.photofile.files[0];

        if (file == null) {
            let collectionId = e.target.CollectionID.value;
            let date = e.target.CollectionDate.value;
            let type = e.target.Type.value;
            let totalWeight = e.target.TotalWeight.value;
            let totalCost = e.target.TotalCost.value;
            let photo = e.target.CollectionPhoto.value;
            let spreadsheet = e.target.CollectionSpreadsheet.value;
            let status = e.target.CollectionStatus.value;

            if (status === "ACTIVE"){
                checkStatusEdit(status, collectionId)

                editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, status);
                setSuccessModalShow(true);
            } else {
                editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, status);
                setSuccessModalShow(true);
            }

        } else {
            const formData = new FormData();
        
            let photo = e.target.photofile.files[0].name;
            let collectionId = e.target.CollectionID.value;
            let date = e.target.CollectionDate.value;
            let type = e.target.Type.value;
            let totalWeight = e.target.TotalWeight.value;
            let totalCost = e.target.TotalCost.value;
            let ogfile = e.target.CollectionPhoto.value;
            let spreadsheet = e.target.CollectionSpreadsheet.value;
            let status = e.target.CollectionStatus.value;

            formData.append(
                "myFile",
                file
            );

            if (status === "ACTIVE"){
                checkStatusEdit(status, collectionId);

                addCollectionPhoto(file, photo, ogfile, collectionId, date, type, totalWeight, totalCost, spreadsheet, status);
                setSuccessModalShow(true);
            } else {
                addCollectionPhoto(file, photo, ogfile, collectionId, date, type, totalWeight, totalCost, spreadsheet, status);
                setSuccessModalShow(true);
            }
        }
    };

    // Get Wholesale

    const handleGetWholesale = (collid, donorType) => {
        let collId = collid
        let donSearch = ""
        getWholesale(collId);
        searchDonors(donorType, donSearch);
    };

    // Edit Wholesale

    const handleEditWholesale = (e) => {
        e.preventDefault();

        let wholId = e.target.WholesaleID.value;
        let totalDonated = e.target.TotalDonated.value;
        let totalSpent = e.target.TotalSpent.value;
        let collId = e.target.CollectionID.value;
        let newDonationVal = e.target.AddDonation.value;
        let wholesaleReceipt = e.target.Receipt.value;
        let notes = e.target.Notes.value;

        editWholesale(wholId, totalDonated, totalSpent, collId, newDonationVal, wholesaleReceipt, notes);
        setSuccessModalShow(true);
    };

    // Add Participant

    const handleAddParticipant = (CollectionID, DonorID, PaymentRecieved, DonationType, TotalDonated, DropOffTime, WholesaleID) => {
    
        let colId = CollectionID;
        let donId = DonorID;
        let payRec = PaymentRecieved;
        let donTyp = DonationType;
        let totDon = TotalDonated;
        let time = DropOffTime;
        let whoId = WholesaleID;

        let droTim = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(time);
        let CollID = colId;
        let DonID = donId;

        // Checks if Donor already Participant in collection, 
        // - If yes, new participant is not added 
        // - if no, new participant is added + if cash donation wholesale is updated
        
        getCurrentParticipants(CollID, DonID, payRec, donTyp, totDon, droTim, donId, colId, whoId);
        setSuccessModalShow(true);
    };

    return(
        <div style={{paddingTop: "38.5px"}}>
            
            <div style={{margin:"auto"}}>
                <Row>

                    {/* Collection Month Type Filter */}

                    <Dropdown className="dropdownFilter">
                        <Dropdown.Toggle className="dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                            {monthFilter}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {monthOptions.map((option) => (
                                <Dropdown.Item key={option.key} onClick={() => handleFilter(option.value, option.filter)} href="#/collections">{option.type}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Collection Search */}

                    <SearchBar callback={(startDate, endDate) => handleSearch(startDate, endDate)}/>

                    {/* Add New Collection Modal */}

                    <Button variant="secondary" className="date-addButton"
                    onClick={()=>setAddModalShow(true)}>
                        <BsPlusLg className="date-addButton-Icon"/>
                    </Button>

                    <AddCollectionModal show={addModalShow}
                    onHide={addModalClose}/>
                </Row>

                <SuccessModal show={successDeleteModalShow}
                    onHide={successDeleteModalClose}
                    reqStatus={reqStatus}
                    type={type}
                    isAdd={isAdd}
                />
            </div>
            {/* Collection Table */}                    
            <div style={{overflowX:"fixed"}}>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            {(size.width > 760) &&<th>
                                <Button className="deleteButton" variant="outline-secondary" onClick={(e) =>{
                                    setSuccessDeleteModalShow(false);
                                    setReqStatus(`Collections deleted`);
                                    setType("collection");
                                    setIsAdd(false);
                                    handleDeleteMulti(e)}}>
                                    <BsXCircle className='deleteIcon'/>
                                </Button>
                            </th>}
                            {(size.width > 760) &&<th>ID</th>}
                            <th>Options</th>
                            <th>Date</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colls.map(coll=>
                            <tr key={coll.CollectionID}>
                                {(size.width > 760) &&<td><input type="checkbox" value={coll.CollectionID} checked={coll.isChecked} onChange={(e) => handleChecked(e)}/></td>}
                                {(size.width > 760) &&<td>{coll.CollectionID}</td>}
                                <td>
                                    
                                    <Dropdown onToggle={() => handleGetWholesale(coll.CollectionID, coll.Type)}>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            ...
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>

                                            <Dropdown.Item 
                                            onClick={()=>
                                                {
                                                    setEditModalShow(true);
                                                    setCollid(coll.CollectionID);
                                                    setColldate(coll.CollectionDate);
                                                    setColltype(coll.Type);
                                                    setColltotalweight(coll.TotalWeight);
                                                    setColltotalcost(coll.TotalCost);
                                                    setCollphoto(coll.CollectionPhoto);
                                                    setCollspreadsheet(coll.CollectionSpreadsheet);
                                                    setCollstatus(coll.CollectionStatus);
                                                    setSuccessModalShow(false);
                                                    setReqStatus(`Collection on ${coll.CollectionDate} saved`);
                                                    setType("collection");
                                                    setIsAdd(false)
                                                }
                                            }
                                            >
                                                Edit
                                            </Dropdown.Item>
                                            <EditCollectionModal show={editModalShow}
                                            onHide={editModalClose}
                                            handleFile={handleFileSelected}
                                            addphoto={handleFileSubmit}
                                            collid={collid}
                                            colldate={colldate}
                                            colltype={colltype}
                                            colltotalweight={colltotalweight}
                                            colltotalcost={colltotalcost}
                                            collphoto={collphoto}
                                            collspreadsheet={collspreadsheet}
                                            collstatus={collstatus}
                                            successModalShow={successModalShow}
                                            successModalClose={successModalClose}
                                            reqStatus={reqStatus}
                                            type={type}
                                            isAdd={isAdd}
                                            />

                                            {/* Prepare Email */}

                                            <Dropdown.Item 
                                            onClick={()=>
                                                {
                                                    setEmailModalShow(true);
                                                    setColldate(coll.CollectionDate);
                                                    setColltotalweight(coll.TotalWeight);
                                                    setCollphoto(coll.CollectionPhoto);
                                                    setEmailList(emails);
                                                    setFoodList("[ENTER TARGETED FOODLIST HERE]")
                                                    setSuccessModalShow(false);
                                                    setReqStatus(`Collection on ${coll.CollectionDate} saved`);
                                                    setType("collection");
                                                    setIsAdd(false)
                                                }
                                            }
                                            >
                                                Prepare Email
                                            </Dropdown.Item>
                                            <WriteEmail show={emailModalShow}
                                            onHide={emailModalClose}
                                            send={sendEmail}
                                            colldate={colldate}
                                            colltotalweight={colltotalweight}
                                            collphoto={collphoto}
                                            emaillist={emaillist}
                                            foodlist={foodlist}
                                            successModalShow={successModalShow}
                                            successModalClose={successModalClose}
                                            reqStatus={reqStatus}
                                            type={type}
                                            isAdd={isAdd}
                                            />

                                            {/* Delete Collection */}

                                            <Dropdown.Item
                                            onClick={()=>{
                                                setSuccessDeleteModalShow(false);
                                                setReqStatus(`Collection on ${coll.CollectionDate} deleted`);
                                                setType("collection");
                                                setIsAdd(false);
                                                handleDelete(coll.CollectionID)
                                            }}
                                            >
                                                Delete
                                            </Dropdown.Item>
    
                                            {/* Manage Collection Cash Donations */}

                                            <Dropdown.Item onClick={() => {
                                                setEditWholesaleShow(true);
                                                setCollid(coll.CollectionID);
                                                setWhoid(whol[0].WholesaleID);
                                                setWhototaldonated(whol[0].TotalDonated);
                                                setWhototalspent(whol[0].TotalSpent);
                                                setWhoremainder(whol[0].Remainder);
                                                setWhoreceipt(whol[0].WholesaleReceipt);
                                                setWhonotes(whol[0].Notes);
                                                setReqStatus(`Cash donation for collection on ${coll.CollectionDate} saved`);
                                                setType("wholesale");
                                                setIsAdd(false);
                                            }}
                                            >
                                                Manage Cash Donations
                                            </Dropdown.Item>
                                            <EditWholesaleModal show={editWholesaleShow}
                                            onHide={editWholesaleClose}
                                            editwhol={handleEditWholesale}
                                            collid={collid}
                                            whoid={whoid}
                                            whototaldonated={whototaldonated}
                                            whototalspent={whototalspent}
                                            whoremainder={whoremainder}
                                            whoreceipt={whoreceipt}
                                            whonotes={whonotes}
                                            successModalShow={successModalShow}
                                            successModalClose={successModalClose}
                                            reqStatus={reqStatus}
                                            type={type}
                                            isAdd={isAdd}
                                            />

                                            {/* Manage Collection Participants  */}

                                            <Dropdown.Item onClick={() =>{ 
                                                setAddParticipationShow(true);
                                                setCollid(coll.CollectionID);
                                                setWhoid(whol[0].WholesaleID);
                                                setDons(dons);
                                                setColldate(coll.CollectionDate);
                                                setReqStatus(`Participant for collection on ${coll.CollectionDate} saved`);
                                                setType("participant");
                                                setIsAdd(true);
                                            }}
                                            >
                                                Add Participant
                                            </Dropdown.Item>
                                            <AddParticipationModal show={addParticipationShow}
                                            onHide={addParticipationClose}
                                            addpart={handleAddParticipant}
                                            collid={collid}
                                            whoid={whoid}
                                            dons={donors}
                                            colldate={colldate}
                                            successModalShow={successModalShow}
                                            successModalClose={successModalClose}
                                            reqStatus={reqStatus}
                                            type={type}
                                            isAdd={isAdd}
                                            />
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    
                                </td>
                                <td>{handleCollectionDate(coll.CollectionDate)}</td>
                                <td>{handleCollectionType(coll.Type)}</td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )

}

// Reducer

const mapStateToProps = (state) => ({
    colls: state.collections.colls,
    whol: state.wholesale.whol,
    dons: state.donors.dons,
    emails: state.donors.emails,
    pars: state.participants.pars,
    result: state.collections.result,
    total: state.collections.total
});

export default connect(mapStateToProps, { getCollections, searchCollections, deleteCollection, editCollection, addCollectionPhoto, addWholesale, getWholesale, editWholesale, searchDonors, addParticipant, getCurrentParticipants, checkStatusEdit, deleteCollectionsMulti, sendEmail})(Collection)
