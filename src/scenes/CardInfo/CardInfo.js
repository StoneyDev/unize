import React, { useState } from 'react';
import Barcode from 'react-barcode';
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';
import { X, MoreVertical } from 'react-feather';
import { Link, useHistory } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';

const CardInfo = (props) => {
  const history = useHistory();
  const obj = JSON.parse(localStorage.getItem('listShopCard'));
  // eslint-disable-next-line react/prop-types
  const result = obj.find((val) => val.id === props.match.params.id);

  const deleteCard = () => {
    const newArrayData = obj.filter((val) => val.id !== result.id);
    localStorage.setItem('listShopCard', JSON.stringify(newArrayData));
    history.push('/');
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div>
      {result ? (
        <Container>
          <Row className="text-right pt-3">
            <Col>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color="white">
                  <MoreVertical />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <Link to={`/scanner?id=${result.id}&edit=true`}>
                      Modifier
                    </Link>
                  </DropdownItem>
                  <DropdownItem
                    onClick={(e) =>
                      // eslint-disable-next-line no-alert
                      window.confirm(
                        'Voulez-vous vraiment supprimer cette carte ?'
                      ) && deleteCard(e)
                    }
                  >
                    Supprimer
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center py-4">
              <img
                src={`/img/logo/${result.img}`}
                alt={`Logo de ${result.name}`}
                className="logo"
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 6, offset: 3 }}>
              <div className="box">
                <div className="box__body">
                  <Barcode
                    value={result.id}
                    format={result.format}
                    height={80}
                    background="transparent"
                  />
                </div>
                <div className="box__footer">
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
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default CardInfo;
