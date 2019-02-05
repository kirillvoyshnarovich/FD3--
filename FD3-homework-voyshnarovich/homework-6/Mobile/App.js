"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany.js';

let listData = require('./data.json')

ReactDOM.render(
  <MobileCompany listClients={listData}/>
  , document.getElementById('container')
);

