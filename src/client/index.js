import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App.js';
import Login from './components/Login';
import Register from './components/Register';
import '../css/style.css';


render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </div>
  </BrowserRouter>, document.getElementById('root')
);
registerServiceWorker();
