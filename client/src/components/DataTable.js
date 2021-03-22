import React, { useEffect, useState } from 'react'
import { ListGroup, Row, Col, Container, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import LoadingRow from './LoadingRow'
import { ChevronRightSharp, ChevronLeftSharp } from '@material-ui/icons'
import { searchFilter } from '../utils'
import Procedure from './Procedure'

function DataTable({ payer }) {
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ currentPage, setCurrentPage ] = useState(0)
  const [ searchQuery, setSearchQuery ] = useState('')

  const incrementPage = () => setCurrentPage(currentPage + 1)
  const decrementPage = () => setCurrentPage(currentPage - 1)


  const handlePageUpdate = (e) => setCurrentPage(e.target.value)
  useEffect(() => {
    const callApi = async () => {
      if (payer.length) {
        const res = await fetch(`/api/data/${payer}`);
        const jsonData = await res.json();
        setData(jsonData.data);
        setLoading(false);
      }
    };
    callApi()
  }, [payer])


  const handleSearch = (e) => {setSearchQuery(e.target.value)}


  if (loading) {
    return <LoadingRow />;
  }
  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12} md={4} className="d-flex justify-content-center">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search..."
            onChange={handleSearch}
            className="my-4 border-bottom border-info border-top-0 border-right-0 border-left-0 d-inline-block text-center rounded"
          />
        </Col>
      </Row>
      <ListGroup>
        {data
          .filter((item) => searchFilter(item.procedure_name, searchQuery))
          .slice(currentPage * 10, currentPage * 10 + 10)
          .map((proc, index) => (
            <Procedure key={index} proc={proc} payer={payer} />
          ))}
      </ListGroup>
      <Container>
        <Row className="justify-content-around my-3">
          <Col className="text-center">
            {currentPage > 0 && (
              <Button onClick={decrementPage} variant="outline-info">
                <ChevronLeftSharp className="text-info align-top" />
                {(currentPage - 1).toString()}
              </Button>
            )}
          </Col>
          <Col className="text-center">
            <input
              className="text-center d-inline-block"
              value={currentPage}
              placeholder={currentPage.toString()}
              type="number"
              min={0}
              max={Math.round(data.length / 10 + 0.5)}
              step={1}
              onChange={handlePageUpdate}
            />
          </Col>
          <Col className="text-center">
            {currentPage < Math.round(data.length / 10 + 0.5) && (
              <Button onClick={incrementPage} variant="outline-info">
                {(currentPage + 1).toString()}
                <ChevronRightSharp className="text-info align-top" />
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DataTable

DataTable.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object)
}

