import React, { useState, useEffect}  from 'react';
import '../../App.css';
import Menubar from '../Menubar';
import { Button, FormControl, FormLabel, Form, Row, Col, Dropdown } from "react-bootstrap";
import './List_Parts.css';
class List_Parts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validatedCarForm: false,
            setValidatedCarForm: false,
            car_form_vin: "",
            car_form_year: "",
            car_form_make: "",
            car_form_model: "",
            car_form_date: "",
            car_form_price: "",
            car_form_num_parts: "",
            validatedPartForm: false,
            setValidatedPartForm: false,
            part_form_vin: "",
            part_form_type: "",
            part_form_price: "",
            part_form_status: "",
            part_form_date: "",
            part_form_title: "",
            part_form_description: "",
            part_form_brand: "",
            part_form_country: "",
            part_form_color: ""
        }
    }

    handleCarSubmit = async (form) => {
        var url = "addCar/?" + new URLSearchParams({
            car_form_vin: form[0].value,
            car_form_year: form[1].value,
            car_form_make: form[2].value,
            car_form_model: form[3].value,
            car_form_date: form[4].value,
            car_form_price: form[5].value,
            car_form_num_parts: form[6].value,
        });
        var res = await fetch(url, {method: 'POST'}).catch(err => console.log(err));
        var data = await res.json();
        if (data.posted) {
            this.setState({
                setValidatedCarForm: true
            });
            window.location.replace("/List_Parts");
        } else {
            alert("Error Posting Data");
        }
    }

    handlePartSubmit = async (form) => {
        var url = "addPart/?" + new URLSearchParams({
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
            this.setState({
                setValidatedPartForm: true
            });
            window.location.replace("/List_Parts");
        } else {
            alert("Error Posting Data");
        }
    };

    handleChange=(value, stateName)=>({
        value: value,
        stateName: stateName
    });

    render() {
        return (
            <div>
                <Menubar />
                    <Form noValidate validated={this.validatedCarForm} onChange={this.handleChange}>
                        <FormLabel className="title1">Car Form:</FormLabel>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="vin">
                                <Form.Control required placeholder="Enter VIN" 
                                type="text"
                                name="vin"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'vin');
                                }}/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a VIN
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="year">
                                <Form.Control placeholder="Enter Year" 
                                type="number"
                                name="year"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'year');
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="make">
                                <Form.Control placeholder="Make" 
                                type="text"
                                name="make"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'make');
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="model">
                                <Form.Control placeholder="Model" 
                                type="text"
                                name="model"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'model');
                                }}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="date">
                                <Form.Control placeholder="Purchase Date (mm/dd/yyyy)" 
                                type="date"
                                name="date"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'date');
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="price">
                                <Form.Control placeholder="Purchase Price ($)" 
                                type="number"
                                name="price"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'price');
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="quantity">
                                <Form.Control placeholder="Enter Number Of Parts" 
                                type="number"
                                name="quantity"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'quantity');
                                }}/>
                            </Form.Group>
                        </Row>

                        <div className="submit">
                            <Button variant="secondary" id="button-addon1"
                             onClick={e => {
                                e.preventDefault();
                                if (e.target.form[0].checkValidity()) {
                                    this.handleCarSubmit(e.target.form)
                                } else {
                                    e.target.form[0].reportValidity();
                                }
                            }}>
                                Submit
                            </Button>
                        </div>
                    </Form>

                    <Form noValidate validated={this.validatedPartForm}>
                        <FormLabel className="title2">Parts Form:</FormLabel>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="vin">
                                <Form.Control required placeholder="Enter VIN" 
                                type="text"
                                name="vin"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'vin');
                                }}/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter a VIN
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="type">
                                <Form.Control placeholder="Enter part type" 
                                type="text"
                                name="type"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'type');
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="price">
                                <Form.Control placeholder="Enter part price ($)" 
                                type="number"
                                name="price"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'price');
                                }}/>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="date">
                                <Form.Control placeholder="Purchase Date (mm/dd/yyyy)" 
                                type="date"
                                name="date"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'date');
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="status">
                                <Form.Control placeholder="Enter part status" 
                                type="text"
                                name="status"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'status');
                                }}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="title">
                                <Form.Control placeholder="Post Title" 
                                type="text"
                                name="title"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'title');
                                }}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="description">
                                <Form.Control as="textarea" rows={3} placeholder="Description (Max 150)" 
                                type="text"
                                name="description"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'description');
                                }}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3 margin-change">
                            <Form.Group as={Col} controlId="brand">
                                <Form.Control placeholder="Brand" 
                                type="text"
                                name="brand"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'brand');
                                }}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="country">
                                <Form.Control placeholder="Country" 
                                type="text"
                                name="country"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'country');
                                }}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="color">
                                <Form.Control placeholder="Color" 
                                type="text"
                                name="color"
                                onChange={e => {
                                    this.handleChange(e.target.value, 'color');
                                }}/>
                            </Form.Group>
                        </Row>

                        <div className="submit">
                            <Button variant="secondary" id="button-addon1"
                            onClick={e => {
                                e.preventDefault();
                                if (e.target.form[0].checkValidity()) {
                                    this.handlePartSubmit(e.target.form)
                                } else {
                                    e.target.form[0].reportValidity();
                                }
                            }}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
        );
    }
}

export default List_Parts;