import React, { useState, useEffect } from 'react';
import {Button, Table, Dropdown, Row} from 'react-bootstrap';
import { BsPlusLg, BsXCircle } from "react-icons/bs";
import SearchBar from "./SearchBar";
import { connect } from 'react-redux';
import useWindowSize from '../common/useWindow';
import { handleLoadStyle } from '../common/handleLoadStyle';
import ClipLoader from 'react-spinners/ClipLoader';

import { AddCollectionModal } from "./AddCollModal";
import { EditCollectionModal } from "./EditCollModal";
import { EditWholesaleModal } from "./Wholesale/EditWholesaleModal";
import { MoreInformationModal } from '../CollectionHistory/MoreInfoModal';
import { RouteModal } from '../common/RouteModal';
import { SuccessModal } from "../common/SuccessModal";
import { WriteEmail } from '../Email/EmailModal';
import { PaginationFooter } from '../common/Pagination';

import { handleCollectionDate } from '../common/dateFuncs';
import { handleCollectionType } from '../common/typeFuncs';
import { monthOptions, collectionTypeSelection } from '../common/miscObjects';

import { getCollections, searchCollections, deleteCollection, editCollection, addCollectionPhoto, checkStatusEdit, deleteCollectionsMulti } from '../../actions/collections';
import { addWholesale, getWholesale, editWholesale } from "../../actions/wholesale";
import { searchDonorsEmails } from "../../actions/donors";
import { sendEmail } from '../../actions/email';
import { editParticipantStatus, getParticipantList } from "../../actions/participation";
import { geocodeFinder, routePlanner } from '../../actions/googlemaps';

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
    searchDonorsEmails,
    sendEmail,
    getParticipantList,
    editParticipantStatus,
    geocodeFinder,
    routePlanner,
    colls,
    emails,
    whol,
    currentPage,
    has_next,
    has_previous,
    total_number,
    parTotalLength,
    parsList,
    par_currentPage,
    par_has_next,
    par_has_previous,
    par_total_number,
    postcodeOrder,
    geocodeResult, 
    routeResult,
    stats
}) => {

    // Set Default States
    const size = useWindowSize(); 
    const pageData = "coll";

    const [loading, setLoading] = useState(true);
    
    const [photo, setPhoto] = useState({
        photofilename: "anonymous.png",
        imagesrc: `${process.env.REACT_APP_API}media/photos/anonymous.png`,
        photofile: []
    })
    
    const pageStatus = 'PLANNED,ACTIVE'
    const [monthFilter, setMonthFilter] = useState(collectionTypeSelection(size.width));
    const [monthValue, setMonthValue] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isChecked, setIsChecked] = useState([]);
    const [page, setPage] = useState("1");

    // Handle Initial Data Request

    useEffect(() => {
        setMonthFilter(collectionTypeSelection(size.width))
        setLoading(true);
        getCollections(page, pageStatus).then(() => setLoading(false));
      }, []);

    // Modal Handlers
    const [infoModalShow, setInfoModalShow] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editWholesaleShow, setEditWholesaleShow] = useState(false);
    const [emailModalShow, setEmailModalShow] = useState(false);
    const [routeModalShow, setRouteModalShow] = useState(false);
    const [successModalShow, setSuccessModalShow] = useState(false);
    const [successDeleteModalShow, setSuccessDeleteModalShow] = useState(false);
    

    const infoModalClose = () => {
        setInfoModalShow(false);
    };

    const addModalClose = () => {
        setAddModalShow(false);
    };

    const editModalClose = () => {
        setEditModalShow(false);
    };

    const editWholesaleClose = () => {
        setEditWholesaleShow(false);
    };

    const emailModalClose = () => {
        setEmailModalShow(false);
    };

    const routeModalClose = () => {
        setRouteModalShow(false);
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
    const [parlength, setParlength] = useState(null);
    const [emaillist, setEmailList] = useState([]);
    const [foodlist, setFoodList] = useState("");
    const [type, setType] = useState(null);
    const [isAdd, setIsAdd] = useState(null);
    const [reqStatus, setReqStatus] = useState(null);

    // Collection Month Type Filter

    const handleFilter = (value, filter) => {
        setLoading(true);
        let monthType = value;

        if (monthType === "0") {
            getCollections(page, pageStatus).then(() => setLoading(false));

            setMonthValue(monthType);
            setMonthFilter(filter);
        } else {
            let searchInputStart = startDate;
            let searchInputEnd = endDate;
            searchCollections(page, monthType, searchInputStart, searchInputEnd, pageStatus).then(() => setLoading(false));

            setMonthValue(monthType);
            setMonthFilter(filter);
        }
    };

    // Collection Search

    const handleSearch = (startDate, endDate) => {
        setLoading(true);
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

        searchCollections(page, monthValue, searchInputStart, searchInputEnd, pageStatus).then(() => setLoading(false));
    };

    // Collection Delete

    const handleDelete = (collId) => {
        if(window.confirm('Are you sure?')){
            setLoading(true);
            let single = true
            deleteCollection(collId, single, page, pageStatus).then(() => setLoading(false));
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
                setLoading(true);
                deleteCollectionsMulti(toDelete, page, pageStatus).then(() => setLoading(false));

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
        setLoading(true);

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
                checkStatusEdit(status, collectionId, page, pageStatus)

                editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, status, page, pageStatus).then(() => setLoading(false));
                setEditModalShow(false);
            } else {
                editCollection(collectionId, date, type, totalWeight, totalCost, photo, spreadsheet, status, page, pageStatus).then(() => setLoading(false));
                setEditModalShow(false);
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

                addCollectionPhoto(file, photo, ogfile, collectionId, date, type, totalWeight, totalCost, spreadsheet, status, page, pageStatus).then(() => setLoading(false));
                setEditModalShow(false);
            } else {
                addCollectionPhoto(file, photo, ogfile, collectionId, date, type, totalWeight, totalCost, spreadsheet, status, page, pageStatus).then(() => setLoading(false));
                setSuccessModalShow(false);
            }
        }
    };

    // Get Wholesale

    const handleGetWholesale = (collid, donorType) => {
        let collId = collid
        let donSearch = ""
        let searchType = "all"
        let parPage = "1";
        let perParPage = "5";
        let parSearchInput = "";
        let parType = "";
        let isRec = ""
        getWholesale(collId);
        getParticipantList(parPage, perParPage, collid, parSearchInput, parType, isRec);
        searchDonorsEmails(searchType, donorType, donSearch);
    };

    // Edit Wholesale

    const handleEditWholesale = (e) => {
        e.preventDefault();
        setLoading(true);

        let wholId = e.target.WholesaleID.value;
        let totalDonated = e.target.TotalDonated.value;
        let totalSpent = e.target.TotalSpent.value;
        let collId = e.target.CollectionID.value;
        let newDonationVal = e.target.AddDonation.value;
        let wholesaleReceipt = e.target.Receipt.value;
        let notes = e.target.Notes.value;

        editWholesale(wholId, totalDonated, totalSpent, collId, newDonationVal, wholesaleReceipt, notes).then(() => setLoading(false));
        setEditWholesaleShow(false);
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
                                                    setInfoModalShow(true);
                                                    setCollid(coll.CollectionID);
                                                    setColldate(handleCollectionDate(coll.CollectionDate));
                                                    setColltype(handleCollectionType(coll.Type));
                                                    setColltotalweight(coll.TotalWeight);
                                                    setColltotalcost(coll.TotalCost);
                                                    setCollphoto(coll.CollectionPhoto);
                                                    setCollspreadsheet(coll.CollectionSpreadsheet);
                                                    setCollstatus(coll.CollectionStatus);
                                                    setWhoid(whol[0].WholesaleID);
                                                    setWhototaldonated(whol[0].TotalDonated);
                                                    setWhototalspent(whol[0].TotalSpent);
                                                    setWhoremainder(whol[0].Remainder);
                                                    setWhoreceipt(whol[0].WholesaleReceipt);
                                                    setWhonotes(whol[0].Notes);
                                                    setParlength(parTotalLength);
                                                }
                                            }
                                            >
                                                    More Information...
                                            </Dropdown.Item>
                                            <MoreInformationModal show={infoModalShow}
                                            onHide={infoModalClose}
                                            collid={collid}
                                            colldate={colldate}
                                            colltype={colltype}
                                            colltotalweight={colltotalweight}
                                            colltotalcost={colltotalcost}
                                            collphoto={collphoto}
                                            collspreadsheet={collspreadsheet}
                                            collstatus={collstatus}
                                            whototaldonated={whototaldonated}
                                            whototalspent={whototalspent}
                                            whoremainder={whoremainder}
                                            whoreceipt={whoreceipt}
                                            whonotes={whonotes}
                                            parlength={parlength}
                                            parsList={parsList}
                                            getParticipantList={getParticipantList}
                                            par_currentPage={par_currentPage}
                                            par_has_next={par_has_next}
                                            par_has_previous={par_has_previous}
                                            par_total_number={par_total_number}
                                            size={size}
                                            stats={stats}
                                            />

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
                                            size = {size}
                                            />

                                            {/* Route Planner */}
                                            <Dropdown.Item
                                            onClick={()=>{
                                                setRouteModalShow(true);
                                            }}
                                            >
                                                Create Collection Route
                                            </Dropdown.Item>

                                            <RouteModal show={routeModalShow}
                                            onHide={routeModalClose}
                                            postcodeOrder={postcodeOrder}
                                            size={size}
                                            editParticipantStatus={editParticipantStatus}
                                            geocodeFinder={geocodeFinder}
                                            routePlanner={routePlanner}
                                            geocodeResult={geocodeResult}
                                            />
    
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
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    
                                </td>
                                <td>{handleCollectionDate(coll.CollectionDate)}</td>
                                <td>{handleCollectionType(coll.Type)}</td>
                            </tr>)}
                    </tbody>
                </Table>
                {(total_number !== 1) &&<PaginationFooter 
                data={pageData}
                monthValue={monthValue}
                searchValue={null}
                typeValue={null}
                CollectionID={null}
                startDate={startDate}
                endDate={endDate}
                pageStatus={pageStatus}
                currentPage={currentPage}
                setPage={setPage}
                page={page}
                perPage={null}
                setLoading={setLoading}
                searchDonors={null}
                searchCollections={searchCollections}
                getParticipantList={null}
                has_previous={has_previous}
                has_next={has_next}
                total_number={total_number}/>}
            </div>}
        </div>
    )

}

// Reducer

const mapStateToProps = (state) => ({
    colls: state.collections.colls,
    whol: state.wholesale.whol,
    emails: state.donors.emails,
    result: state.collections.result,
    total: state.collections.total,
    currentPage: state.collections.currentPage,
    has_next: state.collections.has_next,
    has_previous: state.collections.has_previous,
    total_number: state.collections.total_number,
    parTotalLength: state.participants.parTotalLength,
    parsList: state.participants.parsList,
    stats: state.participants.stats,
    par_currentPage: state.participants.currentPage,
    par_has_next: state.participants.has_next,
    par_has_previous: state.participants.has_previous,
    par_total_number: state.participants.total_number,
    postcodeOrder: state.participants.postcodeOrder,
    geocodeResult: state.googlemaps.geocodeResult,
    routeResult: state.googlemaps.routeResult
});

export default connect(mapStateToProps, { getCollections, searchCollections, deleteCollection, editCollection, addCollectionPhoto, addWholesale, getWholesale, editWholesale, searchDonorsEmails, checkStatusEdit, deleteCollectionsMulti, sendEmail, getParticipantList, editParticipantStatus, geocodeFinder, routePlanner})(Collection)
