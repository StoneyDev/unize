import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Frown } from "react-feather";

const CardList = () => {
  const obj = JSON.parse(localStorage.getItem('list'));

  function GenerateCardList(props) {
     const listCards= props.barCode.map((value,index) =>
        <Col key={index} className="p-1">
          <Link to={`card/${value.id}`} className="CardList--card-body">
            <img src={`img/logo/${value.img}`} alt={value.name} />
          </Link>
        </Col>
     );

     return (
       <Row xs="2">
         {listCards}
       </Row>
     );
  }

  return (
    <Row noGutters>
      <Col xs="1" className="mr-2">
        <div className="filter active">Tous</div>
        <div className="filter mt-4">Récurrent</div>
      </Col>
      <Col>
        {obj ?
          <GenerateCardList barCode={obj} />
          :
          <div className="alert1">
            <div className="alert1__prepend">
              <Frown />
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