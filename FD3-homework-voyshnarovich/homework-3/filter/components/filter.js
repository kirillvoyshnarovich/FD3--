import React from 'react';
import PropTypes from 'prop-types';

import './filter.css';

class Filter extends React.Component {

    static propTypes = {
        list:PropTypes.arrayOf(
            PropTypes.shape({
                word: PropTypes.string.isRequired,
                key: PropTypes.number.isRequired,
            })
        ),
    }

    state =  {
        valueCheckBox: false,
        activeField: false,
        listWord: this.props.list,
    }

    sortFilterWord = () => {

        var list = this.props.list.slice()

        var sortWord = function(list) {
            list.sort(function(a, b){
                if(a.word < b.word) { return -1; }
                if(a.word > b.word) { return 1; }
            });
            return list
        }

        var filterWord = function(list) {
            list = list.filter(function(element) {
                var value = element.word.indexOf(valueField)!=-1;
                return value;
            })
            return list
        }

        if(this.state.valueCheckBox) {
            list = sortWord(list)
        }

        if(this.state.activeField) {
            var valueField = this.state.activeField;
            list = filterWord(list)
        }
        
        this.setState({listWord:list})
    }


    changeCheckBox =  (e) => {
        this.setState({valueCheckBox:e.target.checked}, this.sortFilterWord)
    }

    changeTextField = (e) => {
        this.setState({activeField:e.target.value}, this.sortFilterWord)
    };


    render() {
        var listWords = this.state.listWord.map(word => <option key={word.key} className="wrapper-filter__list-option">{word.word}</option>);
        // var listWords = this.state.listWord.map(word => React.DOM.option({key:word.key, className:"wrapper-filter__list-option"}, word.word));

        return (
            <div className='wrapper-filter'>
                <input type='checkbox' className='wrapper-filter__sort' onChange={this.changeCheckBox}/>
                <input type='text' className='wrapper-filter__field-text' onChange={this.changeTextField}/>
                <select className='wrapper-filter__list' size='5'>{listWords}</select>
            </div>
        )
        
        
        // return React.DOM.div({className:"wrapper-filter"},
        //     React.DOM.input({type:"checkbox", className:"wrapper-filter__sort", onChange:this.changeCheckBox}),
        //     React.DOM.input({type:"text", className:"wrapper-filter__field-text", onChange:this.changeTextField}),
        //     React.DOM.select({className:"wrapper-filter__list", size:5}, listWords),
        // );
    }   
};


export default Filter;