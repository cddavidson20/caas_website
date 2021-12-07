import React from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Pages/Home';
import Analytics from './components/Pages/Analytics';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Catalog from './components/Pages/Catalog';
import Parts from './components/Pages/PartsCatalog';
import List_Parts from './components/Pages/List_Parts';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';
import Settings from './components/Pages/Settings';


function App() {
  return (
    <div class="body">
      <Router>
        <Switch>
          <Route path="/SignUp" component={SignUp} exact />
          <Route path="/Home" component={Home} exact />
          <Route path="/Analytics" component={Analytics} exact />
          <Route path="/List_Parts" component={List_Parts} exact />
          <Route path="/Catalog" component={Catalog} exact />
          <Route path="/Parts" component={Parts} exact />
          <Route path="/" component={Login} exact /> 
          <Route path="/Settings" component={Settings} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
