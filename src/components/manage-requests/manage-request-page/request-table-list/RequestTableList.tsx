import React from 'react';

import Table from 'react-bootstrap/Table';

const RequestTableList = () => (
  <React.Fragment>
    <h3>Requests</h3>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr onClick={() => console.log('click on the request')}>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry the Bird</td>
          <td>Larry the Bird 2</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  </React.Fragment>
);

export default RequestTableList;
