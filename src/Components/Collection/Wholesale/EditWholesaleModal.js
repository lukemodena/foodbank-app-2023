import React from "react";
import {Button, Col, Form, Row, Modal} from 'react-bootstrap';

import { SuccessModal } from "../../common/SuccessModal";

export function EditWholesaleModal(props) {
    const {
        show,
        onHide,
        editwhol,
        collid,
        whoid,
        whototaldonated,
        whototalspent,
        whoremainder,
        whoreceipt,
        whonotes,
        successModalShow,
        successModalClose,
        reqStatus,
        type,
        isAdd
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
                        Cash Donations:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    
                        <Form onSubmit={editwhol}>
                            <Row>
                                <SuccessModal show={successModalShow}
                                    onHide={successModalClose}
                                    reqStatus={reqStatus}
                                    type={type}
                                    isAdd={isAdd}
                                />
                                <Col sm={6}>
                                    <Form.Group controlId='CollectionID'>
                                        <Form.Control type='hidden' name='CollectionID' disabled placeholder='CollectionID' defaultValue={collid}/>
                                    </Form.Group>
                                    <Form.Group controlId='WholesaleID'>
                                        <Form.Control type='hidden' name='WholesaleID' disabled placeholder='WholesaleID' defaultValue={whoid}/>
                                    </Form.Group>
                                    <Form.Group controlId='TotalDonated'>
                                        <Form.Label>Total Donated</Form.Label>
                                        <Form.Control type='text' name='TotalDonated' disabled placeholder='TotalDonated' defaultValue={whototaldonated}/>
                                    </Form.Group>
                                    <Form.Group controlId='AddDonation'>
                                        <Form.Label>Add Remainder</Form.Label>
                                        <Form.Control type='text' name='AddDonation' placeholder='AddDonation' defaultValue={"0"}/>
                                    </Form.Group>
                                    <Form.Group controlId='TotalSpent'>
                                        <Form.Label>Total Spent</Form.Label>
                                        <Form.Control type='text' name='TotalSpent' placeholder='TotalSpent' defaultValue={whototalspent}/>
                                    </Form.Group>
                                    {/* <Form.Group controlId='Notes'>
                                        <Form.Label>Notes</Form.Label>
                                        <Form.Control type='text' name='Notes' placeholder='Notes' defaultValue={whonotes} rows={10}/>
                                    </Form.Group> */}
                                    <Form.Group controlId='Receipt'>
                                        <Form.Label>Receipt</Form.Label>
                                        <Form.Control type='text' name='Receipt' disabled placeholder='Receipt' defaultValue={whoreceipt}/>
                                    </Form.Group>
                                    <Form.Group controlId='Remainder'>
                                        <Form.Label>Remainder</Form.Label>
                                        <Form.Control type='text' name='Remainder' disabled placeholder='Remainder' defaultValue={whoremainder}/>
                                    </Form.Group>
                                    <Form.Group style={{paddingTop: "25px"}}>
                                        <Button variant='primary' type='submit'>
                                            Save Cash Donation
                                        </Button>
                                    </Form.Group> 
                                </Col>    
                                <Col sm={6}>
                                    <Form.Group controlId='Notes'>
                                        <Form.Label>Notes</Form.Label>
                                        <Form.Control as='textarea' name='Notes' placeholder='Notes' defaultValue={whonotes} rows={19}/>
                                    </Form.Group>
                                </Col>
                            </Row>   
                        </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}