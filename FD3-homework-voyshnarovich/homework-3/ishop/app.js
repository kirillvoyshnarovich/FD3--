"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import CardProduct from './companents/CardProduct.js'

let listProducts = require('./products.json')

let nameShop ="MyEarphones";

ReactDOM.render(
    <CardProduct name={nameShop} products={listProducts}/>,
    document.getElementById('container')
);