import React from "react";
import { Container, Navbar, Nav} from "react-bootstrap";
// import {useLocation} from 'react-router-dom'
import logo from '../images/banner_logo.png'
import twitter_logo from '../images/twitter_logo.png'
// import { AccountInfoContext } from "../Context/AccountInfo";
import Connect from "./Connect.js";
import '../App.css'


export default function NavigationBar() {
  // let accountInfo = useContext(AccountInfoContext)
  // const location = useLocation()
  return (
    <React.Fragment >
      <Navbar className="navbar" bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">
        <img
          className="carousel_illustration d-block"
          src={logo}
          alt="birdblotter_logo"
          width="150"
        />
        </Navbar.Brand>
        <Navbar.Text>
              <a href="https://twitter.com/moonbirdblotter" target="_blank" rel="noopener noreferrer"> <img
                src={twitter_logo}
                alt="twitter_link"
                width="20"
                height="20" /></a>
          </Navbar.Text>    
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {/* <Nav.Link href="/">Home</Nav.Link> */}
            <Nav.Link href="/mint">Mint</Nav.Link>
            <Nav.Link href="/redeem">Redeem</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Connect/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </React.Fragment>
  );
}
