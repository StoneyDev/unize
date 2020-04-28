import React from 'react';
import CardList from './CardList';
import ScanButton from "./ScanButton";
import { Container } from "reactstrap";

const test = () => {
  localStorage.clear();
}

const App = () => (
  <Container>
    <h1 className="font-weight-bold py-4">Unize</h1>
    <CardList />
    <ScanButton />
    <button onClick={test}>clear</button>
  </Container>
);

export default App;