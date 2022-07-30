import React from "react";
import {Container, Row, Col} from 'react-bootstrap'
import '../App.css'
import about_graphic from '../images/About_graphic.jpeg'
import about_graphic1 from '../images/About_graphic1.jpeg'

function About() {

    return ( 
        <Container>
            <Row  className="m-5">
            <Col lg={5} xs={{ span: 12, order: 2 }} className="col-lg-5 order-lg-1 order-sm-2">
                <Col>
                    <img
                    className = 'about_graphic'
                    src={about_graphic1}>
                    </img>
                </Col>
                <Col>
                    <img
                    className = 'about_graphic'
                    src={about_graphic}>
                    </img>
                </Col>
            </Col>
                <Col xs={{ span: 12, order: 1 }} lg={7} className="col-lg-7 order-lg-2 order-sm-1">
                    <Row className="text-left mb-5 ">
                        <div>Salutations!</div>
                    </Row>
                    <Row className="text-left mb-4">
                        <div className="text-left">In celebration of what would have been Jerry Garcia's 80th Birthday, and out of our love for Proof Collective, and the Moonbirds Community, <b>North Brooklyn Media Collective</b> is proud to present: <b>BirdBlotter</b>.</div> 
                    </Row>
                    <Row className="text-left mb-4">
                        <div>BirdBlotter is a <b>unique NFT collection designed exclusively for Moonbirds holders. Each BirdBlotter token allows the holder to redeem an individually crafted IRL blotter art print of their moonbird</b>. These 7.5 Inch square prints, perforated into 900 quarter inch squares, will be handmade to order, and mailed directly to your door. You will only be able to mint the token number of the bird you own, so every member of the community will have a chance to claim their print. 1000 BirdBlotter tokens will be released on launch day, and the mint will remain open until they're gone. Once all the tokens are claimed, another 1000 will be released every two weeks to ensure that everyone receives their print in a timely manner.</div>
                    </Row>
                    <Row className="text-left mb-4">
                        <div>In addition to the special print of your beloved bird, <b>holders of a BirdBlotter token will automatically receive the first ten pieces of the Non Fungible Blotter Collection</b>. Manifested by our team of talented local artists, <b>this series of original designs will be realized as blotter art by our print specialists.</b> Each piece will be released and mailed to the BirdBlotter community between now and Bicycle Day, 04/19/23. Every release will correspond to a specific date of importance in the history of the counterculture, and psychedelic communities, and will only be available to holders of a BirdBlotter token. They will never be sold or distributed again once they are released, making each date a special chance to own a limited edition piece of art. </div>
                    </Row>
                    <Row className="text-left mb-4">
                        <div>Finally, <b>members of the BirdBlotter community will have the opportunity to attend an exclusive Bicycle Day party in NYC, celebrating Albert Hoffman, and 80 years of consciousness expansion.</b> This will be a once in a lifetime occasion, and our team is already hard at work planning for an event the likes of which has never been seen before. More information will be forthcoming, but for now, just know that we have over fifteen years of experience in event production set to the task of making this a do-not-miss celebration.</div>
                    </Row>
                    <Row className="text-left mb-4">
                        <div>In creating BirdBlotter, we have brought together a team rich in a wide variety of skills, interests, and passions. North Brooklyn Media Collective, our crew of visual artists, musicians, event production professionals, print media experts, and activist investors, represents some of the very best and brightest our city has to offer. Out of this genesis of raw talent we hope to build a foundation upon which a groundbreaking new community might flourish. Since the date of that first, now infamous bicycle ride, paragons of free thinking have built associations based on love and inclusivity, and preached the value of nonconformity. These champions fought for a future based on understanding, openness, and the right to be yourself. Through the mediums of art, music, prose and poetry, and the power of the spoken word these individually came together to contest the powers-that-be for the very soul of humanity. In this endeavor we looked to the likes of Jerry Garcia, Timothy Leary, Stan Owsley, Allen Ginsburg, Ken Kesey, and so many others as our inspiration. It is our sincere hope that, in joining us on this journey, you can help us further those same goals, and make our world a better place. </div>
                    </Row>
                    <Row className="text-left mt-5 mb-4">
                        <div>Stay Grateful My Friends,</div>
                    </Row>
                    <Row className="text-left mt-5 mb-4">
                        <div>-NBKMDC.ETH (Moonbird #1652)</div>
                    </Row>
                </Col>

            </Row>
        </Container>
     );
}

export default About;


