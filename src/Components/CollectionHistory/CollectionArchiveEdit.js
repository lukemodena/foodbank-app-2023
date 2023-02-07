import React,{ useState, useEffect } from "react";
import {Pagination, Button, Table, Dropdown, Row} from 'react-bootstrap';
import { BsXCircle } from "react-icons/bs";
import SearchBar from "./SearchBar";
import { connect } from 'react-redux';
import useWindowSize from "../common/useWindow";
import ClipLoader from 'react-spinners/ClipLoader';

import { SuccessModal } from "../common/SuccessModal";
import { MoreInformationModal } from "./MoreInfoModal";
import { handleCollectionDate } from "../common/dateFuncs";
import { handleCollectionType } from "../common/typeFuncs";
import { monthOptions } from "../common/miscObjects"; 

import { getCollections, searchCollections, deleteCollection, checkStatusEdit, deleteCollectionsMulti } from '../../actions/collections';
import { getWholesale } from "../../actions/wholesale";
import { getDonors } from "../../actions/donors";
import { getCurrentParticipants } from "../../actions/participation";

const CollectionArchive = ({ 
    getCollections, 
    searchCollections, 
    deleteCollection, 
    deleteCollectionsMulti, 
    getWholesale, 
    getDonors, 
    colls,
    total,
    totalc,
    whol,
    currentPage,
    has_next,
    has_previous,
    total_number
}) => {

    // Set Default States
    const size = useWindowSize(); 
    const [refresh, setRefresh] = useState(null);
    
    const status = 'ARCHIVED';
    const [monthFilter, setMonthFilter] = useState("Select Collection");
    const [monthValue, setMonthValue] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isChecked, setIsChecked] = useState([]);
    const [page, setPage] = useState("1");
    const [loading, setLoading] = useState(true);

    // Handle Data Request (Initial + Refresh)

    useEffect(() => {
        setLoading(true);
        getCollections(page, status).then(() => setLoading(false));
        setRefresh("NO");
      }, []);


    useEffect(() => {
        if (refresh === "YES"){
            setLoading(true);
            getCollections(page, status).then(() => setLoading(false));
            setStartDate("");
            setEndDate("");
            setMonthValue("");
            setMonthFilter("All");
            setRefresh("NO");
        } else if (refresh === null) {
            getCollections(page, status).then(() => setLoading(false));
            setStartDate("");
            setEndDate("");
            setMonthValue("");
            setMonthFilter("All");
            setRefresh("NO");
        }
      }, []);

    // Modal Handlers
    const [infoModalShow, setInfoModalShow] = useState(false);
    const [successDeleteModalShow, setSuccessDeleteModalShow] = useState(false);

    const infoModalClose = () => {
        setInfoModalShow(false);
        setRefresh("YES");
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
    const [collphotourl, setCollphotourl] = useState(`${process.env.REACT_APP_API}media/photos/anonymous.png`);
    const [collspreadsheet, setCollspreadsheet] = useState(null);
    const [collstatus, setCollstatus] = useState(null);
    const [whoid, setWhoid] = useState(null);
    const [whototaldonated, setWhototaldonated] = useState(null);
    const [whototalspent, setWhototalspent] = useState(null);
    const [whoremainder, setWhoremainder] = useState(null);
    const [whoreceipt, setWhoreceipt] = useState(null);
    const [type, setType] = useState(null);
    const [isAdd, setIsAdd] = useState(null);
    const [reqStatus, setReqStatus] = useState(null);

    // Collection Month Type Filter

    const handleFilter = (value, filter) => {
        setLoading(true);
        let monthType = value;

        if (monthType === "0") {
            getCollections(page, status).then(() => setLoading(false));
            setMonthValue(monthType);
            setMonthFilter(filter);
        } else {
            let searchInputStart = startDate;
            let searchInputEnd = endDate;
            searchCollections(page, monthType, searchInputStart, searchInputEnd, status).then(() => setLoading(false));
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

        searchCollections(page, monthValue, searchInputStart, searchInputEnd, status).then(() => setLoading(false));
    };

    // Handle Page

    const handlePage = (inputVal) => {
        setLoading(true);
    
        let prevPage = currentPage;
        let newpage = `${parseInt(prevPage)+parseInt(inputVal)}`;
        
        setPage(newpage)
        searchCollections(newpage, monthValue, startDate, endDate, status).then(() => setLoading(false));
    }
    
    // Handle Last Page

    const handleLastPage = (inputValue) => {
        setLoading(true);

        setPage(inputValue);
        searchCollections(inputValue, monthValue, startDate, endDate, status).then(() => setLoading(false));
    }

    // Handle First Page

    const handleFirstPage = (inputValue) => {
        setLoading(true);
    
        setPage(inputValue);
        searchCollections(inputValue, monthValue, startDate, endDate, status).then(() => setLoading(false));
    }

    // Collection Delete

    const handleDelete = (collId) => {
        if(window.confirm('Are you sure?')){
            setLoading(true);
            let single = false
            deleteCollection(collId, single, monthValue, page, status).then(() => setLoading(false));
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
                deleteCollectionsMulti(toDelete, page, status).then(() => setLoading(false));

                setSuccessDeleteModalShow(true);
            }
        }
    };

    // Get Wholesale

    const handleGetWholesale = (collid) => {
        let collId = collid
        getWholesale(collId)
        getDonors()
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
                                <Dropdown.Item key={option.key} onClick={() => handleFilter(option.value, option.filter)} href="#/archive">{option.type}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* Collection Search */}

                    <SearchBar callback={(startDate, endDate) => handleSearch(startDate, endDate)}/>
                    
                    
                    <Button variant="font-size: 15px;" disabled className="totalButton">
                            {total}kg
                    </Button>
                    <Button variant="font-size: 15px;" disabled className="totalButtonCash">
                        £{totalc}
                    </Button>
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
            <div className="mt-4" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
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
                            <th>Total Weight (kg)</th>
                            <th>Estimated Cost (£)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {colls.map(coll=>
                            <tr key={coll.CollectionID}>
                                {(size.width > 760) &&<td><input type="checkbox" value={coll.CollectionID} checked={coll.isChecked} onChange={(e) => handleChecked(e)}/></td>}
                                {(size.width > 760) &&<td>{coll.CollectionID}</td>}
                                <td>
                                    
                                    <Dropdown onToggle={() => handleGetWholesale(coll.CollectionID)}>
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
                                                    setCollphotourl(`http://127.0.0.1:8000/media/${coll.CollectionPhoto}`);
                                                    setCollspreadsheet(coll.CollectionSpreadsheet);
                                                    setCollstatus(coll.CollectionStatus);
                                                    setWhoid(whol[0].WholesaleID);
                                                    setWhototaldonated(whol[0].TotalDonated);
                                                    setWhototalspent(whol[0].TotalSpent);
                                                    setWhoremainder(whol[0].Remainder);
                                                    setWhoreceipt(whol[0].WholesaleReceipt);
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
                                <td>{coll.TotalWeight}</td>
                                <td>{coll.TotalCost}</td>
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
    colls: state.collections.colls,
    whol: state.wholesale.whol,
    dons: state.donors.dons,
    pars: state.participants.pars,
    result: state.collections.result,
    total: state.collections.total,
    totalc: state.collections.totalc,
    currentPage: state.collections.currentPage,
    has_next: state.collections.has_next,
    has_previous: state.collections.has_previous,
    total_number: state.collections.total_number
});

export default connect(mapStateToProps, { getCollections, searchCollections, deleteCollection, getWholesale, getDonors, getCurrentParticipants, checkStatusEdit, deleteCollectionsMulti })(CollectionArchive)
