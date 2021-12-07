import React from 'react';
import '../../App.css';
import AnalyticsTabs from '../Analytics-tabs';
import Menubar from '../Menubar';
class Analytics extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Menubar/>
                <div className="m-2 p-2">
                    <AnalyticsTabs />
                </div>
            </div>
        );
    }
}

export default Analytics;