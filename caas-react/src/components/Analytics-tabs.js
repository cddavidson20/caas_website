import React from "react";
import { Tab, Tabs, Container, NavDropdown, Button} from 'react-bootstrap';
import '../App.css';
import './Analytics-nav.css';
import '../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LineSeries,
  LabelSeries,
  Crosshair
} from 'react-vis';

class AnalyticsTabs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listing_data: [],
      listings_label: [],
      engagmentData: [],
      financialData: []
    }
  }

  getListingData = async () => {
    var url = "getListingData/";
    var res = await fetch(url, {method: 'GET'}).catch(err => console.log(err));
    var data = await res.json();
    this.setState({
      listing_data: data
  });
  }

  getFinancialData = async () => {
    var url = "getFinancialData/";
    var res = await fetch(url, {method: 'GET'}).catch(err => console.log(err));
    var data = await res.json();
    data.forEach(element => {
      element.x = new Date(element.x); 
    });
    this.setState({
      financialData: data
    });
  }

  getEngagementData = async () => {
    var url = "getEngagementData/";
    var res = await fetch(url, {method: 'GET'}).catch(err => console.log(err));
    var data = await res.json();
    
    this.setState({
      engagmentData: data
    });
  }

  updateListData () {
    this.setState ({
      listings_label: this.state.listing_data.map((d, idx) => ({
        x: d.x,
        y: Math.max(this.state.listing_data[idx].y)
      }))
    });
  }

  componentDidMount(){
    this.getListingData();
    this.getFinancialData();
    this.getEngagementData();
}

  render() {
    return (  
        <div>
        <h2 class="mt-3 mb-3">Analytics</h2>
        <Tabs menuVariant="dark" variant="tabs"  defaultActiveKey="1">
          <Tab eventKey="1" title="Listings">
            <div class="mt-2 card">
              <h4 class="text-center">Number Of Parts Per Vehicle</h4>
              <Container class="center">
                <XYPlot xType="ordinal" width={800} height={600} xDistance={200}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis tickLabelAngle={-25}/>
                  <YAxis />
                  <VerticalBarSeries className="vertical-bar-series-example" data={this.state.listing_data} />
                  <LabelSeries color="white" data={this.state.listings_label} />
                </XYPlot>
              </Container>
            </div>
          </Tab>
          <Tab eventKey="2" title="Financial">
            <div class="mt-2 card">
              <h4 class="text-center">Car Purchases</h4>
              <Container class="center">
                  <XYPlot xType="time" margin={{left: 100}} height={600} width={800}>
                          <LineSeries data={this.state.financialData} />
                          <VerticalGridLines />
                          <HorizontalGridLines />
                          <XAxis title="Time"/>
                          <YAxis title="Spent"/>
                  </XYPlot>
                </Container>
              </div>
          </Tab>
          <Tab eventKey="3" title="Engagement">
            <div class="mt-2 card">
              <h4 class="text-center">Interactions With Parts</h4>
              <Container class="center">
                <XYPlot xType="ordinal" margin={{bottom: 50}} width={800} height={600} xDistance={200}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis tickLabelAngle={-25}/>
                  <YAxis />
                  <VerticalBarSeries className="vertical-bar-series-example" data={this.state.engagmentData} />
                  <LabelSeries color="white" data={this.state.engagmentData} />
                </XYPlot>
              </Container>
            </div>
          </Tab>
        </Tabs>
      </div>
      );
    }
}

export default AnalyticsTabs;