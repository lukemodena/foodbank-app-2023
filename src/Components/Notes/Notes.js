import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Modal, Table, Dropdown} from 'react-bootstrap';
import { connect } from 'react-redux';
import { ClipLoader } from "react-spinners";
import { BsCheckSquare, BsPlusSquare, BsXSquare } from 'react-icons/bs';

import useWindowSize from "../common/useWindow";
import { handleCollectionDate } from '../common/dateFuncs';
import { collectionDateSelection, handleParticipantPayment} from "../common/miscObjects";
import { handleLoadStyle } from "../common/handleLoadStyle";
import { PaginationFooter } from "../common/Pagination";

import { getCollections } from '../../actions/collections';
import { getNotes, addNote, editNote, deleteNote } from "../../actions/notes";



const Notes = ({ 
    getCollections,
    getNotes, 
    addNote, 
    editNote, 
    deleteNote,
    colls,
    notes,
    currentPage,
    has_next,
    has_previous,
    total_number,
}) => {

    const size = useWindowSize(); 
    const modal = true
    const pageData = "not"
    const [collectionDate, setCollectionDate] = useState(collectionDateSelection(size.width));
    const [collectionID, setCollectionID] = useState(`${localStorage.getItem('activeId')}`);
    const [page, setPage] = useState("1");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        
        let collection = collectionID;
        let collPage = "all";
        let collStatus = "";
        setCollectionDate(collectionDateSelection(size.width));
        setLoading(true);
        
        getNotes(page, collection).then(() => setLoading(false));
        getCollections(collPage, collStatus);
      }, []);

    // Collection Date Picker

    const handleFilter = (CollectionID, CollectionDate) => {

        let collection = CollectionID;
        let filtPage = "1";
        setLoading(true);
        setPage(filtPage);

        getNotes(filtPage, collection).then(() => setLoading(false));
        
        setCollectionDate(CollectionDate);
        setCollectionID(collection);
    };

    // Save Button

    const handleInputChange = (e, noteValue, NoteID, OriginalNote) => {
        e.preventDefault();
        if (noteValue === OriginalNote){
            setAllowEditNote(false); 
            setAllowEditNoteID(null);
        } else {
            setNote(noteValue);
            setAllowEditNote(true);
            setAllowEditNoteID(NoteID);
        }
    }

    // Add Note

    const [newNote, setNewNote] = useState("");

    const handleAddNote = (e) => {
        e.preventDefault();
        console.log(newNote, collectionID, page);
        setLoading(true);
        addNote(newNote, collectionID, page).then(() => setLoading(false));
    }

    // Edit Note

    const [allowEditNote, setAllowEditNote] = useState(false);
    const [allowEditNoteID, setAllowEditNoteID] = useState(null);
    const [note, setNote] = useState("");

    const handleEditNote = (e, NoteID, Completed) => {
        e.preventDefault();
        setLoading(true);
        editNote(NoteID, note, Completed, collectionID, page).then(() => {setLoading(false); setAllowEditNoteID(null)});
    }

    const handleCompleteNote = (e, NoteID, Note, Completed) => {
        e.preventDefault();
        setLoading(true);
        if (Completed === true){
            let newCompleted = false;
            editNote(NoteID, Note, newCompleted, collectionID, page).then(() => setLoading(false));
        } else if (Completed === false) {
            let newCompleted = true;
            editNote(NoteID, Note, newCompleted, collectionID, page).then(() => setLoading(false));
        }
    }

    // Delete Note
    const handleDeleteNote = (e, NoteId) => {
        e.preventDefault();
        if(window.confirm('Are you sure?')){
            setLoading(true);
            deleteNote(NoteId, page, collectionID).then(() => setLoading(false));
        }
    };

    return (
        <div className='container' style={{paddingTop: "38.5px"}}>
            <Dropdown className="participation-dropdownFilter">

            {/* Collection Filter */}

                <Dropdown.Toggle className="participation-dropdownFilterButton" variant="outline-secondary" size="sm" id="dropdown-basic">
                    {handleCollectionDate(collectionDate)}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{height: "300px", overflowY: "scroll"}}>
                    {colls.map((coll) => (
                        <Dropdown.Item key={coll.CollectionID} onClick={() => handleFilter(coll.CollectionID, coll.CollectionDate)} >{handleCollectionDate(coll.CollectionDate)}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            {loading ? 
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
                            <th>Complete</th>
                            <th>Note</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="row-height nowrap">
                            <td>
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                />
                            </td>
                            
                            <td>
                                <Form>
                                    <Form.Control 
                                    as="textarea" 
                                    rows={10}
                                    className="row-height"
                                    placeholder="New Note..."
                                    onChange={(e) => setNewNote(e.target.value)}
                                    />
                                </Form>
                            </td>
                            <td>
                                <a style={{cursor:"pointer"}} onClick={(e) => handleAddNote(e)} ><BsPlusSquare className="notesSave-Icon"/></a>
                            </td>
                        </tr>
                        {notes.map((not)=>
                                <tr key={not.NoteID} className="row-height nowrap">
                                    <td>
                                        <Form.Check 
                                            type="switch"
                                            id="custom-switch"
                                            label={handleParticipantPayment(not.Completed)}
                                            checked={(`${not.Completed}` === 'true')}
                                            onChange={(e) => {handleCompleteNote(e, not.NoteID, not.Note, not.Completed)}}
                                        />
                                    </td>
                                    
                                    <td>
                                        <Form>
                                            <Form.Control  
                                            as="textarea" 
                                            rows={10}
                                            className="row-height"
                                            defaultValue={not.Note}
                                            placeholder="Note..."
                                            onChange={(e) => {handleInputChange(e, e.target.value, not.NoteID, not.Note)}}
                                            />
                                        </Form>
                                    </td>
                                    <td>
                                        {(not.NoteID === allowEditNoteID) &&
                                        <div>
                                            <a style={{cursor:"pointer"}} onClick={(e) => handleEditNote(e, not.NoteID, not.Completed)} >
                                                <BsCheckSquare className="notesSave-Icon"/>
                                            </a>
                                            {/* <a style={{cursor:"pointer"}} onClick={(e) => handleDeleteNote(e, not.NoteID)}>
                                                <BsXSquare className="notesDelete-Icon"/>
                                            </a> */}
                                        </div>    
                                        }
                                
                                        {(not.NoteID !== allowEditNoteID) &&
                                        <div>
                                            {/* <BsCheckSquare className="searchButton-Icon"/> */}
                                            <a style={{cursor:"pointer"}} onClick={(e) => handleDeleteNote(e, not.NoteID)}>
                                                <BsXSquare className="notesDelete-Icon"/>
                                            </a>
                                        </div>
                                        }
                                    </td>
                                    
                                </tr>)}
                    </tbody>
                </Table>
                <PaginationFooter 
                data={pageData}
                monthValue={null}
                searchValue={null}
                typeValue={null}
                collectionID={collectionID}
                startDate={null}
                endDate={null}
                pageStatus={null}
                currentPage={currentPage}
                setPage={setPage}
                page={page}
                perPage={null}
                setLoading={setLoading}
                searchDonors={null}
                searchCollections={null}
                getParticipantList={null}
                has_previous={has_previous}
                has_next={has_next}
                total_number={total_number}
                getNotes={getNotes}/>
            </div>}
        </div>
    )
}

// Reducer

const mapStateToProps = (state) => ({
    colls: state.collections.colls,
    notes: state.notes.notes,
    currentPage: state.notes.currentPage,
    has_next: state.notes.has_next,
    has_previous: state.notes.has_previous,
    total_number: state.notes.total_number,
});

export default connect(mapStateToProps, { getCollections, getNotes, addNote, editNote, deleteNote })(Notes)
