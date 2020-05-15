import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Frown } from 'react-feather';
import Filter from '../Filter';

const CardList = () => {
  const obj = JSON.parse(localStorage.getItem('listShopCard'));

  function CardItem(props) {
    /* eslint-disable react/prop-types */
    // eslint-disable-next-line react/destructuring-assignment
    const listCards = props.barcode.map((value) => (
      <Col key={value.id} className="mb-3 px-2">
        <Link to={`card/${value.id}`}>
          <div className="card-item__card-body">
            <img src={`img/logo/${value.img}`} alt={value.name} />
          </div>
        </Link>
      </Col>
    ));

    return (
      <Row xs="2" md="3" lg="4">
        {listCards}
      </Row>
    );
  }

  return (
    <Row>
      <Col xs="auto">
        <Filter />
      </Col>
      <Col className="pl-1 pl-md-3">
        {obj && obj.length > 0 ? (
          <CardItem barcode={obj} />
        ) : (
          <div className="alert-error">
            <div className="alert-error__prepend">
              <Frown />
            </div>
            <div className="alert-error__body">
              <h3>Oupss</h3>
              <p>Vous n’avez aucune carte fidélité</p>
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default CardList;
