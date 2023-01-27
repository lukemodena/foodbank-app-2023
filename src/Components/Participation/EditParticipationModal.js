import React from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import { SuccessModal } from '../common/SuccessModal';


export function EditParticipationModal(props){
    const {
        show,
        onHide,
        editpart,
        parid,
        donid,
        collid,
        whoid,
        donfullname,
        donemail,
        donaddress1,
        donaddress2,
        donpostcode,
        donnotes,
        donphone,
        pardontype,
        partotdon,
        partime,
        parnotes,
        parrec,
        value,
        donationTypeVal,
        typeChanger,
        handleChange,
        totalDonatedVal,
        paymentRecievedVal,
        totDonChange,
        payRecChange,
        successModalShow,
        successModalClose,
        reqStatus,
        type,
        isAdd
    } = props

    const changeTime = (e) => {
        let inputValue = e.target.value
        handleChange(inputValue);
    };

    const changeType = (e) => {
        let inputValue = e.target.value
        typeChanger(inputValue)
    };

    const changeTotal = (e) => {
        let inputValue = e.target.value
        totDonChange(inputValue)
    };

    const changeRecieved = (e) => {
        let inputValue = e.target.value
        payRecChange(inputValue)
    };    
    

    const handleSubmit = (e) => {
        e.preventDefault();

        let CollectionID = e.target.CollectionID.value
        let DonorID = e.target.DonorID.value;
        let ParticipantID = e.target.ParticipantID.value;
        let PaymentRecieved = paymentRecievedVal;
        let DonationType = e.target.DonationType.value;
        let originalTotalDonated = e.target.OriginalTotalDonated.value;
        let TotalDonated = totalDonatedVal;
        let DropOffTime = value;
        let Notes = e.target.ParticipationNotes.value;
        let WholesaleID = e.target.WholesaleID.value;

        let DonationChange = parseFloat(TotalDonated) - parseFloat(originalTotalDonated)
        //console.log(CollectionID, DonorID, ParticipantID, PaymentRecieved, "DonType:", DonationType, TotalDonated, DonationChange, DropOffTime, Notes, WholesaleID);

        editpart(CollectionID, DonorID, ParticipantID, PaymentRecieved, DonationType, TotalDonated, DonationChange, DropOffTime, Notes, WholesaleID);
    }


    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Participant Information:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
        
                    <Row>
                        <Col sm={6}>
                            <SuccessModal show={successModalShow}
                                onHide={successModalClose}
                                reqStatus={reqStatus}
                                type={type}
                                isAdd={isAdd}
                            />
                            <Form onSubmit={handleSubmit}>
                            
                                <Form.Group controlId='CollectionID'>
                                    <Form.Control type='hidden' name='CollectionID' disabled placeholder='CollectionID' defaultValue={collid}/>
                                </Form.Group>
                                <Form.Group controlId='WholesaleID'>
                                    <Form.Control type='hidden' name='WholesaleID' disabled placeholder='WholesaleID' defaultValue={whoid}/>
                                </Form.Group>
                                <Form.Group controlId='DonorID'>
                                    <Form.Control type='hidden' name='DonorID' disabled placeholder='DonorID' defaultValue={donid}/>
                                </Form.Group>
                                <Form.Group controlId='ParticipantID'>
                                    <Form.Control type='hidden' name='ParticipantID' disabled placeholder='ParticipantID' defaultValue={parid}/>
                                </Form.Group>
                                <Form.Group controlId='OriginalTotalDonated'>
                                    <Form.Control type='hidden' name='OriginalTotalDonated' disabled placeholder='OriginalTotalDonated' defaultValue={partotdon}/>
                                </Form.Group>

                                <Form.Group controlId='DonationType'>
                                    <Form.Label>Donation Type</Form.Label>
                                    <Form.Select aria-label="DonationType" required name='DonationType' placeholder='DonationType' onChange={changeType} defaultValue={pardontype}>
                                        <option value="">Please specify...</option>
                                        <option value="0">N/A</option>
                                        <option value="1">Drop-Off</option>
                                        <option value="2">Collection</option>
                                        <option value="3">Cash Donation</option>
                                        <option value="4">Online Order</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='DropOffTime'>
                                    {(donationTypeVal === '1' || donationTypeVal ===  '4') &&<Form.Label>Drop-Off Time</Form.Label>}
                                    {(donationTypeVal === '1' || donationTypeVal ===  '4') &&
                                        <Form.Select aria-label="DropOffTime" required name='DropOffTime' onChange={changeTime} placeholder='DropOffTime' defaultValue={partime}>
                                            <option value="N/A">Please specify...</option>
                                            <option value="07:00-08:00">07:00-08:00</option>
                                            <option value="08:00-09:00">08:00-09:00</option>
                                            <option value="09:00-10:00">09:00-10:00</option>
                                            <option value="10:00-11:00">10:00-11:00</option>
                                            <option value="11:00-12:00">11:00-12:00</option>
                                            <option value="12:00-13:00">12:00-13:00</option>
                                            <option value="13:00-14:00">13:00-14:00</option>
                                            <option value="14:00-15:00">14:00-15:00</option>
                                            <option value="16:00-17:00">16:00-17:00</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    }
                                </Form.Group>
                                
                                <Form.Group controlId='TotalDonated'>
                                    {donationTypeVal === '3' &&<Form.Label>Total Donated (£)</Form.Label>}
                                    {donationTypeVal === '3' &&<Form.Control type='text' name='TotalDonated' required placeholder='TotalDonated' onChange={changeTotal} defaultValue={partotdon} />}
                                </Form.Group>
                                <Form.Group controlId='PaymentRecieved'>
                                    {donationTypeVal === '3' &&<Form.Label>Payment Recieved</Form.Label>}
                                    {donationTypeVal === '3' &&<Form.Select aria-label="PaymentRecieved" required name='PaymentRecieved' placeholder='PaymentRecieved' onChange={changeRecieved} defaultValue={parrec}>
                                        <option>Please specify...</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Form.Select>}
                                </Form.Group>

                                <Form.Group controlId='ParticipationNotes'>
                                    <Form.Label>Participation Notes</Form.Label>
                                    <Form.Control type='text' name='ParticipationNotes' placeholder='ParticipationNotes' defaultValue={parnotes} />
                                </Form.Group>
                            
                                <Form.Group style={{paddingTop: "25px"}}>
                                    <Button variant='primary' type='submit'>
                                        Save Participant
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>    
                        <Col sm={6}>
                            <Modal.Body>
                                <p>
                                    Full Name: <br />
                                    <strong>{donfullname}</strong> <br />
                                    Address: <br />
                                    <strong>{donaddress1} <br />
                                    {donaddress2} <br />
                                    {donpostcode}</strong> <br />
                                    Email: <br />
                                    <strong>{donemail}</strong> <br />
                                    Phone: <br />
                                    <strong>{donphone}</strong> <br />
                                    Notes: <br />
                                    <strong>{donnotes}</strong> <br />
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
