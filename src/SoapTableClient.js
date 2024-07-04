import React, { useState } from 'react';
import axios from 'axios';

const SoapTableClient = () => {
  const [number, setNumber] = useState('');
  const [table, setTable] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const soapEnvelope = `
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Tabla xmlns="http://tempuri.org/">
            <numero>${number}</numero>
          </Tabla>
        </soap:Body>
      </soap:Envelope>`;

    const config = {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: 'http://tempuri.org/Tabla',
      },
    };

    try {
      const response = await axios.post('/WebServices/WebServer.asmx', soapEnvelope, config);
      console.log('SOAP Response:', response.data);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const resultElements = xmlDoc.getElementsByTagName('string');
      
      if (resultElements.length > 0) {
        const results = Array.from(resultElements).map(element => element.textContent);
        setTable(results);
      } else {
        console.error('TablaResult not found in the response.');
      }
    } catch (error) {
      console.error('Error fetching SOAP data:', error);
    }
  };

  return (
    <div>
      <h1>Tabla de Multiplicacion</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="number">Ingresa Numero:</label>
          <input
            type="number"
            className="form-control"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Generar Tabla</button>
      </form>
      {table.length > 0 && (
        <div className="alert alert-info">
          <strong>Multiplication Table:</strong>
          <ul>
            {table.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SoapTableClient;
