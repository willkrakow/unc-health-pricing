import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

export default function SearchBar({ ...props }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleSearch = async (value) => {
    const test = encodeURI("NORMAL NEWBORN");
    const res = await fetch(`/api/search/aetna/${test}`);
    const jsonData = await res.json();
    console.log(jsonData);
  };


  return (
    <>
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={5}
          lg={4}
          className="d-flex justify-content-center flex-wrap"
        >
          {currentPayer && (
            <>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleChange(e)}
                className="mx-auto mb-2"
                placeholder="Search procedures..."
              />

              <Button
                variant="outline-info"
                onClick={() => handleSearch(searchQuery)}
                className="mx-auto mb-4"
              >
                Search {currentPayer.toUpperCase()} prices
              </Button>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
