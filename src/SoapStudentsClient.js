import React, { useState } from 'react';
import axios from 'axios';

const SoapStudentsClient = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const soapEnvelope = `
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <Estudiantes xmlns="http://tempuri.org/" />
        </soap:Body>
      </soap:Envelope>`;

    const config = {
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        SOAPAction: 'http://tempuri.org/Estudiantes',
      },
    };

    try {
      const response = await axios.post('/WebServices/WebServer.asmx', soapEnvelope, config);
      console.log('SOAP Response:', response.data);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const resultElements = xmlDoc.getElementsByTagName('string');
      
      if (resultElements.length > 0) {
        const results = Array.from(resultElements).map(element => element.textContent.split(','));
        setStudents(results);
      } else {
        console.error('EstudiantesResult not found in the response.');
      }
    } catch (error) {
      console.error('Error fetching SOAP data:', error);
    }
  };

  return (
    <div>
      <h1>Lista de Estudiantes Array</h1>
      <button onClick={fetchStudents} className="btn btn-primary mb-4">Generar Tabla</button>
      {students.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Nota</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className={parseFloat(student[2]) >= 11 ? 'table-success' : 'table-danger'}>
                  <td>{student[0]}</td>
                  <td>{student[1]}</td>
                  <td>{student[2]}</td>
                  <td>{parseFloat(student[2]) >= 11 ? 'Aprobado' : 'Desaprobado'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SoapStudentsClient;
