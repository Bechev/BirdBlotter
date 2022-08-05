import React from "react";
import {Row, Col, Container} from 'react-bootstrap'
import '../App.css'


function RedeemSuccess() {

    return ( 
        <Container>
            <Row>
                <Col className="align-items-center justify-content-center m-2">
                    <div><b>Congratulations! Your claim was successful!<br/>
                    Our team of Print Production Specialists have received your order & work <br/> on your handmade blotter art print has begun!<br/>
                    You should receive an email update shortly. If you have any questions please reach out to us at<br/>
                     <a href="mailto:hello@birdblotter.xyz">hello@birdblotter.xyz</a></b></div>
                </Col>
            </Row>
        </Container>
     );
}
export default RedeemSuccess;


