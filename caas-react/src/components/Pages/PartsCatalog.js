import React, {useState, useEffect} from 'react';
import '../../App.css';
import { Button, InputGroup, FormControl, Table, Badge, Container } from 'react-bootstrap';
import Menubar from '../Menubar';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import PartsModal from '../PartsModal';

class PartsCatalog extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            part_id: "",
            data_columns: [
                {
                    dataField: "part_id",
                    text: "Part ID"
                },
                {
                    dataField: "vin",
                    text: "VIN"
                },
                {
                    dataField: "part_type",
                    text: "Type"
                },
                {
                    dataField: "price",
                    text: "Price"
                },
                {
                    dataField: "part_status",
                    text: "Status"
                },
                {
                    dataField: "post_date",
                    text: "Post Date"
                },
                {
                    dataField: "title",
                    text: "Title"
                },
                {
                    dataField: "description",
                    text: "Description"
                },
                {
                    dataField: "brand",
                    text: "Brand"
                },
                {
                    dataField: "country_manufactured",
                    text: "Country Manufactured"
                },
                {
                    dataField: "color",
                    text: "Color"
                }
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
        if (typeof this.state.part_id !== 'undefined') {
            var url = "parts_data/?part_id="+ this.state.part_id;
        } else {
            var url = "parts_data/";
        }
        var res = await fetch(url, {method: 'GET'}).catch(err => console.log(err));
        var data = await res.json();
        this.setState({
            data_val: data
        });
    }

    searchPart =()=> {
        this.updateDataVal();
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

    componentDidMount(){
        this.searchPart();
    }

    render () {
        return (
            <div>
                <Menubar/>
                <br />
                <div className="searchBar">
                    <InputGroup className="mb-3 py-4 bg-gray-100" >
                    <FormControl id="textfield" name="part_id" aria-describedby="basic-addon1" onChange={this.handleChange} value={this.state.part_id}/>
                    <Button variant="outline-secondary" id="button-search-part_id"  onClick={this.searchPart}>
                        Search
                    </Button>
                    </InputGroup>
                </div>
                <div className="recents">
                    <h3>Catalog of Parts</h3>
                    <BootstrapTable fluid clickToSelect striped bordered hover keyField="vehicle_id" 
                        data={this.state.data_val} 
                        columns={this.state.data_columns}
                        rowEvents={this.rowEvents}
                        pagination={ paginationFactory() }
                        />
                </div>
                <PartsModal
                show={this.state.modalShow}
                onHide={this.setModalShow}
                data={this.state.row_data}
                />
            </div>
        );
    }
}

export default PartsCatalog;