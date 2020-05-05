import React, { useState } from 'react';
import Barcode from 'react-barcode';
import { Container, Row, Col, Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { X, MoreVertical } from "react-feather";
import { Link, useHistory } from "react-router-dom";

const CardDetail = (props) => {
  let history = useHistory();
  const obj = JSON.parse(localStorage.getItem('list'));
  const result = obj.find(val => val.id === props.match.params.id);

  const deleteCard = () => {
    const newArrayData = obj.filter(val => val.id !== result.id);
    localStorage.setItem('list', JSON.stringify(newArrayData));
    history.push("/");
  }

  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Container>
      <Row className="text-right pt-3">
        <Col>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="white">
              <MoreVertical/>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link to={`/scanner/edit/${result.id}`}>Modifier</Link>
              </DropdownItem>
              <DropdownItem
                onClick={(e) =>
                  window.confirm("Voulez-vous vraiment supprimer cette carte ?") &&
                  deleteCard(e)
                }>
                Supprimer
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center py-4">
          <img src={`/img/logo/${result.img}`} alt={`Logo de ${result.name}`} className="img-fluid img"/>
        </Col>
      </Row>
      <Row>
        <Col md={{size: 6, offset: 3}}>
          <div className="beta">
            <div className="beta__body">
              <Barcode
                value={result.id}
                format={result.format}
                height={80}
                background="transparent"
              />
            </div>
            <div className="beta__footer">
              <h1>{result.name}</h1>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="p-4 text-center">
          <Link to="/" className="button__action exit">
            <div className="button__icon">
              <X size="28" />
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default CardDetail;