import React,{Component} from 'react';
import { Button, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addDonor } from '../../actions/donors';

import { SuccessModal } from '../common/SuccessModal';


export class AddDonorForm extends Component{

    constructor(props){
        super(props);
        this.state={
            fname:"",
            lname:"",
            fullname:"",
            Email:"",
            Address1:"",
            Address2:"",
            Address3:"",
            PostCode:"",
            Notes:"N/A",
            Phone:"",
            isVolunteer:"",
            successModalShow:false,
            reqStatus:"",
            type:"contact",
            isAdd: true
        }
    };

    static propTypes = {
        addDonor: PropTypes.func.isRequired,
        result: PropTypes.string.isRequired,
    };

    // Handle Full Name  


    handleFirstName = (e) => {
        let value1 = e.target.value;
        let value2 = this.state.lname
        this.setState(prevState => ({
            ...prevState.fname,
            fname: value1
        }));
        this.getFullName(value1, value2)
    }

    handleLastName = (e) => {
        let value1 = this.state.fname
        let value2 = e.target.value;
        this.setState(prevState => ({
            ...prevState.lname,
            lname: value2
        }));
        this.getFullName(value1, value2)
    }

    getFullName = (value1, value2) => {
        let res = value1 + " " + value2;
        this.setState(prevState => ({
            ...prevState.fullname,
            fullname: res
        }));
    }

    // Form Manager

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    // Add Donor

    handleSubmit = (e) => {
        e.preventDefault()
        let fullName = e.target.FullName.value;
        let firstName = e.target.FirstName.value;
        let lastName = e.target.LastName.value;
        let email = e.target.Email.value;
        let address1 = e.target.Address1.value;
        let address2 = e.target.Address3.value;
        let address3 = e.target.Address2.value;
        let postCode = e.target.PostCode.value.toUpperCase();
        let donorType = `${e.target.DonorType.value}${this.state.isVolunteer}`;
        let notes = e.target.Notes.value;
        let phone = e.target.Phone.value;


        console.log(donorType)

        this.props.addDonor(fullName, firstName, lastName, email, address1, address2, address3, postCode, donorType, notes, phone);

        let response = `${fullName} added`

        this.setState({
            fname:"",
            lname:"",
            fullname:"",
            Email:"",
            Address1:"",
            Address2:"",
            Address3:"",
            PostCode:"",
            Notes:"N/A",
            Phone:"",
            isVolunteer:"",
            successModalShow:true,
            reqStatus:response
        })
    }


    render() {
        let successModalClose=()=>this.setState({successModalShow:false});
        return (
            // Add Donor Form 
            <div>
                <SuccessModal show={this.state.successModalShow}
                        onHide={successModalClose}
                        reqStatus={this.props.result}
                        type={this.state.type}
                        isAdd={this.state.isAdd}
                />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId='FirstName'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type='text' name='FirstName' required placeholder='Enter first name...' onChange={this.handleFirstName} value={this.state.fname}/>
                    </Form.Group>
                    <Form.Group controlId='LastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type='text' name='LastName' required placeholder='Enter last name...' onChange={this.handleLastName} value={this.state.lname}/>
                    </Form.Group>
                    <Form.Group controlId='FullName'>
                        <Form.Control type='hidden' name='FullName' disabled placeholder='FullName' value={this.state.fullname}/>
                    </Form.Group>
                    <Form.Group controlId='Email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' name='Email' required placeholder='Enter email...' onChange={this.onChange} value={this.state.Email}/>
                    </Form.Group>
                    <Form.Group controlId='Address1'>
                        <Form.Label>Address Line 1</Form.Label>
                        <Form.Control type='text' name='Address1' placeholder='Enter address line 1...' onChange={this.onChange} value={this.state.Address1}/>
                    </Form.Group>
                    <Form.Group controlId='Address2'>
                        <Form.Label>Address Line 2</Form.Label>
                        <Form.Control type='text' name='Address2' placeholder='Enter address line 2...' onChange={this.onChange} value={this.state.Address2}/>
                    </Form.Group>
                    <Form.Group controlId='Address3'>
                        <Form.Label>Address Line 3</Form.Label>
                        <Form.Control type='text' name='Address3' placeholder='Enter address line 3...' onChange={this.onChange} value={this.state.Address3}/>
                    </Form.Group>
                    <Form.Group controlId='PostCode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control type='text' name='PostCode' placeholder='Enter postcode...' onChange={this.onChange} value={this.state.PostCode}/>
                    </Form.Group>
                    <Form.Group controlId='DonorType'>
                        <Form.Label>Donor Type</Form.Label>
                        <Form.Select aria-label="DonorType">
                            <option>Please select donor type...</option>
                            <option value="1">1 Month (Both)</option>
                            <option value="3">3 Months</option>
                            <option value="0">Other</option>
                        </Form.Select>
                    </Form.Group>  
                    <Form.Group className="mb-3" controlId="Volunteer">
                        <Form.Check type="checkbox" label="Volunteer?" defaultValue={this.state.isVolunteer} onChange={(e) => {e.target.checked ? this.setState({isVolunteer:"v"}) : this.setState({isVolunteer:""})}} />
                    </Form.Group>  
                    <Form.Group controlId='Notes'>
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type='text' name='Notes' placeholder='Enter any notes...' onChange={this.onChange} value={this.state.Notes}/>
                    </Form.Group>
                    <Form.Group controlId='Phone'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type='text' name='Phone' placeholder='Enter phone number...' onChange={this.onChange} value={this.state.Phone}/>
                    </Form.Group>
                    <Form.Group style={{paddingTop: "25px"}}>
                        <Button variant='primary' type='submit'>
                            Add Donor
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

// Reducer

const mapStateToProps = (state) => ({
    result: state.donors.result
});

export default connect(mapStateToProps, { addDonor })(AddDonorForm)
