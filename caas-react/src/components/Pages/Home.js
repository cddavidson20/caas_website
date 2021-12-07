import React, { useState, useEffect} from 'react';
import Menubar from '../Menubar.js';
import { Button, InputGroup, FormControl, Table, Badge } from 'react-bootstrap';
import './Home.css';
import BootstrapTable from "react-bootstrap-table-next";

class Home extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            vin:"",
            make:"",
            model:"",
            model_year:"",
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
                    text: "Purchase Price"
                },
                {
                    dataField: "number_of_parts",
                    text: "Number Of Parts"
                },
                {
                    dataField: "profit_loss",
                    text: "Profit Loss"
                }
            ],
            data_val: []
        }
    }

    updateDataVal = async ()=> {
        if (typeof this.state.vin !== 'undefined') {
            var url = "getVehicle/?vin="+ this.state.vin;
        } else {
            var url = "getVehicle/";
        }
        var res = await fetch(url, {method: 'GET'}).catch(err => console.log(err));
        var data = await res.json();
        data.length = 5;
        this.setState({
            data_val: data
        });
    }

    handleChange=event=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }

    componentDidMount(){
        this.updateDataVal();
    }

    render() {
        return (
            <div>
                <Menubar/>
                <br />
                <div className="searchBar">
                    <InputGroup className="mb-3 py-4 bg-gray-100" >
                    <FormControl id="textfield" name="vin" aria-describedby="basic-addon1" onChange={this.handleChange} value={this.state.vin}/>
                    <Button variant="outline-secondary" id="button-search-vin" onClick={this.updateDataVal}>
                        Search
                    </Button>
                    </InputGroup>
                </div>
                <br />
                <div className="recents">
                    <h3>Recent Listings</h3>
                    <BootstrapTable striped bordered hover keyField="vehicle_id" data={this.state.data_val} columns={this.state.data_columns} />
                </div>
                <div className="stats">
                    <h3>Quick Stats</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Items For Sale</th>
                                <th>Items Sold</th>
                                <th>Avg Time to Sell</th>
                                <th>Avg Shipping Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2</td>
                                <td>2</td>
                                <td>0d</td>
                                <td>$10.53</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default Home;