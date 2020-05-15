import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const AddShop = () => {
  const listShop = [
    {
      img: 'carrefour.svg',
      name: 'Carrefour',
    },
    {
      img: 'intermarche.svg',
      name: 'Intermarché',
    },
    {
      img: 'super_u.png',
      name: 'Super U',
    },
    {
      img: 'e-leclerc.svg',
      name: 'E.Leclerc',
    },
    {
      img: 'monoprix.svg',
      name: 'Monoprix',
    },
    {
      img: 'intersport.svg',
      name: 'Intersport',
    },
    {
      img: 'auchan.svg',
      name: 'Auchan',
    },
    {
      img: 'picard.png',
      name: 'Picard',
    },
    {
      img: 'geant-casino.svg',
      name: 'Géant Casino',
    },
    {
      img: 'kiabi.svg',
      name: 'Kiabi',
    },
    {
      img: 'yves_rocher.svg',
      name: 'Yves Rocher',
    },
    {
      img: 'go_sport.png',
      name: 'GO Sport',
    },
  ];

  const ShopItem = (props) => {
    // eslint-disable-next-line react/prop-types
    const sortACS = props.shops.sort((a, b) => a.name.localeCompare(b.name));
    return sortACS.map((value) => (
      <Link key={value.id} to={`/scanner?name=${value.name}&img=${value.img}`}>
        <Row className="shop__container">
          <Col xs="4" className="d-flex justify-content-center">
            <img
              src={`img/logo/${value.img}`}
              alt={`Logo de ${value.name}`}
              className="logo"
            />
          </Col>
          <Col>
            <h1 className="shop__name">{value.name}</h1>
          </Col>
        </Row>
      </Link>
    ));
  };

  return (
    <div className="px-3 px-md-0">
      <Container>
        <Row>
          <Col>
            <ShopItem shops={listShop} />
            <p className="text-center my-5">
              Un magasin est manquant ? Envoyez un email à
              yann.deroues@gmail.com
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddShop;
