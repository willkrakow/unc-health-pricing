import React, { useEffect, useState, } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import DataTable from './components/DataTable'
import PayerLogo from './components/PayerLogo'

function App() {
  const [ currentPayer, setCurrentPayer ] = useState('')
  const [ payers, setPayers ] = useState([])

  const handleClick = (value) => {
    setCurrentPayer(value)
  }

  useEffect(() => {

    const getPayers = async () => {
        const res = await fetch(`/api/hello`)
        const jsonData = await res.json()
        setPayers(jsonData)
      }

  if (payers.length < 3) {
    getPayers()
  }

  }, [payers])

  return (
      <Container fluid>
        <Row className="justify-content-center">
          {payers.docs &&
            payers.docs.map((payer, index) => (
              <Col
                key={index}
                className="text-center d-flex p-3"
                xs={6}
                md={4}
                lg={3}
              >
                <Button
                  className="w-100"
                  value={payer.payer}
                  onClick={() => handleClick(payer.payer)}
                  variant={
                    currentPayer === payer.payer
                      ? "dark"
                      : "light"
                  }
                >
                  <PayerLogo className="" uri={payer.logo} />
                  {payer.payer_name}
                </Button>
              </Col>
            ))}
          <Container>
            {currentPayer && <DataTable payer={currentPayer} />}
          </Container>
        </Row>
      </Container>
  );
}


export default App;
