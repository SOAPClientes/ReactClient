import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ejercicio Mensaje</Card.Title>
              <Link to="/ejercicio1">
                <Button variant="primary">Ver Ejercicio </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ejercicio Información</Card.Title>
              <Link to="/ejercicio2">
                <Button variant="primary">Ver Ejercicio </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ejercicio Operaciones</Card.Title>
              <Link to="/ejercicio3">
                <Button variant="primary">Ver Ejercicio </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ejercicio Tabla de Multiplicacion</Card.Title>
              <Link to="/ejercicio4">
                <Button variant="primary">Ver Ejercicio </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ejercicio Lista de Estudiantes Arrays</Card.Title>
              <Link to="/ejercicio5">
                <Button variant="primary">Ver Ejercicio</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ejercicio Lista de Estudiantes</Card.Title>
              <Link to="/ejercicio6">
                <Button variant="primary">Ver Ejercicio</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
