import React from "react";
import { Navbar } from "react-bootstrap";

import './Brand.css';

import Logo from './Logo';

export default (props) => (
  <Navbar.Brand className="Brand">
    <Logo/>
    <Navbar.Text className="Brand-text">drone-net</Navbar.Text>
  </Navbar.Brand>
);
