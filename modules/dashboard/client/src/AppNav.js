import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Brand from './Brand';

export default (props) => (
  <Navbar fixedTop inverse collapseOnSelect>
    <Navbar.Header>
      <Brand/> 
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Map</NavItem>
        </LinkContainer>
        <LinkContainer exact to="/cards">
          <NavItem>Cards</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
