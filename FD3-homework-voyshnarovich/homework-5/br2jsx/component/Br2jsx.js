import React from 'react';
import PropTypes from 'prop-types';

import './Br2jsx.css'

class Br2jsx extends React.Component {
    static propTypes ={

    }

    state = {
        text: this.props.text
    }
    
    render() {
        let textCustom = this.state.text.split(/<br>|<br\/>|<br \/>/g).map((element, index) => {
            return <React.Fragment key={index}>{element}<br/></React.Fragment>
        })

        return <React.Fragment>
                    <div class="Br2jsx">{textCustom}</div>
                </React.Fragment>
        }
}

export default Br2jsx;
