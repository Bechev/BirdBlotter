import React, {useState, useContext} from "react";
import {useNavigate} from 'react-router-dom'
import {Row, Col, Button, Spinner, Alert, Form, Container} from 'react-bootstrap'
import { AccountInfoContext } from "../Context/AccountInfo";
import logo from '../images/LOGO_background.png'
import { appendSpreadsheet, encrypt } from "../Services/spreadsheetManagement";
import '../App.css'


function ShippingInfo() {
    let accountInfo = useContext(AccountInfoContext)
    const [moonbirdId, setMoonbirdId] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('')
    const [comments, setComments] = useState('')
    const [validated, setValidated] = useState(false);
    const [alert, setAlert] = useState({active: false, content: null, variant: null})
    const navigate = useNavigate()

    function renderUserFeedback(){
        if(accountInfo.userFeedback){
            return(
                <React.Fragment>
                    <div>
                        <Spinner animation="grow" variant="light"/>
                    </div>
                    <div>{accountInfo.userFeedback}</div>
                </React.Fragment>
            )
        }
    }

    function displayAlert( message, variant){
        setAlert({active: true, content: message, variant: variant})
        setTimeout(function() { setAlert({active: false, content: null, variant: null}); }, 10000);
    }

    async function handleSubmit(event){
        const form = event.currentTarget;
        event.preventDefault();
        let blotterOwner;
        if(form.checkValidity() === false){
            event.stopPropagation();
        }else{
            accountInfo.updateAccountInfo({userFeedback: "Validating Moonbird ownership..."})
            try{
                blotterOwner = await accountInfo.birdBlotterInstance.methods.ownerOf(moonbirdId).call();
            }catch(error){
                displayAlert(error.message, 'warning')
            }
            if(blotterOwner === accountInfo.account){
                displayAlert('Ownership confirmed!', 'success')
                let data = {
                    Wallet: accountInfo.account,
                    Name: encrypt(name),
                    Email: encrypt(email),
                    MoonbirdId: encrypt(moonbirdId),
                    Address1: encrypt(address1),
                    Address2: encrypt(address2),
                    City: encrypt(city),
                    State: encrypt(state),
                    Zip: encrypt(zip),
                    Country: encrypt(country),
                    Comments: encrypt(comments),
                    Shipped: 'false'
                }
                try{
                    accountInfo.updateAccountInfo({userFeedback: "redeeming blotter..."})
                    await accountInfo.birdBlotterInstance.methods.redeemBlotter(moonbirdId).send({from: accountInfo.account});
                    await appendSpreadsheet(data)
                    navigate('/redeemSuccess');
                }catch(error){
                    displayAlert(error.message, 'warning')
                }
            }else{
                displayAlert(`You are not the owner of BirdBlotter ${moonbirdId}, please try again. If this is an error, please contact us at hello@birdblotter.xyz`, 'warning')
            }
            accountInfo.updateAccountInfo({userFeedback: null})
            
        }
            // setValidated(true);

            // if (form.checkValidity() === false) {
            //     // console.log('hit')
            //     event.preventDefault();
            //     event.stopPropagation();

            
                
            // }
            // // setValidated(form.checkValidity());
            // // console.log(event)
    }

    function renderShippingForm(){
        return(
            <Form className="mb-3" noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col xs={12} md={8}>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label className="d-flex">Contact email</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
                            <Form.Control.Feedback type="invalid">Please provide a contact email</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Group controlId="formGridMoonbirdId">
                            <Form.Label className="d-flex">Monbird ID</Form.Label>
                            <Form.Control required type="number" placeholder="00000" onChange={(event) => setMoonbirdId(event.target.value)}/>
                            <Form.Control.Feedback type="invalid">Please provide a valid moonbird ID</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={12} md={6}>
                        <Form.Group controlId="formGridFirstName">
                            <Form.Label className="d-flex">Name</Form.Label>
                            <Form.Control required placeholder="First and Last Name" onChange={(event) => setName(event.target.value)}/>
                            <Form.Control.Feedback type="invalid">Please provide a contact name</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
        
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label className="d-flex">Address</Form.Label>
                    <Form.Control required placeholder="1234 Main St" onChange={(event) => setAddress1(event.target.value)}/>
                    <Form.Control.Feedback type="invalid">Please provide an address</Form.Control.Feedback>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label className="d-flex">Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" onChange={(event) => setAddress2(event.target.value)}/>
                </Form.Group>
        
                <Row className="mb-3">
                    <Col xs={12} md={4}>
                        <Form.Group controlId="formGridCity">
                            <Form.Label className="d-flex">City</Form.Label>
                            <Form.Control required placeholder='City' onChange={(event) => setCity(event.target.value)}/>
                            <Form.Control.Feedback type="invalid">Please provide a city</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                        <Form.Group controlId="formGridState">
                            <Form.Label className="d-flex">State/Province</Form.Label>
                            <Form.Control required placeholder='State' onChange={(event) => setState(event.target.value)}/>
                            <Form.Control.Feedback type="invalid">Please provide a Province / State</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={4}>
                        <Form.Group controlId="formGridZip">
                            <Form.Label className="d-flex">Zip</Form.Label>
                            <Form.Control required placeholder='Zip' onChange={(event) => setZip(event.target.value)}/>
                            <Form.Control.Feedback type="invalid">Please provide a zip</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={12} md={4}>
                        <Form.Group controlId="formGridCountry">
                            <Form.Label className="d-flex">Country</Form.Label>
                            <Form.Control required placeholder='Country' onChange={(event) => setCountry(event.target.value)}/>
                            <Form.Control.Feedback type="invalid">Please provide a country</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={8}>
                        <Form.Group controlId="formGridComments">
                            <Form.Label className="d-flex">Comments</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                placeholder='Comments'
                                rows={3} 
                                onChange={(event) => setComments(event.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
        
                <Button variant="outline-light" type='submit'>
                    Submit
                </Button>
            </Form>
        )
    }

    function renderAlert(){
        if(alert.active){
            return(
            <Col className='m-3'>
                <br/><br/>
                <Alert variant={alert.variant}>{alert.content}</Alert>
            </Col>
            )
        }

    }
    
    return ( 
        <Container>
            {/* <div className="background" style={{
                backgroundImage: `url(${logo})`,
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'}}> */}
                    <Row>
                        {renderShippingForm()}
                    </Row>
                    <Row>
                        {/* {renderUserInterface()} */}
                    </Row>
                    <Row className='m-3'>
                        {renderUserFeedback()}
                    </Row>
                    <Row className="Home_row">
                        {renderAlert()}
                    </Row>
            {/* </div> */}
        </Container>
     );
}
export default ShippingInfo;


