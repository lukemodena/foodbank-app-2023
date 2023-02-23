import React from "react";
import {Button, Col, Form, Row, Modal, Image, Dropdown} from 'react-bootstrap';
import { BsDownload } from "react-icons/bs";

import { MiniTable } from "../common/MiniTable";

export function MoreInformationModal(props) {
    const {
        show,
        onHide,
        collid,
        colldate,
        colltype,
        colltotalweight,
        colltotalcost,
        collphoto,
        collspreadsheet,
        collstatus,
        whototaldonated,
        whototalspent,
        whoremainder,
        whonotes,
        parlength,
        parsList,
        getParticipantList,
        par_currentPage,
        par_has_next,
        par_has_previous,
        par_total_number,
        size
    } = props

    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        {colldate}:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row style={{justifyContent:"center", textAlign:"center"}}>
                        <Col sm={6} style={{justifyContent:"center", textAlign:"center"}}>
                            <Image style={{borderRadius:"20px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} width="200px" height="200px" src={`${process.env.REACT_APP_API}media/photos/`+collphoto}/>
                            <div style={{paddingTop:"10px"}}>
                                <p style={{backgroundColor:"lightgray", textAlign:"center", borderRadius:"20px", boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                                    <br />Collection Type: <strong>{colltype}</strong> <br />
                                    Number of Donors: <strong>{parlength}</strong> <br />
                                    Total Weight: <strong>{colltotalweight}kg</strong> <br />
                                    Estimated Cost: <strong>£{colltotalcost}</strong> <br />
                                    Total Donated: <strong>£{whototaldonated}</strong> <br />
                                    Total Spent: <strong>£{whototalspent}</strong> <br />
                                    Remainder: <strong>£{whoremainder}</strong> <br />
                                    Status: <strong>{collstatus}</strong> <br />
                                    Wholesale Notes:  <strong>{whonotes}</strong> <br />
                                    Download Picture: <br />
                                    <a href={`${process.env.REACT_APP_API}media/photos/${collphoto}`} target="_blank" download>
                                    <Button variant="outline-secondary" className="editButton">
                                        <BsDownload className="editButton-Icon"/>
                                    </Button>
                                    </a>
                                    <br /><br />
                                </p>
                            </div>

                            <MiniTable parsList={parsList}
                            collid={collid}
                            getParticipantList={getParticipantList}
                            par_currentPage={par_currentPage}
                            par_has_next={par_has_next}
                            par_has_previous={par_has_previous}
                            par_total_number={par_total_number}
                            size={size}
                            />
                        </Col>
                        
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}