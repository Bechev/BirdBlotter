import React, {useState, useContext} from "react";
import {Row, Col, Nav, Button, Spinner, Alert, Form, Carousel, Container} from 'react-bootstrap'
import { AccountInfoContext } from "../Context/AccountInfo";
import product_full from '../images/birdblotter_full.jpeg'
import product_crop from '../images/birdblotter_crop.jpeg'
import product_nft from '../images/birdblotter_NFT.png'
import '../App.css'


function Redeem() {
    let accountInfo = useContext(AccountInfoContext)
    const [moonbirdId, setMoonbirdId] = useState('')
    const [alert, setAlert] = useState({active: false, content: null, variant: null})

    async function handleMint(){
        if(moonbirdId=== null){
            setAlert({active: true, content: `Enter your moonbird's Id first`, variant: "warning"})    
            setTimeout(function() { setAlert({active: false, content: null, variant: null}); }, 10000);
        }else{
            // let price = accountInfo.mintPrice
            accountInfo.updateAccountInfo({userFeedback: "Validating Moonbird ownership..."})
            setAlert({active: true, content: `You are not the owner of moonbird ${moonbirdId}`, variant: "danger"})
            accountInfo.updateAccountInfo({userFeedback: "Minting..."})
            setTimeout(function() { setAlert({active: false, content: null, variant: null}); }, 10000);
            // }
            accountInfo.updateAccountInfo({userFeedback: null})
            // accountInfo.updateAccountInfo({userFeedback: "Minting..."})
            // console.log(tokenSelection)
            // try{
            //     await accountInfo.blackholeInstance.methods.publicMint(
            //         tokenSelection, 
            //         accountInfo.signedMessage.v,
            //         accountInfo.signedMessage.r,
            //         accountInfo.signedMessage.s
            //     ).send({from: accountInfo.account, value: price});
            //     setHasMinted(true);
            //     localStorage.setItem("hasMinted", true)
            // }
            // catch(error){
            //     console.log(error)
            //     setAlert({active: true, content: error.message, variant: "danger"})
            //     setTimeout(function() { setAlert({active: false, content: null, variant: null}); }, 10000);
            // }
            // setTokenSelection(null)
            // accountInfo.updateAccountInfo({userFeedback: null})
        }
        
    }

    function renderUserInterface(){
        return(
            <Container>
                <Row>
                    <Col className="d-flex align-items-center justify-content-center m-2">
                        <Form id='deposit_form'>
                            <Form.Group  controlId="deposit_amount">
                                <Form.Control 
                                    type="number" 
                                    min="0"
                                    placeholder="Moonbird id"
                                    value={moonbirdId}
                                    onChange={(event) => handleChange(event)}/>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex align-items-center justify-content-center m-2">
                        <Button variant="light" onClick={()=>handleMint()}>Mint</Button>
                    </Col>
                </Row>
            </Container>
                    )

        // if(!window.ethereum || accountInfo.userFeedback || !accountInfo.account){
        //     return null
        // }else if(!accountInfo.dropOpened){
        //     return<div>Drop Closed</div>
        // }else{
        //     if(accountInfo.accountBalance < accountInfo.mintPrice){
        //         return(
        //             <div>
        //                 Not enough ETH to mint...
        //             </div>
        //         )
        //     }else{
        //         return(
        //             <Form id='deposit_form'>
        //                 <Form.Group  controlId="deposit_amount">
        //                     <Form.Control 
        //                         type="number" 
        //                         placeholder="Deposit Amount"
        //                         value={null}
        //                         onChange={(event) => handleChange(event)}/>
        //                 </Form.Group>
        //             </Form>
        //         )
        //     }
        // }
    }

    async function handleChange(event){
        if(event.target.value >= 10000){
            setMoonbirdId(10000);
        }else{
            setMoonbirdId(event.target.value)
        }
    }

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

    function renderCarousel(){
        return(
            <Carousel fade className="carousel">
                <Carousel.Item>
                <img
                    className="d-block carousel carousel_item"
                    src={product_full}
                    alt="blotter_full"
                />
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block carousel carousel_item"
                    src={product_crop}
                    alt="blotter_crop"
                />
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="d-block carousel carousel_item"
                    src={product_nft}
                    alt="blotter_nft"
                />
                </Carousel.Item>
            </Carousel>
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
            <Row>
                {renderCarousel()}
            </Row>
            <Row>
                <Col className="d-flex align-items-center justify-content-center m-2">
                    Redeem will open after mint
                </Col>
                {/* <Col className="d-flex align-items-center justify-content-center m-2">
                    <Nav.Link href="/shippingInfo"><Button variant="light">Get your blotter</Button></Nav.Link>
                </Col> */}
            </Row>
            <Row id="description_row">
                <span>7.5 x 7.5 Inch</span>
                <span>900 1/4 Inch Square Perforation</span>
                <span>140lb Watercolor Paper</span>
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
        </Container>
     );
}
export default Redeem;


