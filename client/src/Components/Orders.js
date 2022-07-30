import React, {useState, useContext, useEffect} from "react";
import {Row, Col, Nav, Button, Spinner, Alert, Form, Carousel, Container} from 'react-bootstrap'
import { AccountInfoContext } from "../Context/AccountInfo";
import logo from '../images/LOGO_background.png'
import { appendSpreadsheet, getWalletData, encrypt} from "../Services/spreadsheetManagement";
import '../App.css'


function Orders() {
    let accountInfo = useContext(AccountInfoContext)
    const [orders, setOrders] = useState([]);
    const [validated, setValidated] = useState(false);
    const [alert, setAlert] = useState({active: false, content: null, variant: null})

    useEffect(() => {
        
    },[orders]);

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

    async function handleSubmit(event){

        const form = event.currentTarget;
        event.preventDefault();
        {console.log(await getWalletData(accountInfo.account))}

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
                {renderOrdersList()}
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
export default Orders;


