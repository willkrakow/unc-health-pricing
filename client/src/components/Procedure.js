import React from 'react'
import { ListGroupItem, Container, Row, Col } from 'react-bootstrap'
import { currencyFormatter, percentSavings } from '../utils'
import Compare from './Compare'
import PropTypes from 'prop-types'

const Procedure = (proc, payer) => {
  return (
    <ListGroupItem className="d-flex justify-around">
      <Container fluid>
        <Row>
          <Col xs={12} md={8} lg={6}>
            <h5 className="font-weight-light">{proc.procedure_name}</h5>
            <Compare procedure_id={proc._id} />
          </Col>
          <Col xs={12} md={3} lg={3}>
            <p className="d-inline-block w-100 mb-1">Total procedure price:</p>
            <h5 className="d-inline-block w-100 font-weight-bold">
              {currencyFormatter.format(proc[`${payer}_price`])}
            </h5>
          </Col>
          <Col xs={12} md={3}>
            <p className="text-muted d-inline-block w-100 text-left">
              Without insurance: <br />
              <span className="font-weight-bold text-dark">
                {currencyFormatter.format(proc.price)}
              </span>
            </p>
            <p className="text-left d-inline-block w-100 text-muted">
              Savings: <br />
              <span className="text-success font-weight-bold">
                {currencyFormatter.format(proc.price - proc[`${payer}_price`])}
              </span>{" "}
              <span className="text-success">
                ({percentSavings(proc[`${payer}_price`], proc.price)}%)
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </ListGroupItem>
  );
}

export default Procedure

Procedure.propTypes = {
    proc: PropTypes.object,
    payer: PropTypes.string,
}