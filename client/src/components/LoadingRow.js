import React from 'react'
import { Row, Col, Spinner } from 'react-bootstrap'

const LoadingRow = () => (
  <Row className="justify-content-center align-items-center d-flex p-5">
    <Col className="text-center">
      <Spinner animation="border" role="status" />
    </Col>
  </Row>
);

export default LoadingRow