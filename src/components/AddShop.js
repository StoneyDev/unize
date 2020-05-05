import React from 'react';
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

const AddShop = () => {

  const listShop = [
    {
      url: 'carrefour.svg',
      name: 'Carrefour'
    },
    {
      url: 'intermarche.svg',
      name: 'Intermarché'
    },
    {
      url: 'super_u.png',
      name: 'Super U'
    },
    {
      url: 'e-leclerc.svg',
      name: 'E.Leclerc'
    },
    {
      url: 'monoprix.svg',
      name: 'Monoprix'
    },
    {
      url: 'intersport.svg',
      name: 'Intersport'
    },
    {
      url: 'auchan.svg',
      name: 'Auchan'
    },
    {
      url: 'picard.png',
      name: 'Picard'
    },
    {
      url: 'geant-casino.svg',
      name: 'Géant Casino'
    },
    {
      url: 'kiabi.png',
      name: 'Kiabi'
    },
    {
      url: 'yves_rocher',
      name: 'Yves Rocher'
    },
    {
      url: 'go_sport.png',
      name: 'GO Sport'
    },
  ];

  const GenerateShop = (props) => {
    const sortACS = props.shops.sort((a, b) => a.name.localeCompare(b.name));
    return sortACS.map((value) =>
      <Link key={value.name} to={`/scanner/${value.name}/${value.url}`}>
        <Row className="shop__container">
          <Col xs="4" className="d-flex justify-content-center">
            <img src={`img/logo/${value.url}`} alt={`${value.name}`} className="shop__logo" />
          </Col>
          <Col>
            <h1 className="shop__name">{value.name}</h1>
          </Col>
        </Row>
      </Link>
    );
  }

  return (
    <div className="px-3 px-md-0">
      <Container>
        <Row>
          <Col>
            <GenerateShop shops={listShop}/>
            <p>Un magasin est manquant ? Envoyer un email à yann.deroues@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AddShop;