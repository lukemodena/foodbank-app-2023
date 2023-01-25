import React from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';


export function InfoDonorModal(props){
    const {
        show,
        onHide,
        donfullname,
        donemail,
        donaddress1,
        donaddress2,
        donaddress3,
        donpostcode,
        donnotes,
        dondonortype,
        donphone,
        doninvolveno
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
                        Contact Information:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
        
                    <Row>
                        <Col sm={6}>
                            <Modal.Body>
                                <p>
                                    Donor Type: <br />
                                    <strong>{dondonortype}</strong> <br />
                                    Full Name: <br />
                                    <strong>{donfullname}</strong> <br />
                                    Address: <br />
                                    <strong>{donaddress1} <br />
                                    {donaddress2} <br />                                    
                                    {donaddress3} <br />
                                    {donpostcode}</strong> <br />
                                    Email: <br />
                                    <strong>{donemail}</strong> <br />
                                    Phone: <br />
                                    <strong>{donphone}</strong> <br />
                                    Notes: <br />
                                    <strong>{donnotes}</strong> <br />
                                    <br />
                                    {donfullname} has participated in the collection <strong>{doninvolveno}</strong> times.
                                </p>

                            </Modal.Body>
                           
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