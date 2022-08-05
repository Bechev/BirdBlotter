import React from "react";
import {Row, Col, Nav, Button, Carousel, Container} from 'react-bootstrap'
// import { AccountInfoContext } from "../Context/AccountInfo";
import product_full from '../images/birdblotter_full.jpeg'
import product_crop from '../images/birdblotter_crop.jpeg'
import product_nft from '../images/birdblotter_NFT.png'
import '../App.css'


function Redeem() {

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

    return ( 
        <Container>
            <Row>
                {renderCarousel()}
            </Row>
            <Row>
                <Col className="d-flex align-items-center justify-content-center m-2">
                    {/* <Nav.Link href="/shippingInfo"><Button variant="light">Get your blotter</Button></Nav.Link> */}
                    <div> Redemption available after mint</div>
                </Col>
            </Row>
            <Row id="description_row">
                <span>7.5 x 7.5 Inch</span>
                <span>900 1/4 Inch Square Perforation</span>
                <span>140lb Watercolor Paper</span>
            </Row>
        </Container>
     );
}
export default Redeem;


