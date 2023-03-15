import React from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import { SuccessModal } from '../common/SuccessModal';

export function AddParticipationModal(props){
    const {
        show,
        onHide,
        addpart,
        collid,
        whoid,
        colldate,
        successModalShow,
        successModalClose,
        reqStatus,
        type,
        isAdd,
        donid,
        donfullname,
        colldateread
    } = props

    const [value, setValue] = React.useState('N/A');
    const handleChange = (e) => {
        setValue(e.target.value);
      };

    const [donationTypeVal, setDonationTypeVal] = React.useState('')
    const typeChange = (e) => {
        setDonationTypeVal(e.target.value);
    };

    const [totalDonatedVal, setTotalDonatedVal] = React.useState('0')
    const totDonChange = (e) => {
        setTotalDonatedVal(e.target.value);
    };

    const [paymentRecievedVal, setPaymentRecievedVal] = React.useState('false')
    const payRecChange = (e) => {
        setPaymentRecievedVal(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let CollectionID = e.target.CollectionID.value;
        let DonorID = e.target.DonorID.value;
        let PaymentRecieved = paymentRecievedVal;
        let DonationType = e.target.DonationType.value;
        let TotalDonated = totalDonatedVal;
        let DropOffTime = value;
        let Notes = e.target.ParticipationNotes.value;
        let WholesaleID = e.target.WholesaleID.value;

        setValue('N/A'); 
        setDonationTypeVal(''); 
        setTotalDonatedVal('0'); 
        setPaymentRecievedVal('false');
        addpart(CollectionID, DonorID, PaymentRecieved, DonationType, TotalDonated, DropOffTime, Notes, WholesaleID);
    }


    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={() => {setValue('2022-04-07 T00:00:00'); setDonationTypeVal(''); setTotalDonatedVal('0'); setPaymentRecievedVal('false'); onHide()}}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Add Participating Donor: (Collection {colldateread})
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{textAlign:"center"}}><strong>{donfullname}</strong></div>
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
                                <Form.Group controlId='DonationType'>
                                    <Form.Label>Donation Type</Form.Label>
                                    <Form.Select aria-label="DonationType" required name='DonationType' placeholder='Please specify...' onChange={typeChange}>
                                        <option value="">Please specify...</option>
                                        <option value="0">Query</option>
                                        <option value="1">Drop-Off</option>
                                        <option value="2">Collection</option>
                                        <option value="3">Cash Donation</option>
                                        <option value="4">Online Order</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='DropOffTime'>
                                    
                                        {(donationTypeVal === '1' || donationTypeVal ===  '4') &&<Form.Label>Drop-Off Time</Form.Label>}
                                        {(donationTypeVal === '1' || donationTypeVal ===  '4') &&
                                            <Form.Select aria-label="DropOffTime" required name='DropOffTime' placeholder='Please specify...' onChange={handleChange}>
                                                <option value="11">Please specify...</option>
                                                <option value="1">07:00-08:00</option>
                                                <option value="1.5">07:30-08:30</option>
                                                <option value="2">08:00-09:00</option>
                                                <option value="2.5">08:30-09:30</option>
                                                <option value="3">09:00-10:00</option>
                                                <option value="3.5">09:30-10:30</option>
                                                <option value="4">10:00-11:00</option>
                                                <option value="4.5">10:30-11:30</option>
                                                <option value="5">11:00-12:00</option>
                                                <option value="5.5">11:30-12:30</option>
                                                <option value="6">12:00-13:00</option>
                                                <option value="6.5">12:30-13:30</option>
                                                <option value="7">13:00-14:00</option>
                                                <option value="7.5">13:30-14:30</option>
                                                <option value="10">TBC</option>
                                                <option value="0">Other</option>
                                            </Form.Select>
                                        }
                                </Form.Group>
                                
                                <Form.Group controlId='TotalDonated'>
                                    {donationTypeVal === '3' &&<Form.Label>Total Donated (£)</Form.Label>}
                                    {donationTypeVal === '3' &&<Form.Control type='text' name='TotalDonated' required placeholder='Total amount donated...' defaultValue={totalDonatedVal} onChange={totDonChange}/>}
                                </Form.Group>
                                <Form.Group controlId='PaymentRecieved'>
                                    {donationTypeVal === '3' &&<Form.Label>Payment Recieved</Form.Label>}
                                    {donationTypeVal === '3' &&<Form.Select aria-label="PaymentRecieved" required name='PaymentRecieved' placeholder='Please specify...' defaultValue={paymentRecievedVal} onChange={payRecChange}>
                                        <option>Please specify...</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Form.Select>}
                                </Form.Group>

                                <Form.Group controlId='ParticipationNotes'>
                                    <Form.Label>Participation Notes</Form.Label>
                                    <Form.Control type='text' name='ParticipationNotes' placeholder='Please enter further notes here...' />
                                </Form.Group>
                            
                                <Form.Group style={{paddingTop: "25px"}}>
                                    <Button variant='primary' type='submit'>
                                        Add Participant
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => {setValue('2022-04-07 T00:00:00'); setDonationTypeVal(''); setTotalDonatedVal('0'); setPaymentRecievedVal('false'); onHide()}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
