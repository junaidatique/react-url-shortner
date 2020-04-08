import React from 'react';
import Form from "Components/Form";
import Redirect from "Components/Redirect";
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Form} />
        <Route path="/:hash" component={Redirect} exact />
      </div>
    </Router>
  );
}

export default App;
