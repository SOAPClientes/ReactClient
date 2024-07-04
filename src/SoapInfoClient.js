import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';

const SoapInfoClient = () => {
  const [info, setInfo] = useState({
    curso: '',
    ciclo: '',
    matriculados: 0,
    aprobados: 0,
    desaprobados: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const soapEnvelope = `
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <Informacion xmlns="http://tempuri.org/" />
          </soap:Body>
        </soap:Envelope>`;

      const config = {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: 'http://tempuri.org/Informacion',
        },
      };

      try {
        const response = await axios.post('/WebServices/WebServer.asmx', soapEnvelope, config);
        console.log('SOAP Response:', response.data);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const resultElement = xmlDoc.getElementsByTagName('InformacionResult')[0];
        
        if (resultElement) {
          const result = resultElement.textContent.split(',');
          setInfo({
            curso: result[0],
            ciclo: result[1],
            matriculados: parseInt(result[2]),
            aprobados: parseInt(result[3]),
            desaprobados: parseInt(result[4]),
          });
        } else {
          console.error('InformacionResult not found in the response.');
        }
      } catch (error) {
        console.error('Error fetching SOAP data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-2">
      <Card>
        <Card.Header as="h1">Informacion</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Curso:</strong> {info.curso}</ListGroup.Item>
          <ListGroup.Item><strong>Ciclo:</strong> {info.ciclo}</ListGroup.Item>
          <ListGroup.Item><strong>Matriculados:</strong> {info.matriculados}</ListGroup.Item>
          <ListGroup.Item><strong>Aprobados:</strong> {info.aprobados}</ListGroup.Item>
          <ListGroup.Item><strong>Desaprobados:</strong> {info.desaprobados}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default SoapInfoClient;
