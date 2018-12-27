var Filter = React.createClass({
    displayName: 'filter',

    propTypes: {
        list:React.PropTypes.arrayOf(
            React.PropTypes.shape({
                word: React.PropTypes.string.isRequired,
                key: React.PropTypes.number.isRequired,
            })
        ),
    },

    getInitialState: function() {
        return {
            valueCheckBox: false,
            activeField: false,
            listWord: this.props.list,
        };
    },

    sortFilterWord: function() {
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
                var value = ~(element.word.indexOf(`${valueField}`)) ?  true : false;
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
    },


    changeCheckBox: function(e) {
        this.setState({valueCheckBox:e.target.checked}, this.sortFilterWord)
    },

    changeTextField: function(e) {
        this.setState({activeField:e.target.value}, this.sortFilterWord)
    },


    render: function() {
        var listWords = this.state.listWord.map(word => React.DOM.option({key:word.key, className:"wrapper-filter__list-option"},
            word.word)
        );


        return React.DOM.div({className:"wrapper-filter"},
            React.DOM.input({type:"checkbox", className:"wrapper-filter__sort", onChange:this.changeCheckBox}),
            React.DOM.input({type:"text", className:"wrapper-filter__field-text", onChange:this.changeTextField}),
            React.DOM.select({className:"wrapper-filter__list", size:5}, listWords),
        );
    }   
});