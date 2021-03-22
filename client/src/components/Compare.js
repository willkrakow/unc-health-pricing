import React, { useState, useEffect } from "react";
import { Modal, Button, ModalTitle, ListGroup, ListGroupItem } from "react-bootstrap";
import { PlusOneSharp } from "@material-ui/icons";
import LoadingRow from "./LoadingRow";
import { currencyFormatter } from '../utils'
import { RedButton } from './Buttons'

const Compare = ({ procedure_id }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const getProcedureInfo = async () => {
      const res = await fetch(`/api/procedure/${procedure_id}`);
      const jsonData = await res.json();
      setData(jsonData.data[0]);
      setLoading(false);
    };
    if (show) {
      getProcedureInfo();
    }
  }, [show, procedure_id]);

//   const sortPrices = (object) => {
//       const priceKeys = Object.keys(object).find(key => key.includes('_price'))
//       console.log(priceKeys)
//       const prices = priceKeys.map((keyThing, index) => {
//           return object[keyThing]
//       })
//       prices.sort((a, b) => a - b);
//       return prices
//   } 
  return (
    <>
      <Button onClick={handleShow} variant="info">
        <PlusOneSharp />
        Compare
      </Button>
      <Modal show={show}>
        <ModalTitle>
          {data.procedure_name}
        </ModalTitle>
        {loading && <LoadingRow />}
        {data && (
          <div>
            <ListGroup>
              <ListGroupItem>
                Aetna: {currencyFormatter.format(data.aetna_price)}
              </ListGroupItem>
              <ListGroupItem>
                BCBS: {currencyFormatter.format(data.bcbs_price)}
              </ListGroupItem>
              <ListGroupItem>
                Cash discount: {currencyFormatter.format(data.cash_price)}
              </ListGroupItem>
              <ListGroupItem className="text-muted">
                Base price: {currencyFormatter.format(data.price)}
              </ListGroupItem>
            </ListGroup>
          </div>
        )}
        <RedButton opacity={0.2} variant="danger" onClick={handleClose}>Close</RedButton>
      </Modal>
    </>
  );
};

export default Compare;
