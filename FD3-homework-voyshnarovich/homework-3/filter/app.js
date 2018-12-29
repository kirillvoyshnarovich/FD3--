"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/filter'
let listWord=require('./listWord/list.json');

ReactDOM.render(
    <Filter list={listWord}/>,
    document.getElementById('container')
);