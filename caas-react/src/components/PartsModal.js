import React, { useEffect } from 'react';
import { Button, Modal, FormControl, FormLabel, Form, Row, Col, Dropdown } from "react-bootstrap";


function PartsModal(props) {

    const data = props.data;

    const handlePartSubmit = async (form) => {
        var url = "updatePart/?" + new URLSearchParams({
            part_form_vin: form[0].value,
            part_form_type: form[1].value,
            part_form_price: form[2].value,
            part_form_date: form[3].value,
            part_form_status: form[4].value,
            part_form_title: form[5].value,
            part_form_description: form[6].value,
            part_form_brand: form[7].value,
            part_form_country: form[8].value,
            part_form_color: form[9].value
        });

        var res = await fetch(url, {method: 'POST'}).catch(err => console.log(err));
        var data = await res.json();
        if (data.posted) {
            window.location.replace("/Parts");
        } else {
            alert("Error Posting Data");
        }
    };

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
            Update Part Values
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate>
                        <FormLabel className="title2">Parts Form:</FormLabel>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="vin">
                                <Form.Control required defaultValue={data.vin} 
                                type="text"
                                name="vin"
                                onChange={e => {
                                    handleChange(e.target.value, 'vin');
                                }}/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a VIN
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="type">
                                <Form.Control defaultValue={data.part_type} 
                                type="text"
                                name="type"
                                onChange={e => {
                                    handleChange(e.target.value, 'type');
                                }}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="price">
                                <Form.Control defaultValue={data.price} 
                                type="number"
                                name="price"
                                onChange={e => {
                                    handleChange(e.target.value, 'price');
                                }}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="date">
                                <Form.Control defaultValue={data.part_date} 
                                type="date"
                                name="date"
                                onChange={e => {
                                    handleChange(e.target.value, 'date');
                                }}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="status">
                                <Form.Control defaultValue={data.status} 
                                type="text"
                                name="status"
                                onChange={e => {
                                    handleChange(e.target.value, 'status');
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="title">
                                <Form.Control defaultValue={data.title} 
                                type="text"
                                name="title"
                                onChange={e => {
                                    handleChange(e.target.value, 'title');
                                }}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="description">
                                <Form.Control as="textarea" rows={3} defaultValue={data.description} 
                                type="text"
                                name="description"
                                onChange={e => {
                                    handleChange(e.target.value, 'description');
                                }}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="brand">
                                <Form.Control defaultValue={data.brand} 
                                type="text"
                                name="brand"
                                onChange={e => {
                                    handleChange(e.target.value, 'brand');
                                }}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="country">
                                <Form.Control defaultValue={data.country_manufactured} 
                                type="text"
                                name="country"
                                onChange={e => {
                                    handleChange(e.target.value, 'country_manufactured');
                                }}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="color">
                                <Form.Control defaultValue={data.color} 
                                type="text"
                                name="color"
                                onChange={e => {
                                    handleChange(e.target.value, 'color');
                                }}/>
                            </Form.Group>
                        </Row>

                        <div className="submit">
                            <Button variant="secondary" id="button-addon1"
                            onClick={e => {
                                e.preventDefault();
                                if (e.target.form[0].checkValidity()) {
                                    handlePartSubmit(e.target.form)
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

export default PartsModal;