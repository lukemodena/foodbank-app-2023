import React from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';


export function SuccessModal(props) {
    const {
        show,
        onHide,
        reqStatus,
        type,
        isAdd,
    } = props

    const refresh = () => {
        onHide()
        //window.location.reload(false)
        // if (type !== "participant") {
        //     window.location.reload(false)
        // } else {
        //     onHide()
        // }
    }

    return (
        <div className='container'>
            <Modal
            show={show}
            size='sm'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Confirmation
                    </Modal.Title>
                </Modal.Header>

                {(type === "partdonor") &&<Modal.Body>
                    {reqStatus}
                </Modal.Body>}
                {(isAdd === false) &&<Modal.Body>
                    {reqStatus} successfully!
                </Modal.Body>}
                {(isAdd === true) &&<Modal.Body>
                    <p>{reqStatus}<br />Would you like to add another {type}?</p>
                </Modal.Body>}
                
                <Modal.Footer>
                    {(type === "partdonor") &&<Button variant='secondary' onClick={refresh}>Exit</Button>}
                    {(isAdd === false) &&<Button variant='secondary' onClick={onHide}>Exit</Button>}
                    {(isAdd === true) &&<Row>
                        <Col>
                            <Button variant='primary' onClick={onHide}>Yes</Button>
                        </Col>
                        <Col>
                            <Button variant='secondary' onClick={refresh}>Exit</Button>
                        </Col>
                    </Row>}
                </Modal.Footer>
            </Modal>
        </div>
    )
}