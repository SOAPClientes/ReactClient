import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SoapClient = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const soapEnvelope = `
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <Mensaje xmlns="http://tempuri.org/" />
          </soap:Body>
        </soap:Envelope>`;

      const config = {
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          SOAPAction: 'http://tempuri.org/Mensaje',
        },
      };

      try {
        const response = await axios.post('/WebServices/WebServer.asmx', soapEnvelope, config);
        console.log('SOAP Response:', response.data);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const resultElement = xmlDoc.getElementsByTagName('MensajeResult')[0];
        
        if (resultElement) {
          const result = resultElement.textContent;
          setMessage(result);
        } else {
          console.error('MensajeResult not found in the response.');
        }
      } catch (error) {
        console.error('Error fetching SOAP data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>SOAP Message:</h1>
      <p>{message}</p>
    </div>
  );
};

export default SoapClient;
