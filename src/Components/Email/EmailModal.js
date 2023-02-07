import React, {useState} from "react";
import {Dropdown, Button, Form, Row, Modal} from 'react-bootstrap';
import { SuccessModal } from "../common/SuccessModal";

import { handleCollectionDateEmail } from "../common/dateFuncs";

export function WriteEmail(props) {
    const {
        show,
        onHide,
        send,
        colldate,
        colltotalweight,
        collphoto,
        emaillist,
        foodlist,
        successModalShow,
        successModalClose,
        reqStatus,
        type,
        isAdd
    } = props

    const [emailType, setEmailType] = useState('Create New Email...');
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");

    const emailSignOff = '\nYour support is very much appreciated.\n \nKindest wishes\nJackie\njsp.foodcollection@gmail.com\n07764 614151';

    const setFirstSubject = () => {
        setSubject(`FOOD COLLECTION ${handleCollectionDateEmail(colldate).toUpperCase()} PLEASE HELP FEED LOCAL PEOPLE IN FOOD CRISIS`);
    };

    const setFirstBody = () => {
        setBody(`Dear Neighbours\n \nThank you for supporting the Neighbours Food Collection for Camden Foodbank. More than ever foodbanks are playing a key role in feeding people who would otherwise go hungry.\n \nThe next Neighbours collection to help local people in food crisis is on ${handleCollectionDateEmail(colldate)}. If you can donate food in these difficult times your help would be greatly appreciated\n \nCamden Foodbank urgently needs the following targeted food items:\n \n${foodlist}\n \nIf you would like to donate food on ${handleCollectionDateEmail(colldate)} you can do so as follows:\n \n1.	DELIVER - Email me DELIVER and bring the food around to my home between 8.00 a.m. and 1.00 p.m on ${handleCollectionDateEmail(colldate)}.\n \n2.	INTERNET SHOPPING - Email me INTERNET and send the targeted food to my home between 8.00 a.m. and 1.00 p.m on ${handleCollectionDateEmail(colldate)}. (Please put your own name on the delivery so that I can check it in).\n \nMy address is Ground Floor Flat, 12 Frognal Lane, London NW3 7DU. (Sometimes I may be registered as Flat 2).\n${emailSignOff}`);
    };

    const setReminderSubject = () => {
        setSubject(`REMINDER - FOOD COLLECTION ${handleCollectionDateEmail(colldate).toUpperCase()} PLEASE HELP FEED LOCAL PEOPLE IN FOOD CRISIS`);
    };

    const setReminderBody = () => {
        setBody(`Dear Neighbours\n \nA reminder that I am coming around doing a door to door collection of food for local people in food crisis for Camden Foodbank on ${handleCollectionDateEmail(colldate)}. If you can donate food in these difficult times your help would be greatly appreciated\n \nIf you would like to donate and you haven’t already contacted me, please see below for two ways to donate:\n \nCamden Foodbank urgently needs the following targeted food items:\n \n${foodlist}\n \nIf you would like to donate food on ${handleCollectionDateEmail(colldate)} you can do so as follows:\n \n1.	COLLECT - Email me COLLECT and leave the food you are donating outside your property between 9.00 a.m. and 1.00 p.m on ${handleCollectionDateEmail(colldate)}.\n2.	INTERNET SHOPPING - Email me INTERNET and send the targeted food to my home between 8.00 a.m. and 1.00 p.m on ${handleCollectionDateEmail(colldate)}. (Please put your own name on the delivery so that I can check it in).\n \nMy address is Ground Floor Flat, 12 Frognal Lane, London NW3 7DU. (Sometimes I may be registered as Flat 2).\n${emailSignOff}`);
    };

    const setPostSubject = () => {
        setSubject(`${colltotalweight}KG OF FOOD WAS DONATED YESTERDAY FOR LOCAL PEOPLE IN FOOD POVERTY - A VERY BIG THANK YOU TO THE NEIGHBOURS`);
    };

    const setPostBody = () => {
        setBody(`Dear Neighbours\n \nThank you for your generosity, today we collected ${colltotalweight}kg of Food for local people in food crisis. Camden Foodbank is very grateful for your continued support. Demand is extremely high so a collection this size is unbelievably helpful. Thank you Neighbours, we are really making a huge difference to our local community. Please see the photo attached below and also see the link below of the video and photo.\n${emailSignOff}`);
    };

    const handleSubject = (val) => {
        if (val === 'setFirstSubject' ) {
            setFirstSubject();
        } else if (val === 'setReminderSubject' ) {
            setReminderSubject();
        } else if (val === 'setPostSubject' ) {
            setPostSubject();
        } else {
            setSubject("");
        }
    }

    const handleBody = (val) => {
        if (val === 'setFirstBody' ) {
            setFirstBody()
        } else if (val === 'setReminderBody' ) {
            setReminderBody()
        } else if (val === 'setPostBody' ) {
            setPostBody()
        } else {
            setBody("")
        }
    };


    const [emailOptions, setEmailOptions] = useState([
        {
            key: 0,
            emailType: "Create New Email...",
            value: "0",
            optionType: "Blank Template",
            subject: "",
            body: ""
        },
        {
            key: 1,
            emailType: "First",
            value: "1",
            optionType: "First Email (3-4 weeks prior)",
            subject: "setFirstSubject",
            body: "setFirstBody"
        },
        {
            key: 2,
            emailType: "Reminder",
            value: "2",
            optionType: "Reminder Email (1-2 weeks prior)",
            subject: "setReminderSubject",
            body: "setReminderBody"
        },
        {
            key: 3,
            emailType: "Post-Collection",
            value: "2",
            optionType: "Post-Collection Email (within 24 hours after collection)",
            subject: "setPostSubject",
            body: "setPostBody"
        }
    ]);

    const sendEmail = (e) => {
        e.preventDefault();

        let subjectSend = e.target.Subject.value;
        let bodySend = e.target.Body.value;
        // let emailList = emaillist;
        let emailList = ['lukefrankel@hotmail.co.uk', 'luke@modena-consulting.co.uk', 'jsp.foodcollection@gmail.com', 'nickcook00@gmail.com'];

        console.log(subjectSend, bodySend, emailList);
        send(subjectSend, bodySend, emailList);
    };

    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Prepare Email:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* Email Type Filter */}

                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic">
                            {emailType}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {emailOptions.map((option) => (
                                <Dropdown.Item key={option.key} onClick={() => {handleSubject(option.subject); handleBody(option.body); setEmailType(option.emailType)}}>{option.optionType}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Row>
                            <SuccessModal show={successModalShow}
                                onHide={successModalClose}
                                reqStatus={reqStatus}
                                type={type}
                                isAdd={isAdd}
                            />
                            <Form onSubmit={sendEmail}>
                                <Form.Group controlId='Subject'>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control as='textarea' name='Subject' required placeholder='Email subject...' defaultValue={subject}/>
                                </Form.Group>
                                <Form.Group controlId='Body'>
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control as='textarea' name='Body' rows={10} required placeholder='Email body...' defaultValue={body}/>
                                </Form.Group>
                                <Form.Group style={{paddingTop: "25px"}}>
                                    <Button variant='primary' type='submit'>
                                        Send Email
                                    </Button>
                                </Form.Group> 
                            </Form>
                        
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export function WriteBasicEmail(props) {
    const {
        show,
        onHide,
        send,
        emaillist,
        length,
        fullname,
        successModalShow,
        successModalClose,
        reqStatus,
        type,
        isAdd
    } = props

    const getBody = (length, fullname) => {
        if (length === 1) {
            let name = fullname;
            return name
        } else {
            let name = "Neighbours";
            return name
        }
    };

    const subject = '';
    const body = `Dear ${getBody(length, fullname)},\n\nYour support is very much appreciated.\n \nKindest wishes\nJackie\njsp.foodcollection@gmail.com\n07764 614151`;

    const sendEmail = (e) => {
        e.preventDefault();

        let subjectSend = e.target.Subject.value;
        let bodySend = e.target.Body.value;
        //let emailList = emaillist;
        let emailList = ['lukefrankel@hotmail.co.uk', 'luke@modena-consulting.co.uk', 'jsp.foodcollection@gmail.com', 'nickcook00@gmail.com'];

        console.log(subjectSend, bodySend, emailList);
        send(subjectSend, bodySend, emailList);
    };

    return (
        <div className='container'>
            <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
                <Modal.Header closeButton onClick={onHide}>
                    <Modal.Title id='contained-modal-title-vcenter'>
                        Prepare Email:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                            <SuccessModal show={successModalShow}
                                onHide={successModalClose}
                                reqStatus={reqStatus}
                                type={type}
                                isAdd={isAdd}
                            />
                            <Form onSubmit={sendEmail}>
                                <Form.Group controlId='Subject'>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control as='textarea' name='Subject' required placeholder='Email subject...' defaultValue={subject}/>
                                </Form.Group>
                                <Form.Group controlId='Body'>
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control as='textarea' name='Body' rows={10} required placeholder='Email body...' defaultValue={body}/>
                                </Form.Group>
                                <Form.Group style={{paddingTop: "25px"}}>
                                    <Button variant='primary' type='submit'>
                                        Send Email
                                    </Button>
                                </Form.Group> 
                            </Form>
                        
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}