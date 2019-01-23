import React from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {
    static propTypes ={
        colors:PropTypes.array.isRequired
    }

    render() {
        let frames = this.props.colors.reduce((previousValue, currentItem, index, arr) => {
            let value = (index == 0) ? this.props.children : previousValue;

            return <div key={index} style={{border:"solid 2px " + currentItem, padding:"10px"}}>{value}</div>
        }, null)


        return(
            <div >
                {frames}
            </div>
        )
    }

}

export default RainbowFrame;