import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import Connect from './Components/Connect';
import Mint from './Components/Mint';
import Home from './Components/Home';
import Redeem from './Components/Redeem';
import ShippingInfo from './Components/ShippingInfo';
import ConnexionStatus from './Components/ConnexionStatus';
import AccountInfoProvider from './Context/AccountInfo';
import ContractInfoProvider from './Context/ContractInfo';
import DropConfigProvider from './Context/DropConfig.js';
import {Routes,Route} from "react-router-dom";
import NavigationBar from './Components/Navigationbar';
import About from './Components/About';
import RedeemSuccess from './Components/RedeemSuccess';
import logo from './images/LOGO_background.png'
import './App.css'

function App() {
  return (
    <DropConfigProvider>
        <AccountInfoProvider>
          <ContractInfoProvider>
              <NavigationBar/>
            <div className="App d-flex align-items-center justify-content-center">
              <div className="background d-flex align-items-center justify-content-center" style={{backgroundImage: `url(${logo})`,}}>
                <Container>
                    <Row id='App_row' className="d-flex align-items-center justify-content-center">
                      <Col className="d-flex align-items-center justify-content-center">
                        <Routes>
                        <Route path="/" element={<Home/>}/>
                          <Route path="/about" element={<About/>}/>
                          <Route path="/mint" element={<Mint />} />
                          <Route path="/redeem" element={<Redeem />} />
                          <Route path="/shippingInfo" element={<ShippingInfo />} />
                          <Route path="/redeemSuccess" element={<RedeemSuccess />} />
                          {/* <Route path="/my_orders" element={<Orders />} /> */}
                        </Routes>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="d-flex align-items-center justify-content-center">
                        <ConnexionStatus/>
                      </Col>
                    </Row>
                </Container>
              </div>
            </div>
          </ContractInfoProvider>
        </AccountInfoProvider>
      </DropConfigProvider>
  );
}

export default App;