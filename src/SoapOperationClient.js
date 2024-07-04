import React, { useState } from 'react';
import axios from 'axios';

const SoapOperationClient = () => {
  const [operation, setOperation] = useState('S');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const soapEnvelope = `
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Operaciones xmlns="http://tempuri.org/">
            <operacion>${operation}</operacion>
            <valor1>${value1}</valor1>
            <valor2>${value2}</valor2>
          </Operaciones>
        </soap:Body>
      </soap:Envelope>`;

    const config = {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: 'http://tempuri.org/Operaciones',
      },
    };

    try {
      const response = await axios.post('/WebServices/WebServer.asmx', soapEnvelope, config);
      console.log('SOAP Response:', response.data);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const resultElement = xmlDoc.getElementsByTagName('OperacionesResult')[0];
      
      if (resultElement) {
        const result = parseFloat(resultElement.textContent);
        setResult(result);
      } else {
        console.error('OperacionesResult not found in the response.');
      }
    } catch (error) {
      console.error('Error fetching SOAP data:', error);
    }
  };

  return (
    <div>
      <h1>SOAP Operaciones</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label htmlFor="operation">Operation:</label>
          <select
            className="form-control"
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            required
          >
            <option value="S">Suma</option>
            <option value="R">Resta</option>
            <option value="M">Multiplicacion</option>
            <option value="D">Division</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="value1">Dato 1:</label>
          <input
            type="number"
            className="form-control"
            id="value1"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="value2">Dato 2:</label>
          <input
            type="number"
            className="form-control"
            id="value2"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Calcular</button>
      </form>
      {result !== null && (
        <div className="alert alert-info">
          <strong>Resultado:</strong> {result}
        </div>
      )}
    </div>
  );
};

export default SoapOperationClient;
