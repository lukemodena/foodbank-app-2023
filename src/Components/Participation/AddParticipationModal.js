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
        dons,
        colldate,
        successModalShow,
        successModalClose,
        reqStatus,
        type,
        isAdd
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
                        Add Participating Donor: (Collection {colldate})
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
                                    <Form.Label>Donor</Form.Label>
                                    <Form.Select aria-label="DonorID" required name='DonorID' placeholder='DonorID'>
                                        {dons.map((don)=> (
                                            <option key={don.DonorID} value={don.DonorID}>
                                                {don.FullName}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='DonationType'>
                                    <Form.Label>Donation Type</Form.Label>
                                    <Form.Select aria-label="DonationType" required name='DonationType' placeholder='DonationType' onChange={typeChange}>
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
                                            <Form.Select aria-label="DropOffTime" required name='DropOffTime' placeholder='DropOffTime' onChange={handleChange}>
                                                <option value="11">Please specify...</option>
                                                <option value="1">07:00-08:00</option>
                                                <option value="2">08:00-09:00</option>
                                                <option value="3">09:00-10:00</option>
                                                <option value="4">10:00-11:00</option>
                                                <option value="5">11:00-12:00</option>
                                                <option value="6">12:00-13:00</option>
                                                <option value="7">13:00-14:00</option>
                                                <option value="8">14:00-15:00</option>
                                                <option value="9">15:00-16:00</option>
                                                <option value="10">16:00-17:00</option>
                                                <option value="0">Other</option>
                                            </Form.Select>
                                        }
                                </Form.Group>
                                
                                <Form.Group controlId='TotalDonated'>
                                    {donationTypeVal === '3' &&<Form.Label>Total Donated (£)</Form.Label>}
                                    {donationTypeVal === '3' &&<Form.Control type='text' name='TotalDonated' required placeholder='TotalDonated' defaultValue={totalDonatedVal} onChange={totDonChange}/>}
                                </Form.Group>
                                <Form.Group controlId='PaymentRecieved'>
                                    {donationTypeVal === '3' &&<Form.Label>Payment Recieved</Form.Label>}
                                    {donationTypeVal === '3' &&<Form.Select aria-label="PaymentRecieved" required name='PaymentRecieved' placeholder='PaymentRecieved' defaultValue={paymentRecievedVal} onChange={payRecChange}>
                                        <option>Please specify...</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </Form.Select>}
                                </Form.Group>

                                <Form.Group controlId='ParticipationNotes'>
                                    <Form.Label>Participation Notes</Form.Label>
                                    <Form.Control type='text' name='ParticipationNotes' placeholder='ParticipationNotes' />
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
                {/* <Button onClick={this.participationList}>
                    Participant List    
                </Button> */}
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => {setValue('2022-04-07 T00:00:00'); setDonationTypeVal(''); setTotalDonatedVal('0'); setPaymentRecievedVal('false'); onHide()}}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
