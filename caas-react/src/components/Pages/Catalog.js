import React, {useState, useEffect} from 'react';
import '../../App.css';
import { Button, InputGroup, FormControl, Table, Badge } from 'react-bootstrap';
import Menubar from '../Menubar';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import VerticalModal from '../VerticalModal';
class Catalog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            vin:"",
            make:"-",
            model:"-",
            model_year:"-",
            data_columns: [
                {
                    dataField: "vin",
                    text: "VIN"
                },
                {
                    dataField: "vehicle_make",
                    text: "Make"
                },
                {
                    dataField: "vehicle_model",
                    text: "Model"
                },
                {
                    dataField: "vehicle_year",
                    text: "Year"
                },
                {
                    dataField: "purchase_date",
                    text: "Date"
                },
                {
                    dataField: "purchase_price",
                    text: "Price"
                },
                {
                    dataField: "number_of_parts",
                    text: "Number Of Parts"
                },
                {
                    dataField: "profit_loss",
                    text: "Profit Loss"
                },
            ],
            data_val: [],
            modalShow: false,
            row_data: []
        }
    }

    setModalShow=event=>{
        this.setState({ 
            modalShow: (!this.state.modalShow)
        });
    }

    updateDataVal = async ()=> {
        if (typeof this.state.vin !== 'undefined') {
            var url = "getVehicle/?vin="+ this.state.vin;
        } else {
            var url = "getVehicle/";
        }
        var res = await fetch(url, {method: 'GET'}).catch(err => console.log(err));
        var data = await res.json();
        this.setState({
            data_val: data
        });
    }

    rowEvents = {
        onClick: (e, row, rowIndex) => {
            this.setModalShow(true)
            this.setState({ 
                row_data: row
            });
        }
    };

    handleChange=event=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    searchVIN =()=> {
        this.updateDataVal();
        var url = "getVIN/"+ this.state.vin;
        fetch(url, {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                    this.setState({
                        make: data.make,
                        model: data.model,
                        model_year: data.model_year
                    });
            }).catch(err => console.log(err));
    }

    componentDidMount(){
        this.searchVIN();
    }

    render () {
        return (
            <div>
                <Menubar/>
                <br />
                <div className="searchBar">
                    <InputGroup className="mb-3 py-4 bg-gray-100" >
                    <FormControl id="textfield" name="vin" aria-describedby="basic-addon1" onChange={this.handleChange} value={this.state.vin}/>
                    <Button variant="outline-secondary" id="button-search-vin"  onClick={this.searchVIN}>
                        Search
                    </Button>
                    </InputGroup>
                </div>
                <div className="recents">
                    <h3>Search Car Statistics From VIN</h3>
                    <Table striped bordered hover responsive="md" size="md">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Model Year</th>  
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.vin}</td>
                                <td>{this.state.make}</td>
                                <td>{this.state.model}</td>
                                <td>{this.state.model_year}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="recents">
                    <h3>Catalog of Listings</h3>
                    <BootstrapTable clickToSelect striped bordered hover keyField="vehicle_id" 
                        data={this.state.data_val} 
                        columns={this.state.data_columns}
                        rowEvents={this.rowEvents}
                        pagination={ paginationFactory() }
                        />
                </div>
                <VerticalModal
                show={this.state.modalShow}
                onHide={this.setModalShow}
                data={this.state.row_data}
                />
            </div>
        );
    }
}

export default Catalog;