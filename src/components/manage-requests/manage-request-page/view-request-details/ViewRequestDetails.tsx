import React from 'react';

import Table from 'react-bootstrap/Table';

const RequestTableList = () => (
  <div>
    <Table responsive>
      <thead>
        <tr onClick={() => console.log('click on the request')}>
          <th>Request Id</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Pending</td>
          <td>Today</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Completed</td>
          <td>Yesterday</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Completed</td>
          <td>2 days ago</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default RequestTableList;
