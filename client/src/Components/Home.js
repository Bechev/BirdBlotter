import React from "react";
import {Container, Row, Col, Nav} from 'react-bootstrap'
import nft from '../images/birdblotter_NFT.png'
import blotter from '../images/birdblotter_full.jpeg'
import flwr from '../images/flwr.jpeg'
import '../App.css'

function Home() {

    return ( 
        <Container className="pixeboy home_container" fluid>
            <Row className="mt-5 mb-2">
                <Col className="home_title white_border">
                What Is Birdblotter?
                </Col>
            </Row>
            <Row  className="mb-5">
                <Col className="white_border py-2">
                    <Row className='mb-2'>
                        Birdblotter is the world’s 1st NFT blotter art project
                    </Row>
                    <Row className="d-flex align-items-center justify-content-center">
                        <Col xs={12}><img src={flwr} style={{width:'100%'}}></img></Col>
                    </Row>
                </Col>
            
                <Col className="white_border py-2">
                    <Row className='mb-2'>
                        each NFT includes a 1/1 handmade redeemable blotter art print
                    </Row>
                    <Row>
                        <Col xs={12}><img src={nft} style={{width:'100%'}}></img></Col>
                    </Row>
                </Col>
                <Col className="white_border py-2">
                    <Row className='mb-2'>
                        available only to members of the moonbirds community
                    </Row>
                    <Row>
                        <Col xs={12}><img src={blotter} style={{width:'100%'}}></img></Col>
                    </Row>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col className="home_title white_border">
                HOW TO MINT YOUR BIRDBLOTTER NFT & REDEEM YOUR IRL BLOTTER ART
                </Col>
            </Row>
            <Row  className="mb-5">
                <Col className="white_border text-left py-2">
                    1. Connect the wallet you wish to use to mint your birdblotter nft. We reccomend always using a secondary wallet when particpating in any mint process.
                    <br/>
                    make sure your wallet contains at least .05 ETh + Gas!
                    <br/>
                    2. Once connected, enter the token id of your moonbird, and the public adddress of the wallet it’s held on. Then click the button below to verify eligibility.
                </Col>
                <Col className="white_border text-left py-2">
                    3. After you have verified your eligibility you will be able to use the wallet you connected in step 1 to sign and approve the transaction and mint your unique birdblotter NFT!
                    <br/>
                    Your token will be delivered to the public address of the wallet containing your moonbird that You Entered in Step 2.
                </Col>
                <Col className="white_border text-left py-2">
                    4. to redeem your 1/1 IRL Blotter Art, first transfer your newly minted birdblotter nft to a secondary wallet
                    <br/>
                    5. reconnect to the birdblotter.xyz website using the wallet holding your birdblotter token
                    <br/>
                    6. input your token ID, email, & shipping info into our secure form. work on your handmade 1/1 blotter art will begin as soon as you click redeem!
                </Col>
            </Row>

            <Row className="mb-2">
                <Col className="home_title white_border">
                SAFETY AND SECURITY
                </Col>
            </Row>
            <Row  className="mb-5">
                <Col className="white_border text-left py-2">
                    we understand that connecting to a mint website comes with real & justifiable concerns, especially with regards to the safety of your moonbird. building a reliable system to ensure that every birdblotter token & irl redeemable is reserved for the owner of its corresponding moonbird, without compromising the security of our community, has been a number 1 priority for our team.
                </Col>
                <Col className="white_border text-left py-2">
                    in addressing this, we looked to The type of verification proccess used by @ mutant cartel in their genesis drop as a guide in creating our own safe distribution mechansim.
                    <hr/>
                    birdblotter will never ask you to sign a transaction from any address other than those you connect to particpate in this mint, and redeem your IRL Blotter Art.
                </Col>
                <Col className="white_border text-left py-2">
                    you will not be required to connect the wallet holding your moonbird at any point in this process
                    <br/>
                    the only correct url for the birdblotter mint is <a href="/mint" className='link'>https://birdblotter.xyz/mint</a>
                </Col>
            </Row>

            <Row className="mb-2">
                <Col className="home_title white_border">
                MINT FAQ
                </Col>
            </Row>

            <Row  className="mb-1">
                <Col className="white_border text-left py-2">
                    When is mint?
                    <br/>
                    -the birdblotter Mint will begin at 4pm utc on 08/08/22.
                    <br/>
                    the mint will remain open until all of the first wave of NFTs Are Claimed
                    <br/>
                    <br/>
                    who is eligible to mint?
                    <br/>
                    -every moonbird holder is eligible to mint 1 birdblotter for each moonbird they hold
                </Col>
                <Col className="white_border text-left py-2">
                    How many birdblotter tokens will there be?
                    <br/>
                    -there are a total of 10,000 birdblotter nfts (one for each Moonbird)
                    <br/>
                    the mint will remain open until all of the first wave of NFT’s Are Claimed
                    <br/>
                    <br/>
                    why are only 1ooo NFTS available at launch?
                    <br/>
                    -we will be releasing the birdblotter collection in waves to ensure that every handmade irl redeemable is crafted and shipped in a timely manner
                </Col>
                <Col className="white_border text-left py-2">
                    is there a discord?
                    <br/>
                    -there is no birdblotter discord at this time, and no plans to develop one before launch.
                    <br/>
                    if we do decide to create a discord we will let the community know beforehand through official channels
                    <br/>
                    <br/>
                    how much will each birdblotter cost?
                    <br/>
                    -the mint will cost 0.05 ETh
                </Col>
            </Row>

            <Row  className="mb-5">
                <Col className="white_border text-left py-2">
                    what benefits will holders of this nft recieve?
                    <br/>
                    -each token comes with 1/1 redeemable IRL blotter art of the owner’s moonbird.
                    <br/>
                    these 7.5 x 7.5 inch prints will be handmade to order, using 140lb watercolor paper, and perforated into 900 1/2 inch squares
                </Col>
                <Col className="white_border text-left py-2">
                    is more utility planned?
                    <br/>
                    -yes!
                    <br/>
                    holders will also recieve the first 10 pieces of the non-fungible blotter collection: an artist curated collection of limited run irl blotter art, only available to birdblotter owners.
                    <br/>
                    this series will be released over the course of the next eight months between now and bicycle day 04/19/23
                </Col>
                <Col className="white_border text-left py-2">
                    will i need to mint from the wallet holding my moonbird?
                    <br/>
                    -NO!
                    <br/>
                    all transaction signing can be done from a secondary wallet.
                    <br/>
                    our system only requires the public address of the wallet holding your moonbird, and its token id, to verify your eligibility
                </Col>
            </Row>
        </Container>
     );
}

export default Home;


