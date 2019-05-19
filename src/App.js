import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Accuil from './components/accuil';
import control from './components/control';
import importation from './components/importation';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Accuil} exact/>
          <Route path="/importation" component={importation}/>
          <Route path="/control" component={control}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
