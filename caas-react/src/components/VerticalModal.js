import React, { useEffect } from 'react';
import { Button, Modal, FormControl, FormLabel, Form, Row, Col, Dropdown } from "react-bootstrap";


function VerticalModal(props) {

    const data = props.data;

    const handleCarSubmit = async (form) => {
        var url = "updateCar/?" + new URLSearchParams({
            car_form_vin: form[0].value,
            car_form_year: form[1].value,
            car_form_make: form[2].value,
            car_form_model: form[3].value,
            car_form_date: form[4].value,
            car_form_price: form[5].value,
            car_form_num_parts: form[6].value,
        });
        var res = await fetch(url, {method: 'GET'}).catch(err => console.log(err));
        var data = await res.json();
        if (data.posted) {
            window.location.replace("/Catalog");
        } else {
            alert("Error Posting Data");
        }
    }

    const handleChange=(value, stateName)=>({
        value: value,
        stateName: stateName
    });

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Car Values
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="vin">
                                <Form.Control required defaultValue={data.vin} 
                                type="vin"
                                name="vin"
                                onChange={e => {
                                    handleChange(e.target.value, 'vin');
                                }}/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a VIN
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="year">
                                <Form.Control defaultValue={data.vehicle_year}
                                type="year"
                                name="year"
                                onChange={e => {
                                    handleChange(e.target.value, 'year');
                                }}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="make">
                                <Form.Control defaultValue={data.vehicle_make} 
                                type="make"
                                name="make"
                                onChange={e => {
                                    handleChange(e.target.value, 'make');
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridModel">
                                <Form.Control defaultValue={data.vehicle_model} 
                                type="model"
                                name="model"
                                onChange={e => {
                                    handleChange(e.target.value, 'model');
                                }}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="date">
                                <Form.Control defaultValue={data.purchase_date} 
                                type="date"
                                name="date"
                                onChange={e => {
                                    handleChange(e.target.value, 'date');
                                }}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="price">
                                <Form.Control defaultValue={data.purchase_price} 
                                type="price"
                                name="price"
                                onChange={e => {
                                    handleChange(e.target.value, 'price');
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="quantity">
                                <Form.Control defaultValue={data.number_of_parts}
                                type="quantity"
                                name="quantity"
                                onChange={e => {
                                    handleChange(e.target.value, 'quantity');
                                }}/>
                            </Form.Group>
                        </Row>

                        <div className="submit">
                            <Button variant="secondary" id="button-addon1"
                             onClick={e => {
                                e.preventDefault();
                                if (e.target.form[0].checkValidity()) {
                                    handleCarSubmit(e.target.form)
                                } else {
                                    e.target.form[0].reportValidity();
                                }
                            }}>
                                Submit
                            </Button>
                        </div>
                    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default VerticalModal;