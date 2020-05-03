import React from 'react';
import CardList from './CardList';
import ScanButton from "./ScanButton";
import { Container, Row, Col } from "reactstrap";

const App = () => (
  <div className="px-3 px-md-0">
    <Container>
      <Row>
        <Col>
          <h1 className="font-weight-bold py-4">Unize</h1>
        </Col>
      </Row>
      <CardList/>
      <ScanButton/>
    </Container>
  </div>
);

export default App;