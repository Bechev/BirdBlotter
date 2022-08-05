import React, {useState, useContext} from "react";
import {Container, Row, Col, Button, Spinner, Alert, Form} from 'react-bootstrap'
import { AccountInfoContext } from "../Context/AccountInfo";
import moonbirds from '../contracts/Moonbirds.json'

import '../App.css'

function Mint() {
    let accountInfo = useContext(AccountInfoContext)
    const [moonbirdId, setMoonbirdId] = useState('')
    const [moonbirdOwner, setMoonbirdOwner] = useState('')
    const [formLocked, setFormLocked] = useState(false)
    const [ownershipVerified, setOwnershipVerified] = useState(false)
    const [alert, setAlert] = useState({active: false, content: null, variant: null})

    async function handleMint(){
        let price = accountInfo.mintPrice
        accountInfo.updateAccountInfo({userFeedback: `Minting a blotter for ${price/10**18} Eth`})
        try{
            await accountInfo.birdBlotterInstance.methods.publicMint(
                        moonbirdId, 
                        moonbirdOwner
                    ).send({from: accountInfo.account, value: price});
            displayAlert('Mint successful!', 'success')
        }catch(error){
            displayAlert(error.message, 'warning')
        }
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

    function displayAlert( message, variant){
        setAlert({active: true, content: message, variant: variant})
        setTimeout(function() { setAlert({active: false, content: null, variant: null}); }, 10000);
    }

    async function checkOwnership(){
        accountInfo.updateAccountInfo({userFeedback: "Verifying ownership..."})
        try{
            let owner = await accountInfo.moonbirdsInstance.methods.ownerOf(moonbirdId).call();
            if(owner === moonbirdOwner){
                displayAlert('Ownership confirmed, Mint allowed', 'success')
                // setAlert({active: true, content: 'wnership confirmed, Mint allowed', variant: "success"});
                // setTimeout(function() { setAlert({active: false, content: null, variant: null}); }, 10000);
                setOwnershipVerified(true)
                setFormLocked(true)
            }else{
                displayAlert('The moonbird id and address do not match', 'warning')
                // setAlert({active: true, content: 'The moonbird id and address do not match', variant: "warning"});
                // setTimeout(function() { setAlert({active: false, content: null, variant: null}); }, 10000);
            }
        }
        catch(error){
            displayAlert(error.message, 'warning')
            // setAlert({active: true, content: error.message, variant: "warning"})
            // setTimeout(function() { setAlert({active: false, content: null, variant: null}); }, 10000);
        }
        accountInfo.updateAccountInfo({userFeedback:null})
    }

    function renderButtons(){
        if(!ownershipVerified){
            return <Button variant="light" onClick={()=>checkOwnership()}>Check Ownership</Button>
        }else{
            if(accountInfo.dropOpened){
                return <Button variant="light" onClick={()=>handleMint()}>Mint</Button>
            }else{
                return <div>Drop is currently closed, please come back later!</div>
            }
        }
    }

    function renderUserInterface(){

        if(!window.ethereum || !accountInfo.account){
            // return <div>Please connect your wallet</div>
            return null
        }else if(!accountInfo.dropOpened){
            return null
        }else{
            if(accountInfo.walletETHBalance < accountInfo.mintPrice){
                return(
                    <div>
                        Not enough ETH to mint...
                    </div>
                )
            }else{
                return(
                    <Container>
                        <Row>
                            <Col className="d-flex align-items-center justify-content-center m-2">
                                <Form id='mint_form'>
                                    <Form.Group  controlId="moonbird_id" className="m-2">
                                        <Form.Control 
                                            type="number" 
                                            min="0"
                                            placeholder="Moonbird id"
                                            value={moonbirdId}
                                            onChange={(event) => handleIdChange(event)}/>
                                    </Form.Group>
                                    <Form.Group  controlId="moonbird_owner" className="m-2">
                                        <Form.Control 
                                            placeholder="Owner's address"
                                            value={moonbirdOwner}
                                            onChange={(event) => handleOwnerChange(event)}/>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex align-items-center justify-content-center m-2">
                                {renderButtons()}
                            </Col>
                        </Row>
                    </Container>
                )
            }
        }
    }

    // function renderUserInterface(){

    //     if(!window.ethereum || accountInfo.userFeedback || !accountInfo.account){
    //         return <div>Please connect your wallet</div>
    //     }else if(!accountInfo.dropOpened){
    //         return<div>Mint not opened yet</div>
    //     }else{
    //         if(accountInfo.accountBalance < accountInfo.mintPrice){
    //             console.log(accountInfo.accountBalance)
    //             return(
    //                 <div>
    //                     Not enough ETH to mint...
    //                 </div>
    //             )
    //         }else{
    //             return(
    //                 <Container>
    //                     <Row>
    //                         <Col className="d-flex align-items-center justify-content-center m-2">
    //                             <Form id='deposit_form'>
    //                                 <Form.Group  controlId="deposit_amount">
    //                                     <Form.Control 
    //                                         type="number" 
    //                                         min="0"
    //                                         placeholder="Moonbird id"
    //                                         value={moonbirdId}
    //                                         onChange={(event) => handleChange(event)}/>
    //                                 </Form.Group>
    //                             </Form>
    //                         </Col>
    //                     </Row>
    //                     <Row>
    //                         <Col className="d-flex align-items-center justify-content-center m-2">
    //                             <Button variant="light" onClick={()=>handleMint()}>Mint</Button>
    //                         </Col>
    //                     </Row>
    //                 </Container>
    //             )
    //         }
    //     }
    // }

    async function handleIdChange(event){
        if(!formLocked){
            if(event.target.value >= 10000){
                setMoonbirdId(10000);
            }else{
                setMoonbirdId(event.target.value)
            }
        }else{
            displayAlert('Cannot change data once ownership is validated', 'warning');
        }
    }

    async function handleOwnerChange(event){
        if(!formLocked){
            setMoonbirdOwner(event.target.value)
            if(accountInfo.web3.utils.isAddress((event.target.value).toLowerCase())){
                console.log('valid address')
            }else{
                console.log('invalid address')
            }
        }else{
            displayAlert('Cannot change data once ownership is validated', 'warning');
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
            <div className='blackOverlay'> </div>
            <Row>
                <h1><b>BirdBlotter</b></h1>
            </Row>
            <Row id="description_row">
                <span>The World's First NFT Collection With Redeemable 1/1 Hand Crafted IRL Blotter Art! </span>
                <span>A Moonbirds Community Exclusive.</span>
                <span>0.05 ETH | 08/08/22 | 4PM UTC</span>
            </Row>
            <Row id="visual_row">
                {/* {renderOptions(visualOptions)} */}
            </Row>
            <Row>
                {renderUserInterface()}
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

export default Mint;


