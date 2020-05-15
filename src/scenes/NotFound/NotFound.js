import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Container className="d-flex vh-100 justify-content-center align-items-center text-center">
    <Row>
      <Col>
        <h1 className="font-weight-bold">Impossible de trouver cette page</h1>
        <p>
          Le lien que vous avez suivi est peut-être rompu, ou la page a été
          supprimée.
        </p>
        <Link to="/" className="mt-4 button__action text">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Revenir à l'accueil
        </Link>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
