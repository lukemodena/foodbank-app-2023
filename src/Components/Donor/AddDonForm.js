import React,{Component, useState, useRef, useEffect} from 'react';
import { Button, Form, Dropdown } from 'react-bootstrap';

import { connect } from 'react-redux';
import { addDonor } from '../../actions/donors';

import PropTypes from 'prop-types';

import { SuccessModal } from '../common/SuccessModal';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';


// export function AddDonorForm(result, addDonor) {

//     const [fname, setFname] = useState("");
//     const [lname, setLname] = useState("");
//     const [fullname, setFullname] = useState("");
//     const [Email, setEmail] = useState("");
//     const [Address1, setAddress1] = useState("");
//     const [Address2, setAddress2] = useState("");
//     const [Address3, setAddress3] = useState("");
//     const [PostCode, setPostCode] = useState("");
//     const [Notes, setNotes] = useState("");
//     const [Phone, setPhone] = useState("");
//     const [isVolunteer, setIsVolunteer] = useState("");

//     const [type, setType] = useState(null);
//     const [isAdd, setIsAdd] = useState(null);
//     const [reqStatus, setReqStatus] = useState(null);
    
//     const [value, setValue] = useState(false);

//     // Modal Handlers

//     const [successModalShow, setSuccessModalShow] = useState(false);

//     const successModalClose = () => {
//         setSuccessModalShow(false);
//     };

//     // Handle Full Name  

//     const handleFirstName = (e) => {
//         let value1 = e.target.value;
//         let value2 = lname;
//         setFname(value1);
//         getFullName(value1, value2);
//     }

//     const handleLastName = (e) => {
//         let value1 = fname;
//         let value2 = e.target.value;
//         setLname(value2);
//         getFullName(value1, value2);
//     }

//     const getFullName = (value1, value2) => {
//         let res = value1 + " " + value2;
//         setFullname(res);
//     }

//     // Form Manager

//     //const onChange = (e) => this.setState({ [e.target.name]: e.target.value });

//     // Add Donor

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         let fullName = e.target.FullName.value;
//         let firstName = e.target.FirstName.value;
//         let lastName = e.target.LastName.value;
//         let email = e.target.Email.value;
//         let address1 = e.target.Address1.value;
//         let address2 = e.target.Address3.value;
//         let address3 = e.target.Address2.value;
//         let postCode = e.target.PostCode.value.toUpperCase();
//         let donorType = `${e.target.DonorType.value}${isVolunteer}`;
//         let notes = e.target.Notes.value;
//         let phone = e.target.Phone.value;


//         console.log(fullName, firstName, lastName, email, address1, address2, address3, postCode, donorType, notes, phone);

//         //this.props.addDonor(fullName, firstName, lastName, email, address1, address2, address3, postCode, donorType, notes, phone);
//         //this.props.addressFinder(postCode);

//         let response = `${fullName} added`

//         // this.setState({
//         //     fname:"",
//         //     lname:"",
//         //     fullname:"",
//         //     Email:"",
//         //     Address1:"",
//         //     Address2:"",
//         //     Address3:"",
//         //     PostCode:"",
//         //     Notes:"N/A",
//         //     Phone:"",
//         //     isVolunteer:"",
//         //     successModalShow:true,
//         //     reqStatus:response
//         // })
//     }

//     return (
//         // Add Donor Form 
//         <div>
//             <SuccessModal show={successModalShow}
//                     onHide={successModalClose}
//                     reqStatus={result}
//                     type={type}
//                     isAdd={isAdd}
//             />
//             <Form onSubmit={(e) => handleSubmit(e)}>
//                 <Form.Group controlId='FirstName'>
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control type='text' name='FirstName' required placeholder='Enter first name...' onChange={(e) => handleFirstName(e)} value={fname}/>
//                 </Form.Group>
//                 <Form.Group controlId='LastName'>
//                     <Form.Label>Last Name</Form.Label>
//                     <Form.Control type='text' name='LastName' required placeholder='Enter last name...' onChange={(e) => handleLastName(e)} value={lname}/>
//                 </Form.Group>
//                 <Form.Group controlId='FullName'>
//                     <Form.Control type='hidden' name='FullName' disabled placeholder='FullName' value={fullname}/>
//                 </Form.Group>
//                 <Form.Group controlId='Email'>
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control type='email' name='Email' required placeholder='Enter email...' onChange={(e) => setEmail(e.target.value)} value={Email}/>
//                 </Form.Group>
//                 {/* <Form.Group controlId='Autocomplete'>
//                     <GooglePlacesAutocomplete
//                         apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
//                         selectProps={{
//                             value,
//                             onChange: setValue
//                         }}
//                     />
//                 </Form.Group> */}
//                 <Form.Group controlId='Address1'>
//                     <Form.Label>Address Line 1</Form.Label>
//                     <Form.Control type='text' name='Address1' placeholder='Enter address line 1...' onChange={(e) => setAddress1(e.target.value)} value={Address1}/>
//                 </Form.Group>
//                 <Form.Group controlId='Address2'>
//                     <Form.Label>Address Line 2</Form.Label>
//                     <Form.Control type='text' name='Address2' placeholder='Enter address line 2...' onChange={(e) => setAddress2(e.target.value)} value={Address2}/>
//                 </Form.Group>
//                 <Form.Group controlId='Address3'>
//                     <Form.Label>Address Line 3</Form.Label>
//                     <Form.Control type='text' name='Address3' placeholder='Enter address line 3...' onChange={(e) => setAddress3(e.target.value)} value={Address3}/>
//                 </Form.Group>
//                 <Form.Group controlId='PostCode'>
//                     <Form.Label>Postal Code</Form.Label>
//                     <Form.Control type='text' name='PostCode' placeholder='Enter postcode...' onChange={(e) => setPostCode(e.target.value)} value={PostCode}/>
//                 </Form.Group>
//                 <Form.Group controlId='DonorType'>
//                     <Form.Label>Donor Type</Form.Label>
//                     <Form.Select aria-label="DonorType">
//                         <option>Please select donor type...</option>
//                         <option value="1">1 Month (Both)</option>
//                         <option value="3">3 Months</option>
//                         <option value="0">Other</option>
//                     </Form.Select>
//                 </Form.Group>  
//                 <Form.Group className="mb-3" controlId="Volunteer">
//                     <Form.Check type="checkbox" label="Volunteer?" defaultValue={isVolunteer} onChange={(e) => {e.target.checked ? setIsVolunteer("v") : setIsVolunteer("")}} />
//                 </Form.Group>  
//                 <Form.Group controlId='Notes'>
//                     <Form.Label>Notes</Form.Label>
//                     <Form.Control type='text' name='Notes' placeholder='Enter any notes...' onChange={(e) => setNotes(e.target.value)} value={Notes}/>
//                 </Form.Group>
//                 <Form.Group controlId='Phone'>
//                     <Form.Label>Phone Number</Form.Label>
//                     <Form.Control type='text' name='Phone' placeholder='Enter phone number...' onChange={(e) => setPhone(e.target.value)} value={Phone}/>
//                 </Form.Group>
//                 <Form.Group style={{paddingTop: "25px"}}>
//                     <Button variant='primary' type='submit'>
//                         Add Donor
//                     </Button>
//                 </Form.Group>
//             </Form>
//         </div>
//     )
// }

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
            isAdd: true,
            address: ''
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

    // Address Auntocomplete

    handleChange = address => {
        this.setState({ address });
    };
     
    handleSelect = address => {
    geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };

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
        //this.props.addressFinder(postCode);

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
        const searchOptions = {
            location: new window.google.maps.LatLng(51.55330439999999, -0.1866832),
            componentRestrictions: { country: "gb" },
            radius: 100000
        };
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
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                        searchOptions={searchOptions}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <Form.Group controlId='Autocomplete'>
                                <Form.Label>Address Lookup</Form.Label>
                                <Form.Control type='text' {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                                />
                            </Form.Group>
                            <div className="autocomplete-dropdown-container">
                                    {loading && <div key={"loading"}>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        
                                        const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                        <div key={suggestion.description}
                                            {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                        );
                                    })}  
                            </div>
                        </div>
                        )}
                    </PlacesAutocomplete>
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
