import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Container} from "reactstrap";
import {Frown} from "react-feather";

const CardList = () => {
  const obj = JSON.parse(localStorage.getItem('list'));

  function GenerateCardList(props) {
    const listCards = props.barCode.map((value, index) =>
      <Col key={index} className="mb-3 px-2">
        <Link key={index} to={`card/${value.id}`}>
          <div className="cardList__card-body">
            <img src={`img/logo/${value.img}`} alt={value.name}/>
          </div>
        </Link>
      </Col>
    );

    return (
      <Row xs="2" md="3" lg="4">
        {listCards}
      </Row>
    );
  }

  return (
    <Row>
      <Col xs="auto">
        <div className="filter active">Tous</div>
        <div className="filter mt-4">Récurrent</div>
      </Col>
      <Col>
        {obj && obj.length > 0 ?
          <GenerateCardList barCode={obj}/>
          :
          <div className="alert1">
            <div className="alert1__prepend">
              <Frown/>
            </div>
            <div className="alert1__body">
              <h3>Oupss</h3>
              <p>Vous n’avez aucune carte fidélité</p>
            </div>
          </div>
        }
      </Col>
    </Row>
  )
}

export default CardList;