"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import Br2jsx from './component/Br2jsx';

class Parent extends React.Component {
    static propTypes = {

    };

    render() {
        let text = "первый<br>второй<br/>третий<br />последний";
        return <Br2jsx text={text}/>;
    }
}


ReactDOM.render(
    <Parent/>,
    document.getElementById('container')
);