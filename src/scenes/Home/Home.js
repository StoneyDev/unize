import React from 'react';
import { Container } from 'reactstrap';
import ScanButton from '../../components/Button/components/ScanButton/ScanButton';
import CardList from './components/CardList/CardList';
import Title from './components/Title';

const Home = () => (
  <div className="pr-2 pr-md-0">
    <Container>
      <Title />
      <CardList />
      <ScanButton />
    </Container>
  </div>
);

export default Home;
